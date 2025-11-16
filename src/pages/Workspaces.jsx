import { Plus, FolderKanban, Users, MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { mockWorkspaces, mockBoards } from '../data/mockData'
import './Workspaces.css'

export default function Workspaces() {
  const navigate = useNavigate()
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Use real data from mockData
  const workspaces = mockWorkspaces.map(ws => ({
    ...ws,
    description: `مساحة عمل تحتوي على ${ws.boards} لوحة`
  }))

  const handleEnterWorkspace = (workspaceId) => {
    // Navigate to workspace boards view
    navigate(`/workspace/${workspaceId}`)
  }

  const handleCreateWorkspace = () => {
    alert('إنشاء مساحة عمل جديدة - قريباً!\n\nهذه الميزة ستتوفر قريباً. حالياً يمكنك استخدام مساحات العمل الموجودة من Monday.com')
  }

  return (
    <div className="workspaces-page">
      <div className="page-header">
        <div>
          <h1>مساحات العمل</h1>
          <p>إدارة جميع مساحات العمل والمشاريع</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateWorkspace}>
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

            <button
              className="workspace-enter-btn"
              onClick={() => handleEnterWorkspace(workspace.id)}
            >
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
            <button className="btn btn-outline" onClick={handleCreateWorkspace}>
              إنشاء الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
