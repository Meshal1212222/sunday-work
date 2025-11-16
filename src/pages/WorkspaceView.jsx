import { useParams, useNavigate } from 'react-router-dom'
import { Plus, FolderKanban, Users, MoreVertical } from 'lucide-react'
import { mockWorkspaces, mockBoards } from '../data/mockData'
import './WorkspaceView.css'

export default function WorkspaceView() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Get workspace and boards data
  const workspace = mockWorkspaces.find(w => w.id === id)
  const boards = mockBoards[id] || []

  if (!workspace) {
    return (
      <div className="workspace-view-page">
        <div className="empty-state">
          <h2>مساحة العمل غير موجودة</h2>
          <p>لم نتمكن من العثور على مساحة العمل المطلوبة</p>
          <button className="btn btn-primary" onClick={() => navigate('/workspaces')}>
            العودة لمساحات العمل
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="workspace-view-page">
      {/* Workspace Header */}
      <div className="workspace-header">
        <div className="workspace-header-content">
          <div className="workspace-icon-large">{workspace.icon}</div>
          <div>
            <h1>{workspace.name}</h1>
            <p>{workspace.members} عضو • {boards.length} لوحة</p>
          </div>
        </div>
        <div className="workspace-header-actions">
          <button className="btn btn-secondary">
            <Users size={18} />
            <span>إدارة الأعضاء</span>
          </button>
          <button className="btn btn-primary">
            <Plus size={18} />
            <span>لوحة جديدة</span>
          </button>
        </div>
      </div>

      {/* Boards Grid */}
      <div className="boards-section">
        <div className="section-header">
          <h2>اللوحات ({boards.length})</h2>
        </div>

        {boards.length === 0 ? (
          <div className="empty-state">
            <FolderKanban size={48} />
            <h3>لا توجد لوحات في هذه المساحة</h3>
            <p>ابدأ بإنشاء لوحة جديدة لإدارة مهامك ومشاريعك</p>
            <button className="btn btn-primary">
              <Plus size={18} />
              <span>إنشاء لوحة جديدة</span>
            </button>
          </div>
        ) : (
          <div className="boards-grid">
            {boards.map((board) => (
              <div
                key={board.id}
                className="board-card"
                onClick={() => navigate(`/board/${board.id}`)}
                style={{ '--board-color': board.color }}
              >
                <div className="board-card-header">
                  <div
                    className="board-icon"
                    style={{ backgroundColor: `${board.color}20` }}
                  >
                    <span style={{ fontSize: '24px' }}>{board.icon}</span>
                  </div>
                  <button
                    className="icon-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert('خيارات اللوحة - قريباً!')
                    }}
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="board-card-content">
                  <h3>{board.name}</h3>
                </div>

                <div className="board-card-footer">
                  <div className="board-stat">
                    <FolderKanban size={14} />
                    <span>{board.tasks} مهمة</span>
                  </div>
                  <div
                    className="board-color-indicator"
                    style={{ backgroundColor: board.color }}
                  />
                </div>
              </div>
            ))}

            {/* Create New Board Card */}
            <div
              className="board-card create-board-card"
              onClick={() => alert('إنشاء لوحة جديدة - قريباً!')}
            >
              <div className="create-board-content">
                <div className="create-icon">
                  <Plus size={32} />
                </div>
                <h3>لوحة جديدة</h3>
                <p>أنشئ لوحة جديدة لمشروع أو فريق</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
