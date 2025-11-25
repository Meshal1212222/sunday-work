import { X, Plus, Trash2, User, Calendar, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import './TaskModal.css'

export default function TaskModal({ task, board, onClose, onUpdate }) {
  const [taskName, setTaskName] = useState(task.name)
  const [subtasks, setSubtasks] = useState(task.subtasks || [])
  const [showAddSubtask, setShowAddSubtask] = useState(false)
  const [newSubtaskData, setNewSubtaskData] = useState({
    name: '',
    person: '',
    status: 'جديد',
    date: ''
  })

  const handleAddSubtask = () => {
    if (!newSubtaskData.name.trim()) return
    const newSub = {
      id: Date.now().toString(),
      name: newSubtaskData.name,
      person: newSubtaskData.person,
      status: newSubtaskData.status,
      date: newSubtaskData.date,
      subtasks: []
    }
    setSubtasks([...subtasks, newSub])
    setNewSubtaskData({ name: '', person: '', status: 'جديد', date: '' })
    setShowAddSubtask(false)
  }

  const handleDeleteSubtask = (id) => {
    const deleteRecursive = (subs) => {
      return subs.filter(s => {
        if (s.id === id) return false
        if (s.subtasks) {
          s.subtasks = deleteRecursive(s.subtasks)
        }
        return true
      })
    }
    setSubtasks(deleteRecursive(subtasks))
  }

  const handleAddNestedSubtask = (parentId) => {
    const addNested = (subs) => {
      return subs.map(s => {
        if (s.id === parentId) {
          return {
            ...s,
            subtasks: [
              ...(s.subtasks || []),
              {
                id: Date.now().toString(),
                name: 'مهمة فرعية جديدة',
                person: '',
                status: 'جديد',
                date: '',
                subtasks: []
              }
            ]
          }
        }
        if (s.subtasks) {
          return { ...s, subtasks: addNested(s.subtasks) }
        }
        return s
      })
    }
    setSubtasks(addNested(subtasks))
  }

  const handleSave = () => {
    onUpdate({
      ...task,
      name: taskName,
      subtasks
    })
    onClose()
  }

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || ''
    if (s.includes('مكتمل') || s.includes('done')) return '#00CA72'
    if (s.includes('قيد') || s.includes('working')) return '#FDAB3D'
    if (s.includes('معلق') || s.includes('stuck')) return '#E44258'
    return '#0073EA'
  }

  const renderSubtasks = (subs, level = 0) => {
    return subs.map(sub => (
      <div key={sub.id} className="subtask-row" style={{ marginRight: level * 24 + 'px' }}>
        <div className="subtask-main">
          <div className="subtask-left">
            <div className="task-check"></div>
            <input
              type="text"
              value={sub.name}
              onChange={(e) => {
                const updateName = (subs) => {
                  return subs.map(s => {
                    if (s.id === sub.id) return { ...s, name: e.target.value }
                    if (s.subtasks) return { ...s, subtasks: updateName(s.subtasks) }
                    return s
                  })
                }
                setSubtasks(updateName(subtasks))
              }}
              className="subtask-name-input"
            />
          </div>

          <div className="subtask-right">
            {/* Person */}
            <div className="subtask-field person-field">
              {sub.person ? (
                <div className="person-pill-small">
                  <div className="person-avatar-small">{sub.person[0]}</div>
                  <span>{sub.person}</span>
                </div>
              ) : (
                <button className="field-btn" onClick={() => {
                  const person = prompt('أدخل اسم المسؤول:')
                  if (person) {
                    const updatePerson = (subs) => {
                      return subs.map(s => {
                        if (s.id === sub.id) return { ...s, person }
                        if (s.subtasks) return { ...s, subtasks: updatePerson(s.subtasks) }
                        return s
                      })
                    }
                    setSubtasks(updatePerson(subtasks))
                  }
                }}>
                  <User size={14} />
                </button>
              )}
            </div>

            {/* Status */}
            <div className="subtask-field status-field">
              <div
                className="status-pill-small"
                style={{ backgroundColor: getStatusColor(sub.status) }}
              >
                {sub.status || 'جديد'}
              </div>
            </div>

            {/* Date */}
            <div className="subtask-field date-field">
              {sub.date ? (
                <span className="date-text">{sub.date}</span>
              ) : (
                <button className="field-btn" onClick={() => {
                  const date = prompt('أدخل التاريخ:')
                  if (date) {
                    const updateDate = (subs) => {
                      return subs.map(s => {
                        if (s.id === sub.id) return { ...s, date }
                        if (s.subtasks) return { ...s, subtasks: updateDate(s.subtasks) }
                        return s
                      })
                    }
                    setSubtasks(updateDate(subtasks))
                  }
                }}>
                  <Calendar size={14} />
                </button>
              )}
            </div>

            <button
              className="add-nested-btn"
              onClick={() => handleAddNestedSubtask(sub.id)}
              title="إضافة مهمة فرعية"
            >
              <Plus size={14} />
            </button>

            <button
              className="delete-subtask-btn"
              onClick={() => handleDeleteSubtask(sub.id)}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        {sub.subtasks?.length > 0 && (
          <div className="nested-subtasks">
            {renderSubtasks(sub.subtasks, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-left">
            <div className="task-check-large"></div>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="task-name-input"
              placeholder="اسم المهمة..."
            />
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Task Info */}
          <div className="task-info-section">
            <div className="info-row">
              <div className="info-label">المجموعة</div>
              <div className="info-value">{task.group?.title || 'غير محدد'}</div>
            </div>
            {(() => {
              const personCol = task.column_values.find(col =>
                col.type === 'person' || col.type === 'people' || col.type === 'multiple-person'
              )
              if (personCol && personCol.text) {
                return (
                  <div className="info-row">
                    <div className="info-label">المنشئ/المسؤول</div>
                    <div className="info-value">
                      <div className="creator-info">
                        <div className="creator-avatar">{personCol.text[0]}</div>
                        <span>{personCol.text}</span>
                      </div>
                    </div>
                  </div>
                )
              }
            })()}
            {task.column_values
              .filter(col => col.text && col.type !== 'name' &&
                      col.type !== 'person' && col.type !== 'people' && col.type !== 'multiple-person')
              .slice(0, 3)
              .map(col => (
                <div key={col.id} className="info-row">
                  <div className="info-label">{col.id}</div>
                  <div className="info-value">{col.text}</div>
                </div>
              ))}
          </div>

          {/* Subtasks Section */}
          <div className="subtasks-section">
            <div className="section-header">
              <h3>المهام الفرعية ({subtasks.length})</h3>
              {!showAddSubtask && (
                <button
                  className="add-main-subtask-btn"
                  onClick={() => setShowAddSubtask(true)}
                >
                  <Plus size={16} />
                  <span>إضافة مهمة فرعية</span>
                </button>
              )}
            </div>

            {showAddSubtask && (
              <div className="new-subtask-form">
                <div className="form-row">
                  <div className="task-check"></div>
                  <input
                    type="text"
                    placeholder="اسم المهمة الفرعية..."
                    value={newSubtaskData.name}
                    onChange={(e) =>
                      setNewSubtaskData({ ...newSubtaskData, name: e.target.value })
                    }
                    className="form-input"
                    autoFocus
                  />
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <User size={14} />
                    <input
                      type="text"
                      placeholder="المسؤول"
                      value={newSubtaskData.person}
                      onChange={(e) =>
                        setNewSubtaskData({ ...newSubtaskData, person: e.target.value })
                      }
                      className="form-input-small"
                    />
                  </div>
                  <div className="form-field">
                    <select
                      value={newSubtaskData.status}
                      onChange={(e) =>
                        setNewSubtaskData({ ...newSubtaskData, status: e.target.value })
                      }
                      className="form-select"
                    >
                      <option value="جديد">جديد</option>
                      <option value="قيد العمل">قيد العمل</option>
                      <option value="مكتمل">مكتمل</option>
                      <option value="معلق">معلق</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <Calendar size={14} />
                    <input
                      type="date"
                      value={newSubtaskData.date}
                      onChange={(e) =>
                        setNewSubtaskData({ ...newSubtaskData, date: e.target.value })
                      }
                      className="form-input-small"
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn-cancel" onClick={() => setShowAddSubtask(false)}>
                    إلغاء
                  </button>
                  <button className="btn-add" onClick={handleAddSubtask}>
                    إضافة
                  </button>
                </div>
              </div>
            )}

            <div className="subtasks-list">
              {subtasks.length === 0 ? (
                <div className="empty-state">
                  <p>لا توجد مهام فرعية</p>
                  <p className="empty-hint">انقر على "إضافة مهمة فرعية" للبدء</p>
                </div>
              ) : (
                renderSubtasks(subtasks)
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>إغلاق</button>
          <button className="btn-primary" onClick={handleSave}>حفظ التغييرات</button>
        </div>
      </div>
    </div>
  )
}
