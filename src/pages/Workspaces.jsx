import { Plus, FolderKanban, Users, MoreVertical } from 'lucide-react'
import './Workspaces.css'

export default function Workspaces() {
  const workspaces = [
    {
      id: 1,
      name: 'مساحة العمل الرئيسية',
      description: 'جميع المشاريع والمهام الرئيسية',
      boards: 8,
      members: 12,
      color: '#5B4E9D'
    },
    {
      id: 2,
      name: 'التسويق الرقمي',
      description: 'حملات التسويق والمحتوى',
      boards: 5,
      members: 6,
      color: '#007AFF'
    },
    {
      id: 3,
      name: 'تطوير المنتج',
      description: 'تطوير الميزات الجديدة',
      boards: 12,
      members: 15,
      color: '#34C759'
    },
    {
      id: 4,
      name: 'خدمة العملاء',
      description: 'دعم وخدمة العملاء',
      boards: 3,
      members: 8,
      color: '#FF9500'
    }
  ]

  return (
    <div className="workspaces-page">
      <div className="page-header">
        <div>
          <h1>مساحات العمل</h1>
          <p>إدارة جميع مساحات العمل والمشاريع</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} />
          <span>مساحة عمل جديدة</span>
        </button>
      </div>

      <div className="workspaces-grid">
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="workspace-card">
            <div className="workspace-header">
              <div
                className="workspace-icon"
                style={{ backgroundColor: `${workspace.color}20` }}
              >
                <FolderKanban
                  size={24}
                  style={{ color: workspace.color }}
                />
              </div>
              <button className="icon-button">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="workspace-content">
              <h3>{workspace.name}</h3>
              <p>{workspace.description}</p>
            </div>

            <div className="workspace-footer">
              <div className="workspace-stat">
                <FolderKanban size={16} />
                <span>{workspace.boards} لوحات</span>
              </div>
              <div className="workspace-stat">
                <Users size={16} />
                <span>{workspace.members} أعضاء</span>
              </div>
            </div>

            <button className="workspace-enter-btn">
              دخول مساحة العمل
            </button>
          </div>
        ))}

        {/* Create New Workspace Card */}
        <div className="workspace-card create-card">
          <div className="create-card-content">
            <div className="create-icon">
              <Plus size={32} />
            </div>
            <h3>إنشاء مساحة عمل جديدة</h3>
            <p>ابدأ بإنشاء مساحة عمل لمشروع أو فريق جديد</p>
            <button className="btn btn-outline">إنشاء الآن</button>
          </div>
        </div>
      </div>
    </div>
  )
}
