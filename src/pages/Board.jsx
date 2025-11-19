import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { Loader2, ExternalLink, Plus, Settings, ChevronDown, X, Trash2, Moon, Sun, User, Copy, Check, Mail, MessageCircle, FileText, Activity } from 'lucide-react'
import TaskModal from '../components/TaskModal'
import { mockTeamMembers } from '../data/mockData'
import { initializePresence, subscribeToPresence, generateUserColor, getUserInitials } from '../firebase/presence'
import { addUpdate, subscribeToUpdates, subscribeToUpdateCounts } from '../firebase/updates'
import { getCompanyUsers } from '../firebase/users'
import { logActivity, ActivityTypes } from '../firebase/activity'
import { useAuth } from '../contexts/AuthContext'
import MentionDropdown from '../components/MentionDropdown'
import ActivityLog from '../components/ActivityLog'
import WhatsAppNotification from '../components/WhatsAppNotification'
import './Board.css'

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I'
const MONDAY_API_URL = 'https://api.monday.com/v2'

async function fetchBoardData(boardId) {
  const query = `
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        id
        name
        columns {
          id
          title
          type
          settings_str
        }
        groups {
          id
          title
          color
        }
        items_page(limit: 500) {
          items {
            id
            name
            group {
              id
            }
            creator {
              id
              name
            }
            created_at
            column_values {
              id
              text
              type
              value
            }
          }
        }
      }
    }
  `

  const response = await fetch(MONDAY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': MONDAY_API_TOKEN
    },
    body: JSON.stringify({
      query,
      variables: { boardId: String(boardId) }
    })
  })

  const data = await response.json()

  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'فشل تحميل البيانات')
  }

  if (!data.data?.boards?.[0]) {
    throw new Error('البورد غير موجود')
  }

  return data.data.boards[0]
}

