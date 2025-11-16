import { X, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import './TaskModal.css'

export default function TaskModal({ task, board, onClose, onUpdate }) {
  const [taskName, setTaskName] = useState(task.name)
  const [subtasks, setSubtasks] = useState(task.subtasks || [])
  const [newSubtask, setNewSubtask] = useState('')

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return
    const newSub = {
      id: Date.now().toString(),
      name: newSubtask,
      subtasks: []
    }
    setSubtasks([...subtasks, newSub])
    setNewSubtask('')
  }

  const handleDeleteSubtask = (id) => {
    setSubtasks(subtasks.filter(s => s.id !== id))
  }

  const handleSave = () => {
    onUpdate({
      ...task,
      name: taskName,
      subtasks
    })
    onClose()
  }

  const renderSubtasks = (subs, level = 0) => {
    return subs.map(sub => (
      <div key={sub.id} className="subtask-item" style={{ paddingRight: level * 20 + 'px' }}>
        <div className="subtask-content">
          <div className="task-check"></div>
          <span>{sub.name}</span>
        </div>
        <button
          className="delete-subtask-btn"
          onClick={() => handleDeleteSubtask(sub.id)}
        >
          <Trash2 size={14} />
        </button>
        {sub.subtasks?.length > 0 && renderSubtasks(sub.subtasks, level + 1)}
      </div>
    ))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>تفاصيل المهمة</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Task Name */}
          <div className="form-group">
            <label>اسم المهمة</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="task-input"
            />
          </div>

          {/* All Columns */}
          <div className="form-group">
            <label>جميع الحقول</label>
            <div className="columns-grid">
              {task.column_values.map(col => (
                <div key={col.id} className="column-item">
                  <div className="column-label">{col.id}</div>
                  <div className="column-value">{col.text || '-'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subtasks */}
          <div className="form-group">
            <label>المهام الفرعية</label>
            <div className="subtasks-list">
              {renderSubtasks(subtasks)}
            </div>
            <div className="add-subtask">
              <input
                type="text"
                placeholder="إضافة مهمة فرعية..."
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                className="subtask-input"
              />
              <button onClick={handleAddSubtask} className="add-subtask-btn">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>إلغاء</button>
          <button className="btn-primary" onClick={handleSave}>حفظ</button>
        </div>
      </div>
    </div>
  )
}
