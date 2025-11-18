import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'
import { Loader2, ExternalLink, Plus, Settings, ChevronDown, X, Trash2, Moon, Sun, User } from 'lucide-react'
import TaskModal from '../components/TaskModal'
import { mockTeamMembers } from '../data/mockData'
import './Board.css'

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I'
const MONDAY_API_URL = 'https://api.monday.com/v2'

async function fetchBoardData(boardId) {
  const query = `
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        id
        name
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
    task: 400,
    person: 200,
    status: 150,
    date: 150,
    link: 80
  })
  const [resizingColumn, setResizingColumn] = useState(null)
  const [resizeStartX, setResizeStartX] = useState(0)
  const [resizeStartWidth, setResizeStartWidth] = useState(0)

  // Person dropdown state
  const [personDropdownOpen, setPersonDropdownOpen] = useState(null) // stores itemId or subtaskId
  const [personSearchTerm, setPersonSearchTerm] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null) // Track which task is being edited

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
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

  // Basic columns: المهمة، المسؤول، الحالة، التاريخ، الرابط
  const gridColumns = `${columnWidths.task}px ${columnWidths.person}px ${columnWidths.status}px ${columnWidths.date}px ${columnWidths.link}px`

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

            {/* Person Column */}
            <div className="item-cell col-person">
              {renderPersonCell(`${taskId}-${subtask.id}`, subtask.person || '', (newPerson) => {
                updateSubtask(taskId, subtask.id, 'person', newPerson)
              })}
            </div>

            {/* Status Column */}
            <div className="item-cell col-status">
              <select
                className="subtask-select-inline"
                value={subtask.status || 'جديد'}
                onChange={(e) => updateSubtask(taskId, subtask.id, 'status', e.target.value)}
                style={{ backgroundColor: getStatusColor(subtask.status || 'جديد') }}
              >
                <option value="جديد">جديد</option>
                <option value="قيد العمل">قيد العمل</option>
                <option value="مكتمل">مكتمل</option>
                <option value="معلق">معلق</option>
              </select>
            </div>

            {/* Date Column */}
            <div className="item-cell col-date">
              <input
                type="date"
                className="subtask-input-inline"
                value={subtask.date || ''}
                onChange={(e) => updateSubtask(taskId, subtask.id, 'date', e.target.value)}
              />
            </div>

            {/* Link Column */}
            <div className="item-cell col-link">
              {subtask.link ? (
                <a
                  href={subtask.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-icon-btn"
                  title={subtask.link}
                >
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="empty">-</span>
              )}
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
          </div>
        </div>
        <div className="board-actions">
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
                  style={{ borderLeftColor: group.color }}
                  onClick={() => toggleGroupCollapse(group.id)}
                >
                  <div className="group-name">{group.title}</div>
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
                    <div className="header-cell">
                      المسؤول
                      <div
                        className={`column-resize-handle ${resizingColumn === 'person' ? 'resizing' : ''}`}
                        onMouseDown={(e) => handleResizeStart(e, 'person')}
                      />
                    </div>
                    <div className="header-cell">
                      الحالة
                      <div
                        className={`column-resize-handle ${resizingColumn === 'status' ? 'resizing' : ''}`}
                        onMouseDown={(e) => handleResizeStart(e, 'status')}
                      />
                    </div>
                    <div className="header-cell">
                      التاريخ
                      <div
                        className={`column-resize-handle ${resizingColumn === 'date' ? 'resizing' : ''}`}
                        onMouseDown={(e) => handleResizeStart(e, 'date')}
                      />
                    </div>
                    <div className="header-cell">
                      الرابط
                      <div
                        className={`column-resize-handle ${resizingColumn === 'link' ? 'resizing' : ''}`}
                        onMouseDown={(e) => handleResizeStart(e, 'link')}
                      />
                    </div>
                  </div>
                )}

                {/* Group Items */}
                {!isGroupCollapsed && items.map((item, itemIndex) => {
                  const person = getColumnValue(item, 'person') || getColumnValue(item, 'people')
                  const status = getColumnValue(item, 'status') || getColumnValue(item, 'color')
                  const date = getColumnValue(item, 'date')
                  const link = getColumnValue(item, 'link')
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

                      <div className="item-cell col-person">
                        {renderPersonCell(item.id, person, (newPerson) => {
                          // Update person in board data
                          setBoard(prevBoard => {
                            const updatedItems = prevBoard.items_page.items.map(boardItem => {
                              if (boardItem.id === item.id) {
                                const updatedColumnValues = boardItem.column_values.map(col => {
                                  if (col.type === 'person' || col.type === 'people' || col.type === 'multiple-person') {
                                    return { ...col, text: newPerson }
                                  }
                                  return col
                                })
                                return { ...boardItem, column_values: updatedColumnValues }
                              }
                              return boardItem
                            })
                            return {
                              ...prevBoard,
                              items_page: { items: updatedItems }
                            }
                          })
                          console.log(`Updated person for ${item.id} to ${newPerson}`)
                        })}
                      </div>
                      <div
                        className={`item-cell col-status interactive-cell ${hoveredCell === `${item.id}-status` ? 'cell-hovered' : ''}`}
                        onMouseEnter={() => setHoveredCell(`${item.id}-status`)}
                        onMouseLeave={() => setHoveredCell(null)}
                        onClick={(e) => handleCellClick(e, item.id, 'status')}
                      >
                        {status ? (
                          <div
                            className="status-pill"
                            style={{ backgroundColor: getStatusColor(status) }}
                          >
                            {status}
                          </div>
                        ) : (
                          <span className="empty">-</span>
                        )}
                        {hoveredCell === `${item.id}-status` && (
                          <button className="cell-action-btn">
                            <ChevronDown size={14} />
                          </button>
                        )}
                      </div>
                      <div
                        className={`item-cell col-date interactive-cell ${hoveredCell === `${item.id}-date` ? 'cell-hovered' : ''}`}
                        onMouseEnter={() => setHoveredCell(`${item.id}-date`)}
                        onMouseLeave={() => setHoveredCell(null)}
                        onClick={(e) => handleCellClick(e, item.id, 'date')}
                        title={item.creator?.name ? `أُنشئت بواسطة: ${item.creator.name}${item.created_at ? '\nتاريخ الإنشاء: ' + new Date(item.created_at).toLocaleDateString('ar-EG') : ''}` : ''}
                      >
                        {date ? <span>{date}</span> : <span className="empty">-</span>}
                        {hoveredCell === `${item.id}-date` && (
                          <button className="cell-action-btn">
                            <ChevronDown size={14} />
                          </button>
                        )}
                      </div>
                      <div className="item-cell col-link">
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-icon-btn"
                            title={link}
                          >
                            <ExternalLink size={16} />
                          </a>
                        ) : (
                          <span className="empty">-</span>
                        )}
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
    </div>
  )
}
