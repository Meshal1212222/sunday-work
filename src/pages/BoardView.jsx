import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Plus,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Trash2,
  X
} from 'lucide-react'
import sundayDataStore from '../services/sundayDataStore'
import './BoardView.css'

export default function BoardView() {
  const { boardId } = useParams()
  const [board, setBoard] = useState(null)
  const [groups, setGroups] = useState([])
  const [items, setItems] = useState({})
  const [collapsedGroups, setCollapsedGroups] = useState({})
  const [selectedItem, setSelectedItem] = useState(null)
  const [editingCell, setEditingCell] = useState(null)
  const [newItemGroupId, setNewItemGroupId] = useState(null)
  const [dateTimePickerOpen, setDateTimePickerOpen] = useState(null)

  useEffect(() => {
    loadBoard()
  }, [boardId])

  const loadBoard = () => {
    const boards = sundayDataStore.getBoards()
    const currentBoard = boards.find(b => b.id === boardId)

    if (currentBoard) {
      setBoard(currentBoard)
      setGroups(currentBoard.groups || [])

      // تحميل المهام لكل مجموعة
      const itemsByGroup = {}
      currentBoard.groups?.forEach(group => {
        itemsByGroup[group.id] = sundayDataStore.getItems(boardId, group.id)
      })
      setItems(itemsByGroup)
    }
  }

  const toggleGroup = (groupId) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const handleAddItem = (groupId, itemName) => {
    if (!itemName.trim()) return

    sundayDataStore.addItem(boardId, {
      name: itemName,
      groupId: groupId,
      assignee: null,
      status: 'جديدة',
      dueDate: null
    })

    setNewItemGroupId(null)
    loadBoard()
  }

  const handleUpdateItem = (itemId, field, value) => {
    sundayDataStore.updateItem(itemId, { [field]: value })
    loadBoard()
    setEditingCell(null)
  }

  const handleDeleteItem = (itemId) => {
    if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
      sundayDataStore.deleteItem(itemId)
      loadBoard()
    }
  }

  const handleCellClick = (itemId, field) => {
    setEditingCell({ itemId, field })
  }

  const handleUpdateDateTime = (itemId, type, value) => {
    const item = Object.values(items).flat().find(i => i.id === itemId)
    if (!item) return

    let newDateTime = item.dueDate || ''

    if (type === 'date') {
      // تحديث التاريخ فقط
      if (!value) {
        newDateTime = ''
      } else {
        // احتفظ بالوقت إذا كان موجود
        const existingTime = newDateTime.includes('T') ? newDateTime.split('T')[1] : null
        newDateTime = existingTime ? `${value}T${existingTime}` : value
      }
    } else if (type === 'time') {
      // تحديث الوقت فقط
      const date = newDateTime.includes('T') ? newDateTime.split('T')[0] : newDateTime || new Date().toISOString().split('T')[0]

      if (!value) {
        // إذا مسح الوقت، احتفظ بالتاريخ فقط
        newDateTime = date
      } else {
        // أضف الوقت
        newDateTime = `${date}T${value}`
      }
    }

    sundayDataStore.updateItem(itemId, { dueDate: newDateTime })
    loadBoard()
  }

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return null

    try {
      const dt = new Date(dateTimeStr)
      const date = dt.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })
      const time = dt.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })

      return { date, time, hasTime: dateTimeStr.includes('T') }
    } catch {
      return null
    }
  }

  if (!board) {
    return (
      <div className="board-loading">
        <div className="spinner"></div>
        <p>جاري تحميل البورد...</p>
      </div>
    )
  }

  return (
    <div className="board-view">
      {/* Board Header */}
      <div className="board-header">
        <div className="board-title">
          <h1>{board.name}</h1>
          <button className="board-options-btn">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="board-actions">
          <button className="board-action-btn">
            <Search size={18} />
            <span>بحث</span>
          </button>
          <button className="board-action-btn">
            <Filter size={18} />
            <span>فلتر</span>
          </button>
          <button className="board-action-btn primary">
            <Plus size={18} />
            <span>مهمة جديدة</span>
          </button>
        </div>
      </div>

      {/* Board Table */}
      <div className="board-table-container">
        <table className="board-table">
          <thead>
            <tr>
              <th className="col-group"></th>
              <th className="col-name">المهمة</th>
              <th className="col-person">الشخص</th>
              <th className="col-status">الحالة</th>
              <th className="col-date">التاريخ</th>
              <th className="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            {groups.map(group => (
              <>
                {/* Group Header */}
                <tr key={`group-${group.id}`} className="group-row">
                  <td colSpan="6">
                    <div className="group-header">
                      <button
                        className="group-toggle"
                        onClick={() => toggleGroup(group.id)}
                      >
                        {collapsedGroups[group.id] ? (
                          <ChevronRight size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                      <span className="group-title">{group.title}</span>
                      <span className="group-count">
                        {items[group.id]?.length || 0} مهام
                      </span>
                      <button
                        className="group-add-btn"
                        onClick={() => setNewItemGroupId(group.id)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Group Items */}
                {!collapsedGroups[group.id] && items[group.id]?.map(item => (
                  <tr key={item.id} className="item-row">
                    <td className="col-group"></td>

                    {/* Item Name */}
                    <td className="col-name">
                      {editingCell?.itemId === item.id && editingCell?.field === 'name' ? (
                        <input
                          type="text"
                          defaultValue={item.name}
                          autoFocus
                          onBlur={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateItem(item.id, 'name', e.target.value)
                            }
                          }}
                        />
                      ) : (
                        <div
                          className="cell-content"
                          onClick={() => handleCellClick(item.id, 'name')}
                        >
                          {item.name}
                        </div>
                      )}
                    </td>

                    {/* Person */}
                    <td className="col-person">
                      {editingCell?.itemId === item.id && editingCell?.field === 'assignee' ? (
                        <input
                          type="text"
                          defaultValue={item.assignee || ''}
                          placeholder="اسم الشخص"
                          autoFocus
                          onBlur={(e) => handleUpdateItem(item.id, 'assignee', e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleUpdateItem(item.id, 'assignee', e.target.value)
                            }
                          }}
                        />
                      ) : (
                        <div
                          className="cell-content person-cell"
                          onClick={() => handleCellClick(item.id, 'assignee')}
                        >
                          {item.assignee ? (
                            <>
                              <User size={14} />
                              <span>{item.assignee}</span>
                            </>
                          ) : (
                            <span className="empty-cell">-</span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="col-status">
                      {editingCell?.itemId === item.id && editingCell?.field === 'status' ? (
                        <select
                          defaultValue={item.status || 'جديدة'}
                          autoFocus
                          onChange={(e) => handleUpdateItem(item.id, 'status', e.target.value)}
                          onBlur={() => setEditingCell(null)}
                        >
                          <option value="جديدة">جديدة</option>
                          <option value="قيد العمل">قيد العمل</option>
                          <option value="معلقة">معلقة</option>
                          <option value="مكتملة">مكتملة</option>
                          <option value="ملغية">ملغية</option>
                        </select>
                      ) : (
                        <div
                          className={`cell-content status-cell status-${item.status}`}
                          onClick={() => handleCellClick(item.id, 'status')}
                        >
                          <span className="status-label">{item.status || 'جديدة'}</span>
                        </div>
                      )}
                    </td>

                    {/* Date */}
                    <td className="col-date">
                      <div className="date-cell-wrapper">
                        {dateTimePickerOpen?.itemId === item.id && (
                          <div className="datetime-picker-popup">
                            <div className="datetime-picker-header">
                              <span>تحديد التاريخ والوقت</span>
                              <button
                                className="datetime-close-btn"
                                onClick={() => setDateTimePickerOpen(null)}
                              >
                                <X size={16} />
                              </button>
                            </div>

                            <div className="datetime-picker-content">
                              {/* Date Picker */}
                              <div className="datetime-section">
                                <label>
                                  <Calendar size={14} />
                                  <span>التاريخ</span>
                                </label>
                                <input
                                  type="date"
                                  value={item.dueDate?.split('T')[0] || ''}
                                  onChange={(e) => handleUpdateDateTime(item.id, 'date', e.target.value)}
                                />
                              </div>

                              {/* Time Picker (Optional) */}
                              <div className="datetime-section">
                                <label>
                                  <Clock size={14} />
                                  <span>الوقت (اختياري)</span>
                                </label>
                                <input
                                  type="time"
                                  value={item.dueDate?.includes('T') ? item.dueDate.split('T')[1]?.slice(0, 5) : ''}
                                  onChange={(e) => handleUpdateDateTime(item.id, 'time', e.target.value)}
                                />
                              </div>
                            </div>

                            {item.dueDate && (
                              <button
                                className="datetime-clear-btn"
                                onClick={() => {
                                  handleUpdateItem(item.id, 'dueDate', '')
                                  setDateTimePickerOpen(null)
                                }}
                              >
                                مسح التاريخ
                              </button>
                            )}
                          </div>
                        )}

                        <div
                          className="cell-content date-cell"
                          onClick={() => setDateTimePickerOpen({ itemId: item.id })}
                        >
                          {item.dueDate ? (
                            <>
                              {(() => {
                                const formatted = formatDateTime(item.dueDate)
                                if (!formatted) return <span className="empty-cell">-</span>

                                return (
                                  <div className="datetime-compact">
                                    <Calendar size={14} />
                                    <span>{formatted.date}</span>
                                    {formatted.hasTime && (
                                      <>
                                        <Clock size={12} />
                                        <span className="time-text">{formatted.time}</span>
                                      </>
                                    )}
                                  </div>
                                )
                              })()}
                            </>
                          ) : (
                            <span className="empty-cell">-</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="col-actions">
                      <button
                        className="item-delete-btn"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* New Item Row */}
                {newItemGroupId === group.id && (
                  <tr className="new-item-row">
                    <td className="col-group"></td>
                    <td className="col-name">
                      <input
                        type="text"
                        placeholder="اسم المهمة الجديدة..."
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddItem(group.id, e.target.value)
                          } else if (e.key === 'Escape') {
                            setNewItemGroupId(null)
                          }
                        }}
                        onBlur={(e) => {
                          if (e.target.value.trim()) {
                            handleAddItem(group.id, e.target.value)
                          } else {
                            setNewItemGroupId(null)
                          }
                        }}
                      />
                    </td>
                    <td colSpan="4"></td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