export default function Board() {
  const { id } = useParams()
  const { currentUser, userData } = useAuth()
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [visibleColumns, setVisibleColumns] = useState(['person', 'status', 'date'])
  const [hoveredCell, setHoveredCell] = useState(null)
  const [showAddColumn, setShowAddColumn] = useState(false)
  const [activeCellMenu, setActiveCellMenu] = useState(null)
  const [expandedTasks, setExpandedTasks] = useState({})
  const [taskSubtasks, setTaskSubtasks] = useState({})
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [collapsedGroups, setCollapsedGroups] = useState({})
  const [draggedTask, setDraggedTask] = useState(null)
  const [dragOverGroup, setDragOverGroup] = useState(null)
  const [dragOverTask, setDragOverTask] = useState(null) // For reordering within same group
  const [taskOrder, setTaskOrder] = useState({}) // Store custom task order per group

  // Column resizing state
  const [columnWidths, setColumnWidths] = useState({
    task: 400
  })
  const [resizingColumn, setResizingColumn] = useState(null)
  const [resizeStartX, setResizeStartX] = useState(0)
  const [resizeStartWidth, setResizeStartWidth] = useState(0)

  // Person dropdown state
  const [personDropdownOpen, setPersonDropdownOpen] = useState(null) // stores itemId or subtaskId
  const [personSearchTerm, setPersonSearchTerm] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null) // Track which task is being edited
  const [copiedLinkId, setCopiedLinkId] = useState(null) // Track which link was copied
  const [updatesModalOpen, setUpdatesModalOpen] = useState(null) // stores itemId for updates modal
  const [taskUpdates, setTaskUpdates] = useState({}) // Store updates for each task (now from Firebase)
  const [updateCounts, setUpdateCounts] = useState({}) // Store update counts for badges
  const [currentModalUpdates, setCurrentModalUpdates] = useState([]) // Updates for currently open modal
  const [textModalOpen, setTextModalOpen] = useState(null) // stores { itemId, columnId, columnTitle, value, isSubtask }
  const [onlineUsers, setOnlineUsers] = useState([]) // Track online users via Firebase

  // Mentions state
  const [companyUsers, setCompanyUsers] = useState([]) // All users in company for mentions
  const [showMentionDropdown, setShowMentionDropdown] = useState(false)
  const [mentionSearchTerm, setMentionSearchTerm] = useState('')
  const [mentionCursorPosition, setMentionCursorPosition] = useState(0)
  const textareaRef = useRef(null) // Ref to textarea for mention insertion

  // Activity Log state
  const [showActivityLog, setShowActivityLog] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchBoardData(id)
        setBoard(data)
      } catch (err) {
        setError(err.message || 'حدث خطأ')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  // Initialize column widths based on board columns
  useEffect(() => {
    if (board?.columns) {
      const widths = { task: 400 }
      board.columns.forEach(column => {
        // Set default widths based on column type
        switch (column.type) {
          case 'people':
          case 'person':
            widths[column.id] = 200
            break
          case 'status':
          case 'color':
            widths[column.id] = 150
            break
          case 'date':
          case 'timeline':
            widths[column.id] = 150
            break
          case 'link':
          case 'url':
            widths[column.id] = 250
            break
          case 'text':
          case 'long_text':
            widths[column.id] = 200
            break
          case 'numbers':
          case 'numeric':
            widths[column.id] = 120
            break
          case 'checkbox':
            widths[column.id] = 80
            break
          case 'dropdown':
            widths[column.id] = 150
            break
          case 'tags':
            widths[column.id] = 180
            break
          default:
            widths[column.id] = 150
        }
      })
      // Add updates column
      widths['updates'] = 80
      setColumnWidths(widths)
    }
  }, [board?.columns])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // Initialize task order when board loads
  useEffect(() => {
    if (board && Object.keys(taskOrder).length === 0) {
      const initialOrder = {}
      board.groups.forEach(group => {
        const groupItems = board.items_page.items
          .filter(item => (item.group?.id || 'other') === group.id)
          .map(item => item.id)
        if (groupItems.length > 0) {
          initialOrder[group.id] = groupItems
        }
      })
      setTaskOrder(initialOrder)
    }
  }, [board])

  // Initialize Firebase presence tracking
  useEffect(() => {
    if (!id || !currentUser || !userData) return

    // Use Firebase Auth user data
    const userId = currentUser.uid
    const userName = userData.displayName || 'موظف'

    // Get or generate user color
    let userColor = localStorage.getItem('sunday_user_color')
    if (!userColor) {
      userColor = generateUserColor()
      localStorage.setItem('sunday_user_color', userColor)
    }

    // Initialize presence
    const cleanupPresence = initializePresence(userId, userName, id, userColor)

    // Subscribe to presence updates
    const unsubscribePresence = subscribeToPresence(id, (users) => {
      // Filter out current user
      const otherUsers = users.filter(u => u.userId !== userId)
      setOnlineUsers(otherUsers)
    })

    // Cleanup on unmount
    return () => {
      if (cleanupPresence) cleanupPresence()
      if (unsubscribePresence) unsubscribePresence()
    }
  }, [id, currentUser, userData])

  // Subscribe to update counts for all items in board
  useEffect(() => {
    if (!board || !id) return

    const itemIds = board.items_page.items.map(item => item.id)
    if (itemIds.length === 0) return

    const unsubscribe = subscribeToUpdateCounts(id, itemIds, (counts) => {
      setUpdateCounts(counts)
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [board, id])

  // Subscribe to updates for currently open modal
  useEffect(() => {
    if (!updatesModalOpen || !id) {
      setCurrentModalUpdates([])
      return
    }

    const unsubscribe = subscribeToUpdates(id, updatesModalOpen, (updates) => {
      setCurrentModalUpdates(updates)
      // Also update taskUpdates for backward compatibility
      setTaskUpdates(prev => ({
        ...prev,
        [updatesModalOpen]: updates
      }))
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [updatesModalOpen, id])

  // Load company users for mentions
  useEffect(() => {
    if (userData?.companyCode) {
      getCompanyUsers(userData.companyCode).then(result => {
        if (result.success) {
          setCompanyUsers(result.users)
        }
      })
    }
  }, [userData])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const copyLinkToClipboard = async (link, itemId) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedLinkId(itemId)
      setTimeout(() => setCopiedLinkId(null), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('فشل نسخ الرابط:', err)
    }
  }

  // Mention handling functions
  const handleTextareaChange = (e) => {
    const value = e.target.value
    const cursorPos = e.target.selectionStart

    // Check if user typed @
    const textBeforeCursor = value.substring(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')

    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1)
      // Check if there's a space after @ (which would close the mention)
      if (!textAfterAt.includes(' ')) {
        setShowMentionDropdown(true)
        setMentionSearchTerm(textAfterAt)
        setMentionCursorPosition(lastAtIndex)
      } else {
        setShowMentionDropdown(false)
      }
    } else {
      setShowMentionDropdown(false)
    }
  }

  const handleMentionSelect = (user) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const value = textarea.value
    const mentionText = `@${user.displayName} `

    // Replace from @ position to cursor with mention
    const beforeMention = value.substring(0, mentionCursorPosition)
    const afterCursor = value.substring(textarea.selectionStart)
    const newValue = beforeMention + mentionText + afterCursor

    textarea.value = newValue

    // Set cursor after mention
    const newCursorPos = mentionCursorPosition + mentionText.length
    textarea.setSelectionRange(newCursorPos, newCursorPos)
    textarea.focus()

    // Hide dropdown
    setShowMentionDropdown(false)
    setMentionSearchTerm('')
  }

  const parseMentions = (text) => {
    // Simple mention parser - replaces @Name with styled spans
    const mentionRegex = /@(\w+(?:\s+\w+)*)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = mentionRegex.exec(text)) !== null) {
      // Add text before mention
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }

      // Add mention with styling
      parts.push(
        <span key={match.index} className="mention">
          @{match[1]}
        </span>
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  const toggleGroupCollapse = (groupId) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const handleDragStart = (e, task, groupId, taskIndex) => {
    setDraggedTask({ task, groupId, taskIndex })
    e.dataTransfer.effectAllowed = 'move'
    e.target.style.opacity = '0.4'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedTask(null)
    setDragOverGroup(null)
    setDragOverTask(null)
  }

  const handleDragOver = (e, groupId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverGroup(groupId)
  }

  const handleDragOverTask = (e, taskId, groupId, taskIndex) => {
    e.preventDefault()
    e.stopPropagation()
    if (!draggedTask) return

    // Don't set drag over if it's the same task being dragged
    if (draggedTask.task.id === taskId) {
      setDragOverTask(null)
      return
    }

    setDragOverTask({ taskId, groupId, taskIndex })
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetGroupId) => {
    e.preventDefault()
    if (!draggedTask) return

    const { task, groupId: sourceGroupId, taskIndex: sourceIndex } = draggedTask

    // Check if we're dropping on a specific task for reordering
    if (dragOverTask && dragOverTask.groupId === targetGroupId) {
      const targetIndex = dragOverTask.taskIndex

      if (sourceGroupId === targetGroupId && sourceIndex !== targetIndex) {
        // Reordering within same group
        setTaskOrder(prev => {
          const currentOrder = prev[sourceGroupId] || []
          const newOrder = [...currentOrder]

          // Remove from source position
          newOrder.splice(sourceIndex, 1)
          // Insert at target position
          newOrder.splice(targetIndex, 0, task.id)

          return {
            ...prev,
            [sourceGroupId]: newOrder
          }
        })

        console.log(`Reordering "${task.name}" from position ${sourceIndex} to ${targetIndex}`)
      } else if (sourceGroupId !== targetGroupId) {
        // Moving to different group at specific position
        setTaskOrder(prev => {
          const sourceOrder = (prev[sourceGroupId] || []).filter(id => id !== task.id)
          const targetOrder = prev[targetGroupId] || []
          const newTargetOrder = [...targetOrder]
          newTargetOrder.splice(targetIndex, 0, task.id)

          return {
            ...prev,
            [sourceGroupId]: sourceOrder,
            [targetGroupId]: newTargetOrder
          }
        })

        // Update task's group in board data
        setBoard(prevBoard => {
          const updatedItems = prevBoard.items_page.items.map(item =>
            item.id === task.id ? { ...item, group: { id: targetGroupId } } : item
          )
          return {
            ...prevBoard,
            items_page: { items: updatedItems }
          }
        })

        console.log(`Moving "${task.name}" from ${sourceGroupId} to ${targetGroupId} at position ${targetIndex}`)
      }
    } else if (sourceGroupId !== targetGroupId) {
      // Moving to different group (at end)
      setTaskOrder(prev => {
        const sourceOrder = (prev[sourceGroupId] || []).filter(id => id !== task.id)
        const targetOrder = [...(prev[targetGroupId] || []), task.id]

        return {
          ...prev,
          [sourceGroupId]: sourceOrder,
          [targetGroupId]: targetOrder
        }
      })

      // Update task's group in board data
      setBoard(prevBoard => {
        const updatedItems = prevBoard.items_page.items.map(item =>
          item.id === task.id ? { ...item, group: { id: targetGroupId } } : item
        )
        return {
          ...prevBoard,
          items_page: { items: updatedItems }
        }
      })

      console.log(`Moving task "${task.name}" from ${sourceGroupId} to ${targetGroupId}`)
    }

    setDraggedTask(null)
    setDragOverGroup(null)
    setDragOverTask(null)
  }

  // Column resize handlers
  const handleResizeStart = (e, columnName) => {
    e.preventDefault()
    e.stopPropagation()
    setResizingColumn(columnName)
    setResizeStartX(e.clientX)
    setResizeStartWidth(columnWidths[columnName])
  }

  const handleResizeMove = (e) => {
    if (!resizingColumn) return

    const deltaX = resizeStartX - e.clientX // RTL: reversed delta
    const newWidth = Math.max(100, resizeStartWidth + deltaX)

    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth
    }))
  }

  const handleResizeEnd = () => {
    setResizingColumn(null)
  }

  // Add event listeners for resize
  useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleResizeMove)
      document.addEventListener('mouseup', handleResizeEnd)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'

      return () => {
        document.removeEventListener('mousemove', handleResizeMove)
        document.removeEventListener('mouseup', handleResizeEnd)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
  }, [resizingColumn, resizeStartX, resizeStartWidth, columnWidths])

  // Close person dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (personDropdownOpen && !e.target.closest('.person-cell-wrapper')) {
        setPersonDropdownOpen(null)
        setPersonSearchTerm('')
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [personDropdownOpen])

  const handleTaskClick = (item) => {
    setSelectedTask(item)
  }

  const handleTaskUpdate = (updatedTask) => {
    // Update task in board
    const updatedItems = board.items_page.items.map(item =>
      item.id === updatedTask.id ? updatedTask : item
    )
    setBoard({
      ...board,
      items_page: {
        items: updatedItems
      }
    })
  }

  const handleCellClick = (e, itemId, columnType) => {
    e.stopPropagation()
    setActiveCellMenu({ itemId, columnType, x: e.clientX, y: e.clientY })
  }

  const toggleTaskExpand = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }

  const addSubtask = (taskId, parentSubtaskId = null) => {
    const newSubtask = {
      id: Date.now().toString(),
      name: '',
      person: '',
      status: 'جديد',
      date: '',
      subtasks: [],
      isNew: true
    }

    if (parentSubtaskId) {
      // Add nested subtask
      setTaskSubtasks(prev => {
        const addNested = (subs) => {
          return subs.map(sub => {
            if (sub.id === parentSubtaskId) {
              return {
                ...sub,
                subtasks: [...(sub.subtasks || []), newSubtask]
              }
            }
            if (sub.subtasks) {
              return { ...sub, subtasks: addNested(sub.subtasks) }
            }
            return sub
          })
        }
        return {
          ...prev,
          [taskId]: addNested(prev[taskId] || [])
        }
      })
      setExpandedTasks(prev => ({ ...prev, [`${taskId}-${parentSubtaskId}`]: true }))
    } else {
      // Add top-level subtask
      setTaskSubtasks(prev => ({
        ...prev,
        [taskId]: [...(prev[taskId] || []), newSubtask]
      }))
      setExpandedTasks(prev => ({ ...prev, [taskId]: true }))
    }
  }

  const updateSubtask = (taskId, subtaskId, field, value) => {
    setTaskSubtasks(prev => {
      const updateRecursive = (subs) => {
        return subs.map(sub => {
          if (sub.id === subtaskId) {
            return { ...sub, [field]: value, isNew: false }
          }
          if (sub.subtasks) {
            return { ...sub, subtasks: updateRecursive(sub.subtasks) }
          }
          return sub
        })
      }
      return {
        ...prev,
        [taskId]: updateRecursive(prev[taskId] || [])
      }
    })
  }

  const deleteSubtask = (taskId, subtaskId) => {
    setTaskSubtasks(prev => {
      const deleteRecursive = (subs) => {
        return subs.filter(sub => {
          if (sub.id === subtaskId) return false
          if (sub.subtasks) {
            sub.subtasks = deleteRecursive(sub.subtasks)
          }
          return true
        })
      }
      return {
        ...prev,
        [taskId]: deleteRecursive(prev[taskId] || [])
      }
    })
  }

  const toggleSubtaskExpand = (taskId, subtaskId) => {
    const key = `${taskId}-${subtaskId}`
    setExpandedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const mondayColumnTypes = [
    { type: 'text', label: 'نص', icon: '📝' },
    { type: 'person', label: 'شخص', icon: '👤' },
    { type: 'status', label: 'حالة', icon: '🎯' },
    { type: 'date', label: 'تاريخ', icon: '📅' },
    { type: 'timeline', label: 'جدول زمني', icon: '📊' },
    { type: 'numbers', label: 'أرقام', icon: '🔢' },
    { type: 'email', label: 'بريد إلكتروني', icon: '✉️' },
    { type: 'phone', label: 'هاتف', icon: '📞' },
    { type: 'link', label: 'رابط', icon: '🔗' },
    { type: 'dropdown', label: 'قائمة منسدلة', icon: '📋' },
    { type: 'checkbox', label: 'مربع اختيار', icon: '☑️' },
    { type: 'file', label: 'ملف', icon: '📎' },
    { type: 'location', label: 'موقع', icon: '📍' },
    { type: 'rating', label: 'تقييم', icon: '⭐' },
    { type: 'progress', label: 'تقدم', icon: '📈' }
  ]

  if (loading) {
    return (
      <div className="board-loading">
        <Loader2 size={48} className="spin" />
        <p>جاري التحميل...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="board-error">
        <h2>❌ خطأ</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          إعادة المحاولة
        </button>
      </div>
    )
  }

  if (!board) return null

  // Group items
  const itemsByGroup = {}
  board.items_page.items.forEach(item => {
    const gid = item.group?.id || 'other'
    if (!itemsByGroup[gid]) itemsByGroup[gid] = []
    itemsByGroup[gid].push(item)
  })

  // Sort items based on custom order
  const getSortedItems = (groupId) => {
    const items = itemsByGroup[groupId] || []
    const customOrder = taskOrder[groupId]

    if (!customOrder || customOrder.length === 0) {
      return items
    }

    // Create a map of existing items
    const itemsMap = {}
    items.forEach(item => {
      itemsMap[item.id] = item
    })

    // Sort based on custom order, then append any new items
    const sortedItems = []
    customOrder.forEach(itemId => {
      if (itemsMap[itemId]) {
        sortedItems.push(itemsMap[itemId])
        delete itemsMap[itemId]
      }
    })

    // Add any remaining items that weren't in the custom order
    Object.values(itemsMap).forEach(item => {
      sortedItems.push(item)
    })

    return sortedItems
  }

  const getStatusColor = (text) => {
    if (!text) return '#C4C4C4'
    const t = text.toLowerCase()
    if (t.includes('done') || t.includes('مكتمل')) return '#00CA72'
    if (t.includes('working') || t.includes('قيد')) return '#FDAB3D'
    if (t.includes('stuck') || t.includes('معلق')) return '#E44258'
    return '#0073EA'
  }

  const getColumnValue = (item, type) => {
    const col = item.column_values.find(c => c.type === type || c.type.includes(type))
    return col?.text || ''
  }

  // Get column value by column ID
  const getColumnValueById = (item, columnId) => {
    const col = item.column_values.find(c => c.id === columnId)
    return col?.text || ''
  }

  // Render subtask column cell (subtasks are stored differently from main items)
  const renderSubtaskColumnCell = (column, subtask, taskId, onUpdate) => {
    // Map Monday column types to subtask fields
    let value = ''
    if (column.type === 'people' || column.type === 'person' || column.type === 'multiple-person') {
      value = subtask.person || ''
    } else if (column.type === 'status' || column.type === 'color') {
      value = subtask.status || ''
    } else if (column.type === 'date' || column.type === 'timeline') {
      value = subtask.date || ''
    } else if (column.type === 'link' || column.type === 'url') {
      value = subtask.link || ''
    } else {
      value = subtask[column.id] || ''
    }

    const subtaskKey = `${taskId}-${subtask.id}`

    switch (column.type) {
      case 'people':
      case 'person':
      case 'multiple-person':
        return renderPersonCell(subtaskKey, value, (newPerson) => {
          onUpdate('person', newPerson)
        })

      case 'status':
      case 'color':
        return (
          <select
            className="subtask-select-inline"
            value={value || 'جديد'}
            onChange={(e) => onUpdate('status', e.target.value)}
            style={{ backgroundColor: getStatusColor(value || 'جديد') }}
          >
            <option value="جديد">جديد</option>
            <option value="قيد العمل">قيد العمل</option>
            <option value="مكتمل">مكتمل</option>
            <option value="معلق">معلق</option>
          </select>
        )

      case 'date':
      case 'timeline':
        return (
          <input
            type="date"
            className="subtask-input-inline"
            value={value || ''}
            onChange={(e) => onUpdate('date', e.target.value)}
          />
        )

      case 'link':
      case 'url':
        return (
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', width: '100%' }}>
            <input
              type="url"
              className="subtask-input-inline"
              value={value || ''}
              onChange={(e) => onUpdate('link', e.target.value)}
              placeholder="رابط..."
              style={{ flex: 1, minWidth: 0 }}
            />
            {value && (
              <>
                <button
                  onClick={() => copyLinkToClipboard(value, subtaskKey)}
                  className="link-icon-btn"
                  title="نسخ الرابط"
                  style={{ flexShrink: 0 }}
                >
                  {copiedLinkId === subtaskKey ? <Check size={12} /> : <Copy size={12} />}
                </button>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-icon-btn"
                  title="فتح الرابط"
                  style={{ flexShrink: 0 }}
                >
                  <ExternalLink size={12} />
                </a>
              </>
            )}
          </div>
        )

      case 'text':
      case 'long_text':
        return (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
            <button
              onClick={() => setTextModalOpen({
                itemId: subtaskKey,
                columnId: column.id,
                columnTitle: column.title,
                value: value,
                isSubtask: true,
                taskId: taskId,
                subtaskId: subtask.id,
                onUpdate: (newValue) => {
                  // Store in subtask's custom field
                  updateSubtask(taskId, subtask.id, column.id, newValue)
                }
              })}
              className="text-icon-btn text-icon-btn-small"
              title={value ? `${column.title}: ${value.substring(0, 50)}...` : `إضافة ${column.title}`}
              style={{ position: 'relative' }}
            >
              <FileText size={14} />
              {value && <span className="text-has-content-indicator text-has-content-indicator-small"></span>}
            </button>
          </div>
        )

      default:
        return (
          <div className="subtask-input-inline" style={{ opacity: 0.6 }}>
            {value || '-'}
          </div>
        )
    }
  }

  // Render column cell dynamically based on column type
  const renderColumnCell = (column, item, onUpdate) => {
    const value = getColumnValueById(item, column.id)

    switch (column.type) {
      case 'people':
      case 'person':
      case 'multiple-person':
        return renderPersonCell(item.id, value, (newPerson) => {
          onUpdate(column.id, newPerson, column.type)
        })

      case 'status':
      case 'color':
        return (
          <select
            className="subtask-select-inline"
            value={value || 'جديد'}
            onChange={(e) => onUpdate(column.id, e.target.value, column.type)}
            style={{ backgroundColor: getStatusColor(value || 'جديد') }}
          >
            <option value="جديد">جديد</option>
            <option value="قيد العمل">قيد العمل</option>
            <option value="مكتمل">مكتمل</option>
            <option value="معلق">معلق</option>
          </select>
        )

      case 'date':
      case 'timeline':
        return (
          <input
            type="date"
            className="subtask-input-inline"
            value={value || ''}
            onChange={(e) => onUpdate(column.id, e.target.value, column.type)}
          />
        )

      case 'link':
      case 'url':
        return (
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', width: '100%' }}>
            <input
              type="url"
              className="subtask-input-inline"
              value={value || ''}
              onChange={(e) => onUpdate(column.id, e.target.value, column.type)}
              placeholder="رابط..."
              style={{ flex: 1, minWidth: 0 }}
            />
            {value && (
              <>
                <button
                  onClick={() => copyLinkToClipboard(value, item.id)}
                  className="link-icon-btn"
                  title="نسخ الرابط"
                >
                  {copiedLinkId === item.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <a href={value} target="_blank" rel="noopener noreferrer" className="link-icon-btn" title="فتح الرابط">
                  <ExternalLink size={14} />
                </a>
              </>
            )}
          </div>
        )

      case 'text':
      case 'long_text':
        return (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
            <button
              onClick={() => setTextModalOpen({
                itemId: item.id,
                columnId: column.id,
                columnTitle: column.title,
                value: value,
                isSubtask: false,
                onUpdate: (newValue) => onUpdate(column.id, newValue, column.type)
              })}
              className="text-icon-btn"
              title={value ? `${column.title}: ${value.substring(0, 50)}...` : `إضافة ${column.title}`}
              style={{ position: 'relative' }}
            >
              <FileText size={16} />
              {value && <span className="text-has-content-indicator"></span>}
            </button>
          </div>
        )

      case 'numbers':
      case 'numeric':
        return (
          <input
            type="number"
            className="subtask-input-inline"
            value={value || ''}
            onChange={(e) => onUpdate(column.id, e.target.value, column.type)}
            placeholder="0"
          />
        )

      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value === 'true' || value === true}
            onChange={(e) => onUpdate(column.id, e.target.checked.toString(), column.type)}
            style={{ width: '20px', height: '20px' }}
          />
        )

      case 'dropdown':
        return (
          <select
            className="subtask-select-inline"
            value={value || ''}
            onChange={(e) => onUpdate(column.id, e.target.value, column.type)}
          >
            <option value="">اختر...</option>
            <option value="خيار 1">خيار 1</option>
            <option value="خيار 2">خيار 2</option>
            <option value="خيار 3">خيار 3</option>
          </select>
        )

      default:
        return (
          <div className="subtask-input-inline" style={{ opacity: 0.6 }}>
            {value || '-'}
          </div>
        )
    }
  }

  // Get person initials for avatar
  const getPersonInitials = (name) => {
    if (!name) return '?'
    const words = name.trim().split(' ')
    if (words.length === 1) return words[0][0].toUpperCase()
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }

  // Find team member by name
  const findTeamMember = (name) => {
    return mockTeamMembers.find(m => m.name.toLowerCase() === name?.toLowerCase())
  }

  // Filter team members by search term
  const getFilteredTeamMembers = () => {
    if (!personSearchTerm) return mockTeamMembers
    const term = personSearchTerm.toLowerCase()
    return mockTeamMembers.filter(m =>
      m.name.toLowerCase().includes(term) ||
      m.email.toLowerCase().includes(term) ||
      m.title?.toLowerCase().includes(term)
    )
  }

  // Render person dropdown cell
  const renderPersonCell = (itemId, currentPerson, onSelect) => {
    const cellId = `person-${itemId}`
    const isOpen = personDropdownOpen === cellId
    const selectedMember = findTeamMember(currentPerson)
    const filteredMembers = getFilteredTeamMembers()

    return (
      <div className="person-cell-wrapper">
        <div
          className={`person-display ${!currentPerson ? 'empty' : ''}`}
          onClick={() => {
            setPersonDropdownOpen(isOpen ? null : cellId)
            setPersonSearchTerm('')
          }}
        >
          {selectedMember ? (
            <>
              <div className="person-avatar">
                {getPersonInitials(selectedMember.name)}
              </div>
              <span className="person-name">{selectedMember.name}</span>
            </>
          ) : currentPerson ? (
            <>
              <div className="person-avatar">
                {getPersonInitials(currentPerson)}
              </div>
              <span className="person-name">{currentPerson}</span>
            </>
          ) : (
            <>
              <User size={16} />
              <span>اختر مسؤول</span>
            </>
          )}
        </div>

        {isOpen && (
          <div className="person-dropdown-menu">
            <div className="person-dropdown-search">
              <input
                type="text"
                className="person-search-input"
                placeholder="ابحث عن موظف..."
                value={personSearchTerm}
                onChange={(e) => setPersonSearchTerm(e.target.value)}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="person-dropdown-list">
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <button
                    key={member.id}
                    className={`person-dropdown-item ${selectedMember?.id === member.id ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelect(member.name)
                      setPersonDropdownOpen(null)
                      setPersonSearchTerm('')
                    }}
                  >
                    <div className="person-avatar">
                      {getPersonInitials(member.name)}
                    </div>
                    <div className="person-item-info">
                      <div className="person-item-name">{member.name}</div>
                      <div className="person-item-title">{member.title || member.email}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="person-dropdown-empty">
                  لا توجد نتائج
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Build grid columns dynamically based on board columns
  const gridColumns = board?.columns
    ? `${columnWidths.task}px ${board.columns.map(col => `${columnWidths[col.id] || 150}px`).join(' ')} ${columnWidths.updates}px`
    : '400px 200px 150px 150px 250px 80px'

  const renderSubtasksRecursive = (taskId, subtasks, level = 0) => {
    return subtasks.map(subtask => {
      const subtaskKey = `${taskId}-${subtask.id}`
      const isSubtaskExpanded = expandedTasks[subtaskKey]
      const hasChildren = subtask.subtasks && subtask.subtasks.length > 0

      return (
        <React.Fragment key={subtask.id}>
          <div className="subtask-row-inline" style={{ '--indent-level': level }}>
            <div className="item-cell col-task">
              <div className="subtask-indent" style={{ width: `${level * 30}px` }}></div>

              {/* Expand Arrow for nested subtasks */}
              <button
                className="expand-arrow expand-arrow-small"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleSubtaskExpand(taskId, subtask.id)
                }}
                style={{ opacity: hasChildren || isSubtaskExpanded ? 1 : 0.3 }}
              >
                <ChevronDown
                  size={12}
                  className={isSubtaskExpanded ? 'expanded' : ''}
                />
              </button>

              <div className="task-check-small"></div>
              <input
                type="text"
                className="subtask-name-inline-input"
                value={subtask.name}
                onChange={(e) => updateSubtask(taskId, subtask.id, 'name', e.target.value)}
                placeholder="اسم المهمة الفرعية..."
                autoFocus={subtask.isNew}
              />

              {/* Add nested subtask button */}
              <button
                className="add-subtask-inline-btn add-subtask-inline-btn-small"
                onClick={(e) => {
                  e.stopPropagation()
                  addSubtask(taskId, subtask.id)
                }}
                title="إضافة مهمة فرعية"
              >
                <Plus size={12} />
              </button>

              <button
                className="delete-subtask-inline-btn"
                onClick={() => deleteSubtask(taskId, subtask.id)}
                title="حذف"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Dynamic columns based on board configuration */}
            {board.columns.map(column => (
              <div key={column.id} className="item-cell">
                {renderSubtaskColumnCell(column, subtask, taskId, (field, newValue) => {
                  updateSubtask(taskId, subtask.id, field, newValue)
                })}
              </div>
            ))}

            {/* Updates Column */}
            <div className="item-cell col-updates">
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                <button
                  onClick={() => setUpdatesModalOpen(`${taskId}-${subtask.id}`)}
                  className="updates-icon-btn updates-icon-btn-small"
                  title="التحديثات"
                  style={{ position: 'relative' }}
                >
                  <MessageCircle size={14} />
                  {updateCounts[`${taskId}-${subtask.id}`] > 0 && (
                    <span className="updates-badge updates-badge-small">{updateCounts[`${taskId}-${subtask.id}`]}</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Render nested subtasks recursively */}
          {isSubtaskExpanded && hasChildren && renderSubtasksRecursive(taskId, subtask.subtasks, level + 1)}
        </React.Fragment>
      )
    })
  }

  return (
    <div className="monday-board">
      {/* Board Header */}
      <div className="board-top-bar">
        <div className="board-title-section">
          <h1>{board.name}</h1>
          <div className="board-meta">
            <span>{board.items_page.items.length} مهمة</span>
            <span>•</span>
            <span>{board.groups.length} مجموعة</span>
            {onlineUsers.length > 0 && (
              <>
                <span>•</span>
                <span>{onlineUsers.length} موظف نشط</span>
              </>
            )}
          </div>
        </div>

        {/* Online Users Display */}
        {onlineUsers.length > 0 && (
          <div className="online-users-container">
            {onlineUsers.slice(0, 5).map((user) => (
              <div
                key={user.userId}
                className="online-user-avatar"
                style={{ backgroundColor: user.color }}
                title={user.userName}
              >
                {getUserInitials(user.userName)}
                <span className="online-indicator"></span>
              </div>
            ))}
            {onlineUsers.length > 5 && (
              <div className="online-user-avatar more-users" title={`+${onlineUsers.length - 5} آخرين`}>
                +{onlineUsers.length - 5}
              </div>
            )}
          </div>
        )}

        <div className="board-actions">
          <button
            className="action-btn"
            onClick={() => setShowActivityLog(true)}
            title="سجل النشاطات"
          >
            <Activity size={16} />
            <span>سجل النشاطات</span>
          </button>
          <button
            className="action-btn"
            onClick={toggleDarkMode}
            title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span>{darkMode ? 'وضع نهاري' : 'وضع ليلي'}</span>
          </button>
          <a
            href={`https://monday.com/boards/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
          >
            <ExternalLink size={16} />
            <span>فتح في Monday</span>
          </a>
        </div>
      </div>

      {/* Board Table */}
      <div className="board-table-container">
        <div className="board-table" style={{ '--grid-cols': gridColumns }}>
          {/* Groups */}
          {board.groups.map(group => {
            const items = getSortedItems(group.id)
            const isGroupCollapsed = collapsedGroups[group.id]

            return (
              <div
                key={group.id}
                className={`table-group ${dragOverGroup === group.id ? 'drag-over' : ''}`}
                onDragOver={(e) => handleDragOver(e, group.id)}
                onDrop={(e) => handleDrop(e, group.id)}
              >
                {/* Group Header */}
                <div
                  className={`group-row ${isGroupCollapsed ? 'collapsed' : ''}`}
                  style={{
                    borderLeftColor: group.color,
                    borderLeftWidth: '4px',
                    borderLeftStyle: 'solid'
                  }}
                  onClick={() => toggleGroupCollapse(group.id)}
                >
                  <div
                    className="group-name"
                    style={{
                      backgroundColor: group.color ? `${group.color}20` : 'transparent',
                      color: group.color || 'inherit',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontWeight: '700',
                      border: `2px solid ${group.color || 'transparent'}`
                    }}
                  >
                    {group.title}
                  </div>
                  <div className="group-count">{items.length} مهام</div>
                </div>

                {/* Table Header - Under Each Group */}
                {!isGroupCollapsed && (
                  <div className="table-header-row">
                    <div className="header-cell col-task">
                      المهمة
                      <div
                        className={`column-resize-handle ${resizingColumn === 'task' ? 'resizing' : ''}`}
                        onMouseDown={(e) => handleResizeStart(e, 'task')}
                      />
                    </div>
                    {board.columns.map(column => (
                      <div key={column.id} className="header-cell">
                        {column.title}
                        <div
                          className={`column-resize-handle ${resizingColumn === column.id ? 'resizing' : ''}`}
                          onMouseDown={(e) => handleResizeStart(e, column.id)}
                        />
                      </div>
                    ))}
                    <div className="header-cell">
                      التحديثات
                      <div
                        className={`column-resize-handle ${resizingColumn === 'updates' ? 'resizing' : ''}`}
                        onMouseDown={(e) => handleResizeStart(e, 'updates')}
                      />
                    </div>
                  </div>
                )}

                {/* Group Items */}
                {!isGroupCollapsed && items.map((item, itemIndex) => {
                  const subtasks = taskSubtasks[item.id] || []
                  const isExpanded = expandedTasks[item.id]
                  const isDraggedOver = dragOverTask?.taskId === item.id

                  return (
                    <React.Fragment key={item.id}>
                      <div
                        className={`item-row ${isDraggedOver ? 'drag-over-task' : ''}`}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, item, group.id, itemIndex)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOverTask(e, item.id, group.id, itemIndex)}
                      >
                        <div className="item-cell col-task">
                          <button
                            className="expand-arrow"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleTaskExpand(item.id)
                            }}
                          >
                            <ChevronDown
                              size={16}
                              className={isExpanded ? 'expanded' : ''}
                            />
                          </button>
                          <div className="task-check"></div>
                          {item.isNew ? (
                            <input
                              type="text"
                              className="task-name-input"
                              value={item.name}
                              onChange={(e) => {
                                const newName = e.target.value
                                setBoard(prevBoard => ({
                                  ...prevBoard,
                                  items_page: {
                                    items: prevBoard.items_page.items.map(boardItem =>
                                      boardItem.id === item.id
                                        ? { ...boardItem, name: newName }
                                        : boardItem
                                    )
                                  }
                                }))
                              }}
                              onBlur={() => {
                                // Remove isNew flag when user finishes editing
                                if (item.name.trim()) {
                                  setBoard(prevBoard => ({
                                    ...prevBoard,
                                    items_page: {
                                      items: prevBoard.items_page.items.map(boardItem =>
                                        boardItem.id === item.id
                                          ? { ...boardItem, isNew: false }
                                          : boardItem
                                      )
                                    }
                                  }))
                                } else {
                                  // Remove empty task
                                  setBoard(prevBoard => ({
                                    ...prevBoard,
                                    items_page: {
                                      items: prevBoard.items_page.items.filter(boardItem => boardItem.id !== item.id)
                                    }
                                  }))
                                  setTaskOrder(prev => ({
                                    ...prev,
                                    [group.id]: (prev[group.id] || []).filter(id => id !== item.id)
                                  }))
                                }
                              }}
                              placeholder="اسم المهمة..."
                              autoFocus
                            />
                          ) : (
                            <span className="task-text" onClick={() => handleTaskClick(item)}>{item.name}</span>
                          )}
                          <button
                            className="add-subtask-inline-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              addSubtask(item.id)
                            }}
                            title="إضافة مهمة فرعية"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                      {/* Dynamic columns based on board configuration */}
                      {board.columns.map(column => (
                        <div key={column.id} className="item-cell">
                          {renderColumnCell(column, item, (columnId, newValue, columnType) => {
                            // Update column value in board data
                            setBoard(prevBoard => ({
                              ...prevBoard,
                              items_page: {
                                items: prevBoard.items_page.items.map(boardItem => {
                                  if (boardItem.id === item.id) {
                                    const updatedColumnValues = boardItem.column_values.map(col => {
                                      if (col.id === columnId) {
                                        return { ...col, text: newValue }
                                      }
                                      return col
                                    })
                                    return { ...boardItem, column_values: updatedColumnValues }
                                  }
                                  return boardItem
                                })
                              }
                            }))
                          })}
                        </div>
                      ))}
                      <div className="item-cell col-updates">
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                          {/* WhatsApp Button for each task */}
                          {(() => {
                            // Extract phone number from task columns
                            const phoneColumn = item.column_values.find(col =>
                              col.title === 'رقم الواتساب' ||
                              col.title === 'واتساب' ||
                              col.title === 'Phone' ||
                              col.title === 'WhatsApp' ||
                              col.title === 'جوال' ||
                              col.title === 'Whatsapp'
                            )

                            // Extract person data
                            const personColumn = item.column_values.find(col =>
                              col.type === 'multiple-person' || col.type === 'person'
                            )

                            const statusColumn = item.column_values.find(col => col.type === 'color')
                            const dateColumn = item.column_values.find(col => col.type === 'date')

                            let assigneeName = 'الموظف'
                            try {
                              if (personColumn && personColumn.value) {
                                const personData = JSON.parse(personColumn.value)
                                if (personData.personsAndTeams && personData.personsAndTeams.length > 0) {
                                  assigneeName = personData.personsAndTeams[0].name || personColumn.text || 'الموظف'
                                } else if (personColumn.text) {
                                  assigneeName = personColumn.text
                                }
                              }
                            } catch (e) {
                              assigneeName = personColumn?.text || 'الموظف'
                            }

                            const assigneePhone = phoneColumn?.text || ''

                            // Only show WhatsApp button if phone number exists
                            if (assigneePhone) {
                              const taskData = {
                                title: item.name || 'غير محدد',
                                department: board?.name || 'غير محدد',
                                status: statusColumn?.text || 'غير محدد',
                                qualityCheck: 'غير محدد',
                                dueDate: dateColumn?.text || 'غير محدد'
                              }

                              const assigneeData = {
                                name: assigneeName,
                                whatsappNumber: assigneePhone
                              }

                              const currentUserData = {
                                name: userData?.displayName || currentUser?.displayName || 'المدير'
                              }

                              return (
                                <WhatsAppNotification
                                  task={taskData}
                                  assignee={assigneeData}
                                  currentUser={currentUserData}
                                  buttonClassName="updates-icon-btn whatsapp-task-btn"
                                  buttonText=""
                                  buttonSize={18}
                                  directSend={true}
                                />
                              )
                            }
                            return null
                          })()}

                          <button
                            onClick={() => setUpdatesModalOpen(item.id)}
                            className="updates-icon-btn"
                            title="التحديثات"
                            style={{ position: 'relative' }}
                          >
                            <MessageCircle size={18} />
                            {updateCounts[item.id] > 0 && (
                              <span className="updates-badge">{updateCounts[item.id]}</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subtasks Rows - Recursive rendering for infinite nesting */}
                    {isExpanded && subtasks.length > 0 && renderSubtasksRecursive(item.id, subtasks, 0)}
                  </React.Fragment>
                  )
                })}

                {/* Add Item Row */}
                {!isGroupCollapsed && <div className="add-item-row">
                  <button
                    className="add-item-btn"
                    onClick={() => {
                      // Create new empty task
                      const newTask = {
                        id: `temp-${Date.now()}`,
                        name: '',
                        group: { id: group.id },
                        column_values: [
                          { id: 'person', text: '', type: 'person' },
                          { id: 'status', text: '', type: 'status' },
                          { id: 'date', text: '', type: 'date' },
                          { id: 'link', text: '', type: 'link' }
                        ],
                        isNew: true
                      }

                      // Add to board state
                      setBoard(prevBoard => ({
                        ...prevBoard,
                        items_page: {
                          items: [...prevBoard.items_page.items, newTask]
                        }
                      }))

                      // Add to task order for this group
                      setTaskOrder(prev => ({
                        ...prev,
                        [group.id]: [...(prev[group.id] || []), newTask.id]
                      }))
                    }}
                  >
                    <Plus size={18} />
                    <span>إضافة مهمة</span>
                  </button>
                </div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          board={board}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}

      {/* Add Column Menu */}
      {showAddColumn && (
        <div className="column-type-menu">
          <div className="menu-header">
            <h3>اختر نوع العمود</h3>
            <button onClick={() => setShowAddColumn(false)} className="close-menu-btn">
              <X size={16} />
            </button>
          </div>
          <div className="column-types-grid">
            {mondayColumnTypes.map(colType => (
              <div
                key={colType.type}
                className="column-type-item"
                onClick={() => {
                  // Handle add column
                  console.log('Adding column:', colType.type)
                  setShowAddColumn(false)
                }}
              >
                <span className="column-type-icon">{colType.icon}</span>
                <span className="column-type-label">{colType.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cell Menu */}
      {activeCellMenu && (
        <div
          className="cell-menu"
          style={{
            position: 'fixed',
            left: `${activeCellMenu.x}px`,
            top: `${activeCellMenu.y}px`,
            zIndex: 1001
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cell-menu-header">
            <span>تعديل {activeCellMenu.columnType}</span>
            <button onClick={() => setActiveCellMenu(null)} className="close-menu-btn">
              <X size={14} />
            </button>
          </div>
          <div className="cell-menu-options">
            {activeCellMenu.columnType === 'status' || activeCellMenu.columnType === 'color' ? (
              <>
                <div className="menu-option status-option" style={{ background: '#00CA72' }}>مكتمل</div>
                <div className="menu-option status-option" style={{ background: '#FDAB3D' }}>قيد العمل</div>
                <div className="menu-option status-option" style={{ background: '#E44258' }}>معلق</div>
                <div className="menu-option status-option" style={{ background: '#0073EA' }}>جديد</div>
              </>
            ) : activeCellMenu.columnType === 'person' || activeCellMenu.columnType === 'people' ? (
              <>
                <div className="menu-option">تعيين شخص</div>
                <div className="menu-option">إزالة الشخص</div>
              </>
            ) : activeCellMenu.columnType === 'date' ? (
              <>
                <div className="menu-option">اختيار تاريخ</div>
                <div className="menu-option">مسح التاريخ</div>
              </>
            ) : (
              <>
                <div className="menu-option">تعديل</div>
                <div className="menu-option">مسح</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Text Modal */}
      {textModalOpen && (
        <div className="updates-modal-overlay" onClick={() => setTextModalOpen(null)}>
          <div className="updates-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="updates-modal-header">
              <div>
                <h3>{textModalOpen.columnTitle}</h3>
              </div>
              <button
                onClick={() => setTextModalOpen(null)}
                className="close-modal-btn"
                title="إغلاق"
              >
                <X size={20} />
              </button>
            </div>
            <div className="updates-modal-body" style={{ padding: '20px' }}>
              <textarea
                className="text-modal-textarea"
                value={textModalOpen.value || ''}
                onChange={(e) => {
                  const newValue = e.target.value
                  setTextModalOpen(prev => ({ ...prev, value: newValue }))
                }}
                placeholder={`اكتب ${textModalOpen.columnTitle} هنا...`}
                rows={10}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  backgroundColor: 'var(--bg-item)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            <div className="updates-modal-footer" style={{
              padding: '16px 20px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setTextModalOpen(null)}
                className="modal-cancel-btn"
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-item)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  textModalOpen.onUpdate(textModalOpen.value)
                  setTextModalOpen(null)
                }}
                className="modal-save-btn"
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'var(--link-color, #0073EA)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Updates Modal */}
      {updatesModalOpen && (
        <div className="updates-modal-overlay" onClick={() => setUpdatesModalOpen(null)}>
          <div className="updates-modal" onClick={(e) => e.stopPropagation()}>
            <div className="updates-modal-header">
              <div>
                <h3>التحديثات</h3>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div className="updates-modal-actions">
                  <button
                    className="updates-action-btn email"
                    onClick={() => {
                      const subject = encodeURIComponent('تحديث من Monday.com')
                      const body = encodeURIComponent(
                        currentModalUpdates.map(u => `${u.author}: ${u.text}`).join('\n\n') || ''
                      )
                      window.location.href = `mailto:?subject=${subject}&body=${body}`
                    }}
                    title="إرسال عبر البريد"
                  >
                    <Mail size={16} />
                    <span>إيميل</span>
                  </button>

                  {/* WhatsApp Notification with Ultra MSG */}
                  {(() => {
                    const currentItem = board?.items_page?.items?.find(i => i.id === updatesModalOpen)
                    if (!currentItem) return null

                    // Extract data from column_values
                    const personColumn = currentItem.column_values.find(col => col.type === 'multiple-person' || col.type === 'person')
                    const statusColumn = currentItem.column_values.find(col => col.type === 'color')
                    const dateColumn = currentItem.column_values.find(col => col.type === 'date')
                    const phoneColumn = currentItem.column_values.find(col => col.title === 'رقم الواتساب' || col.title === 'واتساب' || col.title === 'Phone' || col.title === 'WhatsApp')

                    // Parse person data
                    let assigneeName = 'الموظف'
                    let assigneePhone = ''

                    try {
                      if (personColumn && personColumn.value) {
                        const personData = JSON.parse(personColumn.value)
                        if (personData.personsAndTeams && personData.personsAndTeams.length > 0) {
                          assigneeName = personData.personsAndTeams[0].name || personColumn.text || 'الموظف'
                        } else if (personColumn.text) {
                          assigneeName = personColumn.text
                        }
                      }
                    } catch (e) {
                      assigneeName = personColumn?.text || 'الموظف'
                    }

                    // Get phone number
                    if (phoneColumn) {
                      assigneePhone = phoneColumn.text || ''
                    }

                    // Prepare task data
                    const taskData = {
                      title: currentItem.name || 'غير محدد',
                      department: board?.name || 'غير محدد',
                      status: statusColumn?.text || 'غير محدد',
                      qualityCheck: 'غير محدد',
                      dueDate: dateColumn?.text || 'غير محدد'
                    }

                    const assigneeData = {
                      name: assigneeName,
                      whatsappNumber: assigneePhone
                    }

                    const currentUserData = {
                      name: userData?.displayName || currentUser?.displayName || 'المدير'
                    }

                    return (
                      <WhatsAppNotification
                        task={taskData}
                        assignee={assigneeData}
                        currentUser={currentUserData}
                        buttonClassName="updates-action-btn whatsapp"
                        buttonText="أبديت واتساب"
                        buttonSize={16}
                        directSend={true}
                      />
                    )
                  })()}
                </div>
                <button onClick={() => setUpdatesModalOpen(null)} className="close-menu-btn">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="updates-modal-body">
              {currentModalUpdates.length > 0 ? (
                <div className="updates-list">
                  {currentModalUpdates.map((update, index) => (
                    <div key={update.id || index} className="update-item">
                      <div className="update-avatar">{getPersonInitials(update.author)}</div>
                      <div className="update-content">
                        <div className="update-header">
                          <span className="update-author">{update.author}</span>
                          <span className="update-time">{update.time}</span>
                        </div>
                        <div className="update-text">{parseMentions(update.text)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="updates-empty">
                  <MessageCircle size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
                  <p>لا توجد تحديثات بعد</p>
                  <p style={{ fontSize: '13px', marginTop: '8px' }}>ابدأ المحادثة أدناه</p>
                </div>
              )}
            </div>
            <div className="updates-input-area">
              <div className="updates-input-wrapper" style={{ position: 'relative' }}>
                <textarea
                  ref={textareaRef}
                  className="updates-input"
                  placeholder="اكتب تحديثاً... (استخدم @ لذكر المستخدمين)"
                  rows={2}
                  onChange={handleTextareaChange}
                  onKeyDown={async (e) => {
                    // Don't submit if mention dropdown is open and user presses Enter/Tab
                    if (showMentionDropdown && (e.key === 'Enter' || e.key === 'Tab')) {
                      return // Let MentionDropdown handle it
                    }

                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      const text = e.target.value.trim()
                      if (text && currentUser && userData) {
                        // Save to Firebase
                        const result = await addUpdate(
                          id,
                          updatesModalOpen,
                          text,
                          currentUser.uid,
                          userData.displayName || 'مستخدم'
                        )

                        // Log activity
                        if (result.success) {
                          const item = board?.items_page?.items?.find(i => i.id === updatesModalOpen)
                          await logActivity(
                            id,
                            ActivityTypes.UPDATE_POSTED,
                            currentUser.uid,
                            userData.displayName || 'مستخدم',
                            {
                              taskName: item?.name || 'مهمة',
                              updateText: text.substring(0, 50) + (text.length > 50 ? '...' : '')
                            }
                          )
                        }

                        e.target.value = ''
                        setShowMentionDropdown(false)
                      }
                    } else if (e.key === 'Escape') {
                      setShowMentionDropdown(false)
                    }
                  }}
                />
                {showMentionDropdown && (
                  <MentionDropdown
                    users={companyUsers}
                    searchTerm={mentionSearchTerm}
                    onSelect={handleMentionSelect}
                    position={{
                      bottom: '100%',
                      left: '0',
                      marginBottom: '8px'
                    }}
                  />
                )}
                <button
                  className="updates-send-btn"
                  onClick={async (e) => {
                    const textarea = e.target.parentElement.querySelector('textarea')
                    const text = textarea.value.trim()
                    if (text && currentUser && userData) {
                      // Save to Firebase
                      const result = await addUpdate(
                        id,
                        updatesModalOpen,
                        text,
                        currentUser.uid,
                        userData.displayName || 'مستخدم'
                      )

                      // Log activity
                      if (result.success) {
                        const item = board?.items_page?.items?.find(i => i.id === updatesModalOpen)
                        await logActivity(
                          id,
                          ActivityTypes.UPDATE_POSTED,
                          currentUser.uid,
                          userData.displayName || 'مستخدم',
                          {
                            taskName: item?.name || 'مهمة',
                            updateText: text.substring(0, 50) + (text.length > 50 ? '...' : '')
                          }
                        )
                      }

                      textarea.value = ''
                      setShowMentionDropdown(false)
                    }
                  }}
                >
                  إرسال
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close menus */}
      {(showAddColumn || activeCellMenu) && (
        <div
          className="menu-overlay"
          onClick={() => {
            setShowAddColumn(false)
            setActiveCellMenu(null)
          }}
        />
      )}

      {/* Activity Log */}
      <ActivityLog
        boardId={id}
        isOpen={showActivityLog}
        onClose={() => setShowActivityLog(false)}
      />
    </div>
  )
}
