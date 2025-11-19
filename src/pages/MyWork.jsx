import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react'
import sundayDataStore from '../services/sundayDataStore'
import './MyWork.css'

export default function MyWork() {
  const [allTasks, setAllTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadCurrentUser()
    loadUserTasks()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [allTasks, filterStatus, searchQuery])

  const loadCurrentUser = () => {
    // جلب المستخدم الحالي من localStorage
    const user = localStorage.getItem('currentUser') || 'أنت'
    setCurrentUser(user)
  }

  const loadUserTasks = () => {
    const user = localStorage.getItem('currentUser') || 'أنت'
    const boards = sundayDataStore.getBoards()
    const tasks = []

    boards.forEach(board => {
      const boardItems = sundayDataStore.getItems(board.id)
      boardItems.forEach(item => {
        if (item.assignee && item.assignee.toLowerCase().includes(user.toLowerCase())) {
          tasks.push({
            ...item,
            boardId: board.id,
            boardName: board.name,
            groupName: board.groups?.find(g => g.id === item.groupId)?.title || 'بدون مجموعة'
          })
        }
      })
    })

    // ترتيب حسب تاريخ الاستحقاق
    tasks.sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })

    setAllTasks(tasks)
  }

  const applyFilters = () => {
    let filtered = [...allTasks]

    // فلتر حسب الحالة
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus)
    }

    // فلتر حسب البحث
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredTasks(filtered)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'مكتملة':
        return <CheckCircle2 size={16} className="status-icon completed" />
      case 'قيد العمل':
      case 'قيد_العمل':
        return <Circle size={16} className="status-icon in-progress" />
      case 'معلقة':
        return <AlertCircle size={16} className="status-icon blocked" />
      default:
        return <Circle size={16} className="status-icon new" />
    }
  }

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return null

    try {
      const dt = new Date(dateTimeStr)
      const date = dt.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })
      const time = dateTimeStr.includes('T') ? dt.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) : null

      return { date, time }
    } catch {
      return null
    }
  }

  const getTasksByStatus = () => {
    const grouped = {
      'جديدة': [],
      'قيد العمل': [],
      'معلقة': [],
      'مكتملة': []
    }

    filteredTasks.forEach(task => {
      const status = task.status || 'جديدة'
      if (grouped[status]) {
        grouped[status].push(task)
      } else if (status === 'قيد_العمل') {
        grouped['قيد العمل'].push(task)
      }
    })

    return grouped
  }

  const tasksByStatus = getTasksByStatus()

  return (
    <div className="my-work-page">
      <div className="my-work-header">
        <div>
          <h1>مهامي</h1>
          <p>كل المهام المعينة لك عبر جميع البوردات</p>
        </div>

        <div className="my-work-stats">
          <div className="stat-item">
            <span className="stat-value">{allTasks.length}</span>
            <span className="stat-label">إجمالي المهام</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{tasksByStatus['قيد العمل']?.length || 0}</span>
            <span className="stat-label">قيد العمل</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{tasksByStatus['معلقة']?.length || 0}</span>
            <span className="stat-label">معلقة</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="my-work-filters">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            الكل ({allTasks.length})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'جديدة' ? 'active' : ''}`}
            onClick={() => setFilterStatus('جديدة')}
          >
            جديدة ({tasksByStatus['جديدة']?.length || 0})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'قيد العمل' ? 'active' : ''}`}
            onClick={() => setFilterStatus('قيد العمل')}
          >
            قيد العمل ({tasksByStatus['قيد العمل']?.length || 0})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'معلقة' ? 'active' : ''}`}
            onClick={() => setFilterStatus('معلقة')}
          >
            معلقة ({tasksByStatus['معلقة']?.length || 0})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'مكتملة' ? 'active' : ''}`}
            onClick={() => setFilterStatus('مكتملة')}
          >
            مكتملة ({tasksByStatus['مكتملة']?.length || 0})
          </button>
        </div>

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="بحث في المهام..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="my-work-content">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <CheckCircle2 size={64} />
            <h3>لا توجد مهام</h3>
            <p>
              {filterStatus === 'all'
                ? 'لا توجد مهام معينة لك حالياً'
                : `لا توجد مهام بحالة "${filterStatus}"`}
            </p>
          </div>
        ) : (
          <div className="tasks-list">
            {filteredTasks.map(task => (
              <Link
                key={task.id}
                to={`/board/${task.boardId}`}
                className="task-card"
              >
                <div className="task-header">
                  {getStatusIcon(task.status)}
                  <span className="task-name">{task.name}</span>
                </div>

                <div className="task-meta">
                  <div className="task-location">
                    <span className="board-name">{task.boardName}</span>
                    <ChevronRight size={12} />
                    <span className="group-name">{task.groupName}</span>
                  </div>

                  {task.dueDate && (
                    <div className="task-due-date">
                      {(() => {
                        const formatted = formatDateTime(task.dueDate)
                        const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'مكتملة'

                        return (
                          <div className={`due-date-badge ${isOverdue ? 'overdue' : ''}`}>
                            <Calendar size={12} />
                            <span>{formatted.date}</span>
                            {formatted.time && (
                              <>
                                <Clock size={10} />
                                <span className="time">{formatted.time}</span>
                              </>
                            )}
                          </div>
                        )
                      })()}
                    </div>
                  )}
                </div>

                <div className="task-status">
                  <span className={`status-badge status-${task.status}`}>
                    {task.status || 'جديدة'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
