import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ref, onValue, get } from 'firebase/database'
import { database } from '../firebase/config'
import {
  RefreshCw,
  Search,
  Filter,
  Plus,
  Clock,
  User,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  Zap,
  Target,
  TrendingUp,
  Star,
  Flag,
  MessageSquare,
  Paperclip,
  Eye,
  Edit3,
  Trash2,
  Copy,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Circle,
  PlayCircle,
  PauseCircle,
  XCircle,
  Settings,
  Bot,
  Wand2,
  SortAsc,
  Columns,
  PlusCircle,
  Replace,
  Puzzle,
  Type,
  Code,
  Table,
  List,
  LayoutGrid
} from 'lucide-react'
import BoardChat from '../components/BoardChat'
import './BoardPro.css'

export default function BoardPro() {
  const { boardId, id } = useParams()
  const actualBoardId = boardId || id  // دعم كلا المسارين
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPerson, setSelectedPerson] = useState('all')
  const [viewMode, setViewMode] = useState('table') // timeline, kanban, table
  const [selectedTask, setSelectedTask] = useState(null)
  const [showTaskPanel, setShowTaskPanel] = useState(false)
  const [activeColumnMenu, setActiveColumnMenu] = useState(null) // لإظهار قائمة العمود
  const [collapsedColumns, setCollapsedColumns] = useState([]) // الأعمدة المطوية
  const [expandedTasks, setExpandedTasks] = useState({}) // المهام المفتوحة لعرض السب تاسك
  const [editingSubtask, setEditingSubtask] = useState(null) // السب تاسك قيد التعديل
  const [newSubtaskName, setNewSubtaskName] = useState('') // اسم السب تاسك الجديد

  // Toggle task expansion
  const toggleTaskExpansion = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }

  // Get subitems for a task
  const getSubitems = (item) => {
    const subitemsCol = item.column_values?.find(c => c.id === 'subitems' || c.type === 'subtasks')
    if (subitemsCol?.value) {
      try {
        const parsed = JSON.parse(subitemsCol.value)
        return parsed?.linkedPulseIds?.map(sub => ({
          id: sub.linkedPulseId,
          name: sub.name || `سب تاسك ${sub.linkedPulseId}`,
          column_values: sub.column_values || []
        })) || []
      } catch {
        return []
      }
    }
    // Check for subitems in item directly
    if (item.subitems) {
      return item.subitems
    }
    return []
  }

  // Add new subtask
  const handleAddSubtask = async (parentItem) => {
    if (!newSubtaskName.trim()) return
    // TODO: Implement Firebase add subtask
    console.log('Adding subtask:', newSubtaskName, 'to', parentItem.id)
    setNewSubtaskName('')
    setEditingSubtask(null)
  }

  // Delete subtask
  const handleDeleteSubtask = async (parentId, subtaskId) => {
    // TODO: Implement Firebase delete subtask
    console.log('Deleting subtask:', subtaskId, 'from', parentId)
  }

  // Load data from Firebase only
  useEffect(() => {
    if (!actualBoardId) return

    const boardRef = ref(database, `boards/${actualBoardId}`)

    const unsubscribe = onValue(boardRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setBoard(data)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [actualBoardId])

  const handleRefresh = async () => {
    setLoading(true)
    // إعادة تحميل من Firebase
    const boardRef = ref(database, `boards/${actualBoardId}`)
    const snapshot = await get(boardRef)
    if (snapshot.exists()) {
      setBoard(snapshot.val())
    }
    setLoading(false)
  }

  // Get status from task
  const getTaskStatus = (item) => {
    const statusCol = item.column_values?.find(c =>
      c.type === 'status' || c.id?.includes('status')
    )
    return statusCol?.text?.toLowerCase() || ''
  }

  // Get person from task
  const getTaskPerson = (item) => {
    const personCol = item.column_values?.find(c =>
      c.type === 'multiple-person' || c.type === 'person' || c.type === 'people'
    )
    if (personCol?.text) return personCol.text

    if (personCol?.value) {
      try {
        const parsed = JSON.parse(personCol.value)
        if (parsed?.personsAndTeams?.[0]?.name) {
          return parsed.personsAndTeams[0].name
        }
      } catch {}
    }
    return null
  }

  // Get priority from task
  const getTaskPriority = (item) => {
    const priorityCol = item.column_values?.find(c =>
      c.id?.includes('priority') || c.title?.includes('أولوية')
    )
    return priorityCol?.text || ''
  }

  // Get date from task
  const getTaskDate = (item) => {
    const dateCol = item.column_values?.find(c =>
      c.type === 'date' || c.id?.includes('date')
    )
    return dateCol?.text || ''
  }

  // Filter items
  const getFilteredItems = () => {
    if (!board?.items_page?.items) return []

    return board.items_page.items.filter(item => {
      const matchesSearch = !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase())

      const status = getTaskStatus(item)
      const matchesStatus = selectedStatus === 'all' ||
        (selectedStatus === 'done' && status.includes('done')) ||
        (selectedStatus === 'working' && status.includes('working')) ||
        (selectedStatus === 'stuck' && status.includes('stuck')) ||
        (selectedStatus === 'pending' && !status)

      const person = getTaskPerson(item)
      const matchesPerson = selectedPerson === 'all' || person === selectedPerson

      return matchesSearch && matchesStatus && matchesPerson
    })
  }

  // Get unique persons
  const getPersons = () => {
    if (!board?.items_page?.items) return []
    const persons = new Set()
    board.items_page.items.forEach(item => {
      const person = getTaskPerson(item)
      if (person) persons.add(person)
    })
    return Array.from(persons)
  }

  // Get stats
  const getStats = () => {
    const items = board?.items_page?.items || []
    const total = items.length
    const done = items.filter(i => getTaskStatus(i).includes('done')).length
    const working = items.filter(i => getTaskStatus(i).includes('working')).length
    const stuck = items.filter(i => getTaskStatus(i).includes('stuck')).length
    const productivity = total > 0 ? Math.round((done / total) * 100) : 0

    return { total, done, working, stuck, productivity }
  }

  const stats = getStats()
  const filteredItems = getFilteredItems()

  // Group items by group
  const getGroupedItems = () => {
    const groups = {}
    filteredItems.forEach(item => {
      const groupId = item.group?.id || 'ungrouped'
      const groupTitle = item.group?.title || 'بدون مجموعة'
      const groupColor = item.group?.color || '#6366f1'

      if (!groups[groupId]) {
        groups[groupId] = {
          id: groupId,
          title: groupTitle,
          color: groupColor,
          items: []
        }
      }
      groups[groupId].items.push(item)
    })
    return Object.values(groups)
  }

  // Status icon component
  const StatusIcon = ({ status }) => {
    if (status.includes('done')) return <CheckCircle2 className="status-icon done" size={18} />
    if (status.includes('working')) return <PlayCircle className="status-icon working" size={18} />
    if (status.includes('stuck')) return <XCircle className="status-icon stuck" size={18} />
    return <Circle className="status-icon pending" size={18} />
  }

  // Open task panel
  const openTaskPanel = (task) => {
    setSelectedTask(task)
    setShowTaskPanel(true)
  }

  // Get cell class based on column type and value
  const getCellClass = (type, text) => {
    if (type === 'status' || type === 'color') {
      const t = text?.toLowerCase() || ''
      if (t.includes('done') || t.includes('تم') || t.includes('مكتمل')) return 'status-done'
      if (t.includes('working') || t.includes('قيد') || t.includes('جاري')) return 'status-working'
      if (t.includes('stuck') || t.includes('معلق') || t.includes('متوقف')) return 'status-stuck'
    }
    return ''
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveColumnMenu(null)
    if (activeColumnMenu) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeColumnMenu])

  if (loading) {
    return (
      <div className="board-pro loading">
        <div className="loading-spinner">
          <Sparkles className="spinning" size={40} />
        </div>
        <p>جاري تحميل البورد...</p>
      </div>
    )
  }

  if (!board) {
    return (
      <div className="board-pro empty">
        <Target size={48} />
        <h2>لم يتم العثور على البورد</h2>
        <button className="btn-primary" onClick={handleRefresh}>
          <RefreshCw size={18} />
          <span>إعادة المحاولة</span>
        </button>
      </div>
    )
  }

  return (
    <div className="board-pro">
      {/* Header Section */}
      <header className="pro-header">
        <div className="header-top">
          <div className="board-identity">
            <div className="board-icon-wrapper">
              <Sparkles size={24} />
            </div>
            <div className="board-title-section">
              <h1>{board.name}</h1>
              <p className="board-subtitle">{board.description || 'إدارة المهام بكفاءة'}</p>
            </div>
          </div>

          <div className="header-actions">
            <button className="action-btn" onClick={handleRefresh}>
              <RefreshCw size={18} />
            </button>
            <button className="action-btn primary">
              <Plus size={18} />
              <span>مهمة جديدة</span>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card total">
            <div className="stat-icon">
              <BarChart3 size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">إجمالي المهام</span>
            </div>
          </div>

          <div className="stat-card done">
            <div className="stat-icon">
              <CheckCircle2 size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.done}</span>
              <span className="stat-label">مكتمل</span>
            </div>
          </div>

          <div className="stat-card working">
            <div className="stat-icon">
              <PlayCircle size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.working}</span>
              <span className="stat-label">قيد العمل</span>
            </div>
          </div>

          <div className="stat-card stuck">
            <div className="stat-icon">
              <AlertCircle size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.stuck}</span>
              <span className="stat-label">متوقف</span>
            </div>
          </div>

          <div className="stat-card productivity">
            <div className="productivity-circle">
              <svg viewBox="0 0 36 36">
                <path
                  className="bg-circle"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="progress-circle"
                  strokeDasharray={`${stats.productivity}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="productivity-value">{stats.productivity}%</span>
            </div>
            <span className="stat-label">الإنتاجية</span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="search-wrapper">
            <Search size={18} />
            <input
              type="text"
              placeholder="بحث في المهام..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">جميع الحالات</option>
              <option value="done">مكتمل</option>
              <option value="working">قيد العمل</option>
              <option value="stuck">متوقف</option>
              <option value="pending">معلق</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
            >
              <option value="all">جميع الأشخاص</option>
              {getPersons().map(person => (
                <option key={person} value={person}>{person}</option>
              ))}
            </select>
          </div>

          <div className="view-modes">
            <button
              className={`view-mode ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="عرض الجدول"
            >
              <Table size={18} />
            </button>
            <button
              className={`view-mode ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
              title="عرض Timeline"
            >
              <List size={18} />
            </button>
            <button
              className={`view-mode ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
              title="عرض Kanban"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pro-content">
        {viewMode === 'table' ? (
          <div className="table-view">
            {getGroupedItems().map(group => (
              <div key={group.id} className="table-group">
                <div className="table-group-header" style={{ '--group-color': group.color }}>
                  <div className="group-indicator" />
                  <ChevronDown size={18} />
                  <h3>{group.title}</h3>
                  <span className="group-count">{group.items.length} مهام</span>
                </div>

                <div className="table-wrapper">
                  <table className="pro-table">
                    <thead>
                      <tr>
                        <th className="col-checkbox">
                          <input type="checkbox" />
                        </th>
                        <th className="col-name">
                          <span>المهمة</span>
                        </th>
                        {board.columns?.filter(col =>
                          !['name', 'subitems'].includes(col.id) &&
                          !collapsedColumns.includes(col.id)
                        ).slice(0, 6).map(column => (
                          <th key={column.id} className="col-data">
                            <div className="column-header-cell">
                              <span>{column.title}</span>
                              <button
                                className="column-menu-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveColumnMenu(activeColumnMenu === column.id ? null : column.id)
                                }}
                              >
                                <MoreVertical size={16} />
                              </button>

                              {/* Column Settings Menu */}
                              {activeColumnMenu === column.id && (
                                <div className="column-menu" onClick={(e) => e.stopPropagation()}>
                                  <div className="menu-header">
                                    <Code size={14} />
                                    <span>Column ID: {column.id}</span>
                                  </div>

                                  <div className="menu-divider" />

                                  <button className="menu-item">
                                    <Settings size={16} />
                                    <span>تخصيص عمود {column.title}</span>
                                  </button>

                                  <button className="menu-item">
                                    <Type size={16} />
                                    <span>إضافة وصف</span>
                                  </button>

                                  <div className="menu-divider" />

                                  <button className="menu-item">
                                    <Bot size={16} />
                                    <span>إجراءات الذكاء الاصطناعي</span>
                                  </button>

                                  <button className="menu-item">
                                    <Wand2 size={16} />
                                    <span>تعبئة تلقائية لهذا العمود</span>
                                  </button>

                                  <div className="menu-divider" />

                                  <button className="menu-item">
                                    <Filter size={16} />
                                    <span>تصفية</span>
                                  </button>

                                  <button className="menu-item">
                                    <SortAsc size={16} />
                                    <span>ترتيب</span>
                                  </button>

                                  <button className="menu-item" onClick={() => {
                                    setCollapsedColumns([...collapsedColumns, column.id])
                                    setActiveColumnMenu(null)
                                  }}>
                                    <ChevronRight size={16} />
                                    <span>طي العمود</span>
                                  </button>

                                  <button className="menu-item">
                                    <Columns size={16} />
                                    <span>تجميع حسب</span>
                                  </button>

                                  <div className="menu-divider" />

                                  <button className="menu-item">
                                    <Star size={16} />
                                    <span>تعيين العمود كمطلوب</span>
                                  </button>

                                  <button className="menu-item">
                                    <Calendar size={16} />
                                    <span>تعيين كموعد نهائي</span>
                                  </button>

                                  <button className="menu-item">
                                    <Clock size={16} />
                                    <span>إضافة/تعديل تذكيرات</span>
                                  </button>

                                  <div className="menu-divider" />

                                  <button className="menu-item">
                                    <Eye size={16} />
                                    <span>تقييد عرض العمود</span>
                                  </button>

                                  <button className="menu-item">
                                    <Edit3 size={16} />
                                    <span>تقييد تعديل العمود</span>
                                  </button>

                                  <button className="menu-item">
                                    <BarChart3 size={16} />
                                    <span>إظهار ملخص العمود</span>
                                  </button>

                                  <div className="menu-divider" />

                                  <button className="menu-item">
                                    <Copy size={16} />
                                    <span>تكرار العمود</span>
                                  </button>

                                  <button className="menu-item">
                                    <PlusCircle size={16} />
                                    <span>إضافة عمود على اليمين</span>
                                  </button>

                                  <button className="menu-item">
                                    <Replace size={16} />
                                    <span>تغيير نوع العمود</span>
                                  </button>

                                  <button className="menu-item">
                                    <Puzzle size={16} />
                                    <span>إضافات العمود</span>
                                  </button>

                                  <div className="menu-divider" />

                                  <button className="menu-item">
                                    <Sparkles size={16} />
                                    <span>حفظ كقالب</span>
                                  </button>

                                  <button className="menu-item">
                                    <Type size={16} />
                                    <span>إعادة تسمية</span>
                                  </button>

                                  <button className="menu-item danger">
                                    <Trash2 size={16} />
                                    <span>حذف</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </th>
                        ))}
                        <th className="col-add">
                          <button className="add-column-btn">
                            <Plus size={16} />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map(item => {
                        const subitems = getSubitems(item)
                        const hasSubitems = subitems.length > 0
                        const isExpanded = expandedTasks[item.id]

                        return (
                          <React.Fragment key={item.id}>
                            {/* Main Task Row */}
                            <tr className={`task-row-main ${hasSubitems ? 'has-subitems' : ''} ${isExpanded ? 'expanded' : ''}`}>
                              <td className="col-checkbox">
                                <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                              </td>
                              <td className="col-name">
                                <div className="task-name-wrapper">
                                  {/* Expand/Collapse Button */}
                                  <button
                                    className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleTaskExpansion(item.id)
                                    }}
                                  >
                                    <ChevronRight size={16} />
                                  </button>
                                  <span className="task-name-cell" onClick={() => openTaskPanel(item)}>
                                    {item.name}
                                  </span>
                                  {hasSubitems && (
                                    <span className="subitems-count">{subitems.length}</span>
                                  )}
                                </div>
                              </td>
                              {board.columns?.filter(col =>
                                !['name', 'subitems'].includes(col.id) &&
                                !collapsedColumns.includes(col.id)
                              ).slice(0, 6).map(column => {
                                const colValue = item.column_values?.find(cv => cv.id === column.id)
                                const cellClass = getCellClass(column.type, colValue?.text)

                                return (
                                  <td key={column.id} className={`col-data ${cellClass}`}>
                                    <span className="cell-value">{colValue?.text || '-'}</span>
                                  </td>
                                )
                              })}
                              <td className="col-add">
                                <button
                                  className="add-subtask-icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setEditingSubtask(item.id)
                                    setExpandedTasks(prev => ({ ...prev, [item.id]: true }))
                                  }}
                                  title="إضافة سب تاسك"
                                >
                                  <Plus size={14} />
                                </button>
                              </td>
                            </tr>

                            {/* Sub-items Rows */}
                            {isExpanded && (
                              <>
                                {subitems.map((subitem, subIndex) => (
                                  <tr
                                    key={subitem.id}
                                    className="subtask-row"
                                    style={{ animationDelay: `${subIndex * 0.05}s` }}
                                  >
                                    <td className="col-checkbox">
                                      <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                                    </td>
                                    <td className="col-name">
                                      <div className="subtask-name-wrapper">
                                        <div className="tree-connector">
                                          <span className={`tree-line ${subIndex === subitems.length - 1 ? 'last' : ''}`}></span>
                                        </div>
                                        <span className="subtask-icon">
                                          <Circle size={8} />
                                        </span>
                                        <span className="subtask-name" onClick={() => openTaskPanel(subitem)}>
                                          {subitem.name}
                                        </span>
                                      </div>
                                    </td>
                                    {board.columns?.filter(col =>
                                      !['name', 'subitems'].includes(col.id) &&
                                      !collapsedColumns.includes(col.id)
                                    ).slice(0, 6).map(column => {
                                      const colValue = subitem.column_values?.find(cv => cv.id === column.id)
                                      const cellClass = getCellClass(column.type, colValue?.text)

                                      return (
                                        <td key={column.id} className={`col-data subtask-cell ${cellClass}`}>
                                          <span className="cell-value">{colValue?.text || '-'}</span>
                                        </td>
                                      )
                                    })}
                                    <td className="col-add">
                                      <button
                                        className="delete-subtask-btn"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleDeleteSubtask(item.id, subitem.id)
                                        }}
                                        title="حذف"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}

                                {/* Add new subtask row */}
                                {editingSubtask === item.id ? (
                                  <tr className="add-subtask-row">
                                    <td className="col-checkbox"></td>
                                    <td className="col-name">
                                      <div className="subtask-name-wrapper">
                                        <div className="tree-connector">
                                          <span className="tree-line last"></span>
                                        </div>
                                        <input
                                          type="text"
                                          className="subtask-input"
                                          placeholder="اسم السب تاسك..."
                                          value={newSubtaskName}
                                          onChange={(e) => setNewSubtaskName(e.target.value)}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleAddSubtask(item)
                                            if (e.key === 'Escape') setEditingSubtask(null)
                                          }}
                                          autoFocus
                                        />
                                      </div>
                                    </td>
                                    <td colSpan={6}>
                                      <div className="subtask-actions">
                                        <button
                                          className="save-subtask-btn"
                                          onClick={() => handleAddSubtask(item)}
                                        >
                                          <CheckCircle2 size={14} />
                                          حفظ
                                        </button>
                                        <button
                                          className="cancel-subtask-btn"
                                          onClick={() => setEditingSubtask(null)}
                                        >
                                          <XCircle size={14} />
                                          إلغاء
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ) : (
                                  <tr className="add-subtask-row clickable">
                                    <td className="col-checkbox"></td>
                                    <td className="col-name" colSpan={7}>
                                      <button
                                        className="add-subtask-btn"
                                        onClick={() => setEditingSubtask(item.id)}
                                      >
                                        <Plus size={14} />
                                        <span>إضافة سب تاسك</span>
                                      </button>
                                    </td>
                                  </tr>
                                )}
                              </>
                            )}
                          </React.Fragment>
                        )
                      })}
                      {/* Add new task row */}
                      <tr className="add-task-row">
                        <td className="col-checkbox"></td>
                        <td className="col-name" colSpan={board.columns?.length + 1 || 7}>
                          <button className="add-task-btn">
                            <Plus size={16} />
                            <span>إضافة مهمة</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Collapsed columns indicator */}
                {collapsedColumns.length > 0 && (
                  <div className="collapsed-columns">
                    {collapsedColumns.map(colId => {
                      const col = board.columns?.find(c => c.id === colId)
                      return col ? (
                        <button
                          key={colId}
                          className="collapsed-col-btn"
                          onClick={() => setCollapsedColumns(collapsedColumns.filter(id => id !== colId))}
                          title={`إظهار ${col.title}`}
                        >
                          {col.title.charAt(0)}
                        </button>
                      ) : null
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : viewMode === 'timeline' ? (
          <div className="timeline-view">
            {getGroupedItems().map(group => (
              <div key={group.id} className="timeline-group">
                <div className="group-header" style={{ '--group-color': group.color }}>
                  <div className="group-indicator" />
                  <h3>{group.title}</h3>
                  <span className="group-count">{group.items.length}</span>
                </div>

                <div className="timeline-items">
                  {group.items.map((item, index) => {
                    const status = getTaskStatus(item)
                    const person = getTaskPerson(item)
                    const priority = getTaskPriority(item)
                    const date = getTaskDate(item)

                    return (
                      <div
                        key={item.id}
                        className={`timeline-item ${status.includes('done') ? 'done' : ''} ${status.includes('stuck') ? 'stuck' : ''}`}
                        onClick={() => openTaskPanel(item)}
                        style={{ '--delay': `${index * 0.05}s` }}
                      >
                        <div className="item-connector">
                          <div className="connector-line" />
                          <StatusIcon status={status} />
                        </div>

                        <div className="item-card">
                          <div className="item-header">
                            <h4>{item.name}</h4>
                            <button className="item-menu">
                              <MoreVertical size={16} />
                            </button>
                          </div>

                          <div className="item-meta">
                            {person && (
                              <span className="meta-tag person">
                                <User size={14} />
                                {person}
                              </span>
                            )}
                            {date && (
                              <span className="meta-tag date">
                                <Calendar size={14} />
                                {date}
                              </span>
                            )}
                            {priority && (
                              <span className={`meta-tag priority ${priority.toLowerCase()}`}>
                                <Flag size={14} />
                                {priority}
                              </span>
                            )}
                          </div>

                          <div className="item-footer">
                            <span className={`status-badge ${status.includes('done') ? 'done' : ''} ${status.includes('working') ? 'working' : ''} ${status.includes('stuck') ? 'stuck' : ''}`}>
                              {status || 'معلق'}
                            </span>
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="kanban-view">
            <div className="kanban-column pending">
              <div className="column-header">
                <Circle size={18} />
                <h3>معلق</h3>
                <span className="column-count">
                  {filteredItems.filter(i => !getTaskStatus(i)).length}
                </span>
              </div>
              <div className="column-items">
                {filteredItems.filter(i => !getTaskStatus(i)).map(item => (
                  <KanbanCard key={item.id} item={item} onClick={() => openTaskPanel(item)} />
                ))}
              </div>
            </div>

            <div className="kanban-column working">
              <div className="column-header">
                <PlayCircle size={18} />
                <h3>قيد العمل</h3>
                <span className="column-count">
                  {filteredItems.filter(i => getTaskStatus(i).includes('working')).length}
                </span>
              </div>
              <div className="column-items">
                {filteredItems.filter(i => getTaskStatus(i).includes('working')).map(item => (
                  <KanbanCard key={item.id} item={item} onClick={() => openTaskPanel(item)} />
                ))}
              </div>
            </div>

            <div className="kanban-column stuck">
              <div className="column-header">
                <XCircle size={18} />
                <h3>متوقف</h3>
                <span className="column-count">
                  {filteredItems.filter(i => getTaskStatus(i).includes('stuck')).length}
                </span>
              </div>
              <div className="column-items">
                {filteredItems.filter(i => getTaskStatus(i).includes('stuck')).map(item => (
                  <KanbanCard key={item.id} item={item} onClick={() => openTaskPanel(item)} />
                ))}
              </div>
            </div>

            <div className="kanban-column done">
              <div className="column-header">
                <CheckCircle2 size={18} />
                <h3>مكتمل</h3>
                <span className="column-count">
                  {filteredItems.filter(i => getTaskStatus(i).includes('done')).length}
                </span>
              </div>
              <div className="column-items">
                {filteredItems.filter(i => getTaskStatus(i).includes('done')).map(item => (
                  <KanbanCard key={item.id} item={item} onClick={() => openTaskPanel(item)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Task Detail Panel */}
      {showTaskPanel && selectedTask && (
        <div className="task-panel-overlay" onClick={() => setShowTaskPanel(false)}>
          <div className="task-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <div className="panel-title">
                <StatusIcon status={getTaskStatus(selectedTask)} />
                <h2>{selectedTask.name}</h2>
              </div>
              <button className="close-panel" onClick={() => setShowTaskPanel(false)}>
                ×
              </button>
            </div>

            <div className="panel-content">
              <div className="panel-section">
                <h4>التفاصيل</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">الحالة</span>
                    <span className={`detail-value status ${getTaskStatus(selectedTask)}`}>
                      {getTaskStatus(selectedTask) || 'معلق'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">المسؤول</span>
                    <span className="detail-value">
                      {getTaskPerson(selectedTask) || 'غير محدد'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">التاريخ</span>
                    <span className="detail-value">
                      {getTaskDate(selectedTask) || 'غير محدد'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">المجموعة</span>
                    <span className="detail-value">
                      {selectedTask.group?.title || 'بدون مجموعة'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="panel-section">
                <h4>جميع البيانات</h4>
                <div className="column-values">
                  {selectedTask.column_values?.map(col => (
                    <div key={col.id} className="column-item">
                      <span className="col-id">{col.id}</span>
                      <span className="col-value">{col.text || '-'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel-actions">
              <button className="panel-btn">
                <Edit3 size={16} />
                تعديل
              </button>
              <button className="panel-btn">
                <Copy size={16} />
                نسخ
              </button>
              <button className="panel-btn danger">
                <Trash2 size={16} />
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Board Chat */}
      <BoardChat boardId={actualBoardId} boardName={board?.name} />
    </div>
  )
}

// Kanban Card Component
function KanbanCard({ item, onClick }) {
  const getTaskStatus = (item) => {
    const statusCol = item.column_values?.find(c =>
      c.type === 'status' || c.id?.includes('status')
    )
    return statusCol?.text?.toLowerCase() || ''
  }

  const getTaskPerson = (item) => {
    const personCol = item.column_values?.find(c =>
      c.type === 'multiple-person' || c.type === 'person' || c.type === 'people'
    )
    if (personCol?.text) return personCol.text
    try {
      const parsed = JSON.parse(personCol?.value || '{}')
      return parsed?.personsAndTeams?.[0]?.name
    } catch {
      return null
    }
  }

  const person = getTaskPerson(item)

  return (
    <div className="kanban-card" onClick={onClick}>
      <h4>{item.name}</h4>
      {person && (
        <div className="card-person">
          <User size={14} />
          <span>{person}</span>
        </div>
      )}
      <div className="card-group">
        <span style={{ color: item.group?.color }}>{item.group?.title}</span>
      </div>
    </div>
  )
}
