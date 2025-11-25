import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ref, onValue, set } from 'firebase/database'
import { database } from '../firebase'
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
  XCircle
} from 'lucide-react'
import './BoardPro.css'

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ2MzU3MDU0MSwiYWFpIjoxMSwidWlkIjo3MTc0OTc3MCwiaWFkIjoiMjAyNS0wMS0wOFQxMTo1NjozNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Mjc0NjA4NDMsInJnbiI6ImV1YzEifQ.LMpcLUJqpccHB7UVJJKlLiMg5k-4cxPVVmEHOvjQj1M'
const MONDAY_API_URL = 'https://api.monday.com/v2'

export default function BoardPro() {
  const { boardId, id } = useParams()
  const actualBoardId = boardId || id  // دعم كلا المسارين
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPerson, setSelectedPerson] = useState('all')
  const [viewMode, setViewMode] = useState('timeline') // timeline, kanban, table
  const [selectedTask, setSelectedTask] = useState(null)
  const [showTaskPanel, setShowTaskPanel] = useState(false)

  // Fetch from Monday.com
  const fetchFromMonday = useCallback(async () => {
    if (!actualBoardId) return null

    const query = `
      query {
        boards(ids: [${actualBoardId}]) {
          id
          name
          description
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
                title
                color
              }
              column_values {
                id
                type
                text
                value
              }
              created_at
              updated_at
            }
          }
        }
      }
    `

    try {
      const response = await fetch(MONDAY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': MONDAY_API_TOKEN
        },
        body: JSON.stringify({ query })
      })

      const result = await response.json()
      if (result.data?.boards?.[0]) {
        const boardData = result.data.boards[0]
        // Save to Firebase
        await set(ref(database, `boards/${actualBoardId}`), {
          ...boardData,
          lastSync: new Date().toISOString()
        })
        return boardData
      }
    } catch (error) {
      console.error('Error fetching from Monday:', error)
    }
    return null
  }, [actualBoardId])

  // Load data
  useEffect(() => {
    if (!actualBoardId) return

    const boardRef = ref(database, `boards/${actualBoardId}`)

    const unsubscribe = onValue(boardRef, async (snapshot) => {
      const data = snapshot.val()

      if (data) {
        setBoard(data)
        setLoading(false)
      } else {
        // Fetch from Monday if not in Firebase
        const mondayData = await fetchFromMonday()
        if (mondayData) {
          setBoard(mondayData)
        }
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [actualBoardId, fetchFromMonday])

  const handleRefresh = async () => {
    setLoading(true)
    await fetchFromMonday()
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
              className={`view-mode ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
            >
              <TrendingUp size={18} />
            </button>
            <button
              className={`view-mode ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
            >
              <BarChart3 size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pro-content">
        {viewMode === 'timeline' ? (
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
