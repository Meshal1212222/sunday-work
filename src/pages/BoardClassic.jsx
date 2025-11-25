import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { database } from '../firebase/config'
import { ref, get, onValue } from 'firebase/database'
import {
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  MessageSquare,
  Plus,
  RefreshCw
} from 'lucide-react'
import './BoardClassic.css'

export default function BoardClassic() {
  const { boardId, id } = useParams()
  const actualBoardId = boardId || id  // دعم كلا المسارين
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    loadBoard()
  }, [actualBoardId])

  const loadBoard = async () => {
    setLoading(true)
    try {
      // تحميل من Firebase فقط
      const boardRef = ref(database, `boards/${actualBoardId}`)
      const snapshot = await get(boardRef)

      if (snapshot.exists()) {
        const data = snapshot.val()

        // تحويل البيانات من الهيكل المحفوظ
        let items = []

        // إذا كانت البيانات بالهيكل القديم (itemsByGroup)
        if (data.itemsByGroup) {
          Object.entries(data.itemsByGroup).forEach(([groupId, groupItems]) => {
            const group = data.board?.groups?.find(g => g.id === groupId) ||
                         data.groups?.find(g => g.id === groupId)
            if (Array.isArray(groupItems)) {
              groupItems.forEach(item => {
                items.push({
                  ...item,
                  groupName: group?.title || 'مهام',
                  groupColor: group?.color || '#0073ea'
                })
              })
            }
          })
          setBoard({ ...(data.board || data), items })
        }
        // إذا كانت البيانات بالهيكل الجديد (items_page)
        else if (data.items_page?.items) {
          items = data.items_page.items.map(item => {
            const statusCol = item.column_values?.find(c => c.type === 'status' || c.type === 'color')
            const personCol = item.column_values?.find(c => c.type === 'multiple-person' || c.type === 'person')
            const dateCol = item.column_values?.find(c => c.type === 'date')

            return {
              id: item.id,
              name: item.name,
              status: statusCol?.text || 'جديد',
              assignee: personCol?.text || 'غير معين',
              dueDate: dateCol?.text || null,
              groupName: item.group?.title || 'مهام',
              groupColor: data.groups?.find(g => g.id === item.group?.id)?.color || '#0073ea',
              columnValues: item.column_values
            }
          })
          setBoard({ ...data, items })
        }
        // إذا كانت items موجودة مباشرة
        else if (data.items) {
          setBoard(data)
        }
      }
    } catch (err) {
      console.error('Error loading board:', err)
    }
    setLoading(false)
  }

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase() || ''
    if (s.includes('done') || s.includes('مكتمل') || s.includes('تم')) {
      return <CheckCircle className="status-icon done" size={18} />
    }
    if (s.includes('working') || s.includes('قيد') || s.includes('جاري')) {
      return <Clock className="status-icon working" size={18} />
    }
    if (s.includes('stuck') || s.includes('معلق')) {
      return <AlertCircle className="status-icon stuck" size={18} />
    }
    return <div className="status-icon default" />
  }

  const getStatusClass = (status) => {
    const s = status?.toLowerCase() || ''
    if (s.includes('done') || s.includes('مكتمل') || s.includes('تم')) return 'done'
    if (s.includes('working') || s.includes('قيد') || s.includes('جاري')) return 'working'
    if (s.includes('stuck') || s.includes('معلق')) return 'stuck'
    return 'default'
  }

  const filteredItems = board?.items?.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || getStatusClass(item.status) === filterStatus
    return matchesSearch && matchesFilter
  }) || []

  // تجميع المهام حسب المجموعة
  const groupedItems = filteredItems.reduce((acc, item) => {
    const group = item.groupName || 'مهام أخرى'
    if (!acc[group]) {
      acc[group] = { items: [], color: item.groupColor }
    }
    acc[group].items.push(item)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="board-classic loading">
        <RefreshCw className="spinning" size={48} />
        <p>جاري تحميل البورد...</p>
      </div>
    )
  }

  return (
    <div className="board-classic">
      {/* Header */}
      <div className="board-classic-header">
        <div className="header-right">
          <h1>{board?.name || 'البورد'}</h1>
          <span className="tasks-count">{filteredItems.length} مهمة</span>
        </div>

        <div className="header-actions">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="بحث في المهام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              الكل
            </button>
            <button
              className={`filter-btn done ${filterStatus === 'done' ? 'active' : ''}`}
              onClick={() => setFilterStatus('done')}
            >
              <CheckCircle size={14} /> مكتمل
            </button>
            <button
              className={`filter-btn working ${filterStatus === 'working' ? 'active' : ''}`}
              onClick={() => setFilterStatus('working')}
            >
              <Clock size={14} /> قيد العمل
            </button>
            <button
              className={`filter-btn stuck ${filterStatus === 'stuck' ? 'active' : ''}`}
              onClick={() => setFilterStatus('stuck')}
            >
              <AlertCircle size={14} /> معلق
            </button>
          </div>

          <button className="refresh-btn" onClick={loadBoard}>
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="tasks-container">
        {Object.entries(groupedItems).map(([groupName, { items, color }]) => (
          <div key={groupName} className="task-group">
            <div className="group-header" style={{ borderColor: color }}>
              <span className="group-color" style={{ backgroundColor: color }} />
              <h2>{groupName}</h2>
              <span className="group-count">{items.length}</span>
            </div>

            <div className="tasks-grid">
              {items.map(task => (
                <div
                  key={task.id}
                  className={`task-card ${getStatusClass(task.status)}`}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="task-card-header">
                    {getStatusIcon(task.status)}
                    <span className={`status-badge ${getStatusClass(task.status)}`}>
                      {task.status}
                    </span>
                  </div>

                  <h3 className="task-name">{task.name}</h3>

                  <div className="task-meta">
                    {task.assignee && task.assignee !== 'غير معين' && (
                      <div className="meta-item">
                        <User size={14} />
                        <span>{task.assignee}</span>
                      </div>
                    )}
                    {task.dueDate && (
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>{task.dueDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="task-card-footer">
                    <button className="task-action">
                      <MessageSquare size={14} />
                    </button>
                    <button className="task-action">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Task Card */}
              <div className="task-card add-task">
                <Plus size={24} />
                <span>إضافة مهمة</span>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="no-tasks">
            <p>لا توجد مهام</p>
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="task-modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="task-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTask.name}</h2>
              <button onClick={() => setSelectedTask(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <label>الحالة:</label>
                <span className={`status-badge ${getStatusClass(selectedTask.status)}`}>
                  {selectedTask.status}
                </span>
              </div>
              <div className="detail-row">
                <label>المسؤول:</label>
                <span>{selectedTask.assignee || 'غير معين'}</span>
              </div>
              {selectedTask.dueDate && (
                <div className="detail-row">
                  <label>التاريخ:</label>
                  <span>{selectedTask.dueDate}</span>
                </div>
              )}
              <div className="detail-row">
                <label>المجموعة:</label>
                <span>{selectedTask.groupName}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
