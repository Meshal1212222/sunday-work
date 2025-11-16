import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'
import { Loader2, ExternalLink, Plus, Settings, ChevronDown, X, Trash2 } from 'lucide-react'
import TaskModal from '../components/TaskModal'
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
  const [showAllColumns, setShowAllColumns] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState(['person', 'status', 'date'])
  const [hoveredCell, setHoveredCell] = useState(null)
  const [showAddColumn, setShowAddColumn] = useState(false)
  const [activeCellMenu, setActiveCellMenu] = useState(null)
  const [expandedTasks, setExpandedTasks] = useState({})
  const [taskSubtasks, setTaskSubtasks] = useState({})

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

  const addSubtask = (taskId) => {
    const newSubtask = {
      id: Date.now().toString(),
      name: '',
      person: '',
      status: 'جديد',
      date: '',
      isNew: true
    }
    setTaskSubtasks(prev => ({
      ...prev,
      [taskId]: [...(prev[taskId] || []), newSubtask]
    }))
    setExpandedTasks(prev => ({ ...prev, [taskId]: true }))
  }

  const updateSubtask = (taskId, subtaskId, field, value) => {
    setTaskSubtasks(prev => ({
      ...prev,
      [taskId]: prev[taskId].map(sub =>
        sub.id === subtaskId ? { ...sub, [field]: value, isNew: false } : sub
      )
    }))
  }

  const deleteSubtask = (taskId, subtaskId) => {
    setTaskSubtasks(prev => ({
      ...prev,
      [taskId]: prev[taskId].filter(sub => sub.id !== subtaskId)
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

  // Get all unique column types
  const allColumnTypes = new Set()
  board.items_page.items.forEach(item => {
    item.column_values.forEach(col => {
      if (col.type) allColumnTypes.add(col.type)
    })
  })

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

  const gridColumns = showAllColumns
    ? `2fr repeat(${allColumnTypes.size}, 1fr) 150px`
    : `2fr repeat(${visibleColumns.length}, 1fr) 150px`

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
            onClick={() => setShowAllColumns(!showAllColumns)}
          >
            <Settings size={16} />
            <span>{showAllColumns ? 'إخفاء الأعمدة' : 'عرض كل الأعمدة'}</span>
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
          {/* Table Header */}
          <div className="table-header-row">
            <div className="header-cell col-task">المهمة</div>
            {showAllColumns ? (
              Array.from(allColumnTypes).map(type => (
                <div key={type} className="header-cell">{type}</div>
              ))
            ) : (
              <>
                <div className="header-cell">المسؤول</div>
                <div className="header-cell">الحالة</div>
                <div className="header-cell">التاريخ</div>
              </>
            )}
            <div className="header-cell add-column-cell">
              <button
                className="add-column-btn"
                onClick={() => setShowAddColumn(!showAddColumn)}
              >
                <Plus size={16} />
                <span>إضافة عمود</span>
              </button>
            </div>
          </div>

          {/* Groups */}
          {board.groups.map(group => {
            const items = itemsByGroup[group.id] || []

            return (
              <div key={group.id} className="table-group">
                {/* Group Header */}
                <div
                  className="group-row"
                  style={{ borderLeftColor: group.color }}
                >
                  <div className="group-name">{group.title}</div>
                  <div className="group-count">{items.length} مهام</div>
                </div>

                {/* Group Items */}
                {items.map(item => {
                  const person = getColumnValue(item, 'person') || getColumnValue(item, 'people')
                  const status = getColumnValue(item, 'status') || getColumnValue(item, 'color')
                  const date = getColumnValue(item, 'date')
                  const subtasks = taskSubtasks[item.id] || []
                  const isExpanded = expandedTasks[item.id]

                  return (
                    <React.Fragment key={item.id}>
                      <div className="item-row">
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
                          <span className="task-text" onClick={() => handleTaskClick(item)}>{item.name}</span>
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

                      {showAllColumns ? (
                        Array.from(allColumnTypes).map(type => {
                          const value = getColumnValue(item, type)
                          const cellKey = `${item.id}-${type}`
                          return (
                            <div
                              key={type}
                              className={`item-cell interactive-cell ${hoveredCell === cellKey ? 'cell-hovered' : ''}`}
                              onMouseEnter={() => setHoveredCell(cellKey)}
                              onMouseLeave={() => setHoveredCell(null)}
                              onClick={(e) => handleCellClick(e, item.id, type)}
                            >
                              {type === 'status' || type === 'color' ? (
                                value ? (
                                  <div
                                    className="status-pill"
                                    style={{ backgroundColor: getStatusColor(value) }}
                                  >
                                    {value}
                                  </div>
                                ) : (
                                  <span className="empty">-</span>
                                )
                              ) : type === 'person' || type === 'people' || type === 'multiple-person' ? (
                                value ? (
                                  <div className="person-pill">
                                    <div className="person-avatar">{value[0]}</div>
                                    <span>{value}</span>
                                  </div>
                                ) : (
                                  <span className="empty">-</span>
                                )
                              ) : (
                                <span>{value || '-'}</span>
                              )}
                              {hoveredCell === cellKey && (
                                <button className="cell-action-btn">
                                  <ChevronDown size={14} />
                                </button>
                              )}
                            </div>
                          )
                        })
                      ) : (
                        <>
                          <div
                            className={`item-cell col-person interactive-cell ${hoveredCell === `${item.id}-person` ? 'cell-hovered' : ''}`}
                            onMouseEnter={() => setHoveredCell(`${item.id}-person`)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={(e) => handleCellClick(e, item.id, 'person')}
                          >
                            {person ? (
                              <div className="person-pill">
                                <div className="person-avatar">{person[0]}</div>
                                <span>{person}</span>
                              </div>
                            ) : (
                              <span className="empty">-</span>
                            )}
                            {hoveredCell === `${item.id}-person` && (
                              <button className="cell-action-btn">
                                <ChevronDown size={14} />
                              </button>
                            )}
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
                          >
                            {date ? <span>{date}</span> : <span className="empty">-</span>}
                            {hoveredCell === `${item.id}-date` && (
                              <button className="cell-action-btn">
                                <ChevronDown size={14} />
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Subtasks Rows */}
                    {isExpanded && subtasks.length > 0 && subtasks.map((subtask, subIndex) => (
                      <div key={subtask.id} className="subtask-row-inline">
                        <div className="item-cell col-task">
                          <div className="subtask-indent"></div>
                          <div className="task-check-small"></div>
                          <input
                            type="text"
                            className="subtask-name-inline-input"
                            value={subtask.name}
                            onChange={(e) => updateSubtask(item.id, subtask.id, 'name', e.target.value)}
                            placeholder="اسم المهمة الفرعية..."
                            autoFocus={subtask.isNew}
                          />
                          <button
                            className="delete-subtask-inline-btn"
                            onClick={() => deleteSubtask(item.id, subtask.id)}
                            title="حذف"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {showAllColumns ? (
                          Array.from(allColumnTypes).map(type => (
                            <div key={type} className="item-cell">
                              {type === 'status' || type === 'color' ? (
                                <select
                                  className="subtask-select-inline"
                                  value={subtask.status || 'جديد'}
                                  onChange={(e) => updateSubtask(item.id, subtask.id, 'status', e.target.value)}
                                >
                                  <option value="جديد">جديد</option>
                                  <option value="قيد العمل">قيد العمل</option>
                                  <option value="مكتمل">مكتمل</option>
                                  <option value="معلق">معلق</option>
                                </select>
                              ) : type === 'person' || type === 'people' || type === 'multiple-person' ? (
                                <input
                                  type="text"
                                  className="subtask-input-inline"
                                  value={subtask.person || ''}
                                  onChange={(e) => updateSubtask(item.id, subtask.id, 'person', e.target.value)}
                                  placeholder="المسؤول"
                                />
                              ) : type === 'date' ? (
                                <input
                                  type="date"
                                  className="subtask-input-inline"
                                  value={subtask.date || ''}
                                  onChange={(e) => updateSubtask(item.id, subtask.id, 'date', e.target.value)}
                                />
                              ) : (
                                <span className="empty">-</span>
                              )}
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="item-cell col-person">
                              <input
                                type="text"
                                className="subtask-input-inline"
                                value={subtask.person || ''}
                                onChange={(e) => updateSubtask(item.id, subtask.id, 'person', e.target.value)}
                                placeholder="المسؤول"
                              />
                            </div>
                            <div className="item-cell col-status">
                              <select
                                className="subtask-select-inline"
                                value={subtask.status || 'جديد'}
                                onChange={(e) => updateSubtask(item.id, subtask.id, 'status', e.target.value)}
                                style={{ backgroundColor: getStatusColor(subtask.status || 'جديد') }}
                              >
                                <option value="جديد">جديد</option>
                                <option value="قيد العمل">قيد العمل</option>
                                <option value="مكتمل">مكتمل</option>
                                <option value="معلق">معلق</option>
                              </select>
                            </div>
                            <div className="item-cell col-date">
                              <input
                                type="date"
                                className="subtask-input-inline"
                                value={subtask.date || ''}
                                onChange={(e) => updateSubtask(item.id, subtask.id, 'date', e.target.value)}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                  )
                })}

                {/* Add Item Row */}
                <div className="add-item-row">
                  <button
                    className="add-item-btn"
                    onClick={() => {
                      const name = prompt('أدخل اسم المهمة الجديدة:')
                      if (name) {
                        console.log('Adding task:', name, 'to group:', group.id)
                        // In real implementation, this would call Monday API to create item
                        alert('إضافة المهام الجديدة قادمة قريباً!')
                      }
                    }}
                  >
                    <Plus size={18} />
                    <span>إضافة مهمة</span>
                  </button>
                </div>
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
