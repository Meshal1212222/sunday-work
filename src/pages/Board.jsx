import { Plus } from 'lucide-react'
import './Board.css'

export default function Board() {
  return (
    <div className="board-page">
      <div className="board-header">
        <div>
          <h1>لوحة المشروع</h1>
          <p>إدارة المهام والمشاريع</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} />
          <span>مهمة جديدة</span>
        </button>
      </div>

      <div className="board-placeholder">
        <div className="placeholder-icon">📋</div>
        <h3>قريباً...</h3>
        <p>سيتم إضافة نظام إدارة المهام مع Sub-tasks لا نهائية</p>
      </div>
    </div>
  )
}
