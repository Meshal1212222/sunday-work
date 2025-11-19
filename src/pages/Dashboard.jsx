import { Users, FolderKanban } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockWorkspaces } from '../data/mockData'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🏠 الصفحة الرئيسية</h1>
          <p>نظام إدارة المشاريع - Sunday Board Pro</p>
        </div>
      </div>

      {/* Workspaces Grid */}
      <div className="dashboard-content" style={{marginTop: '30px'}}>
        <h2 style={{fontSize: '20px', color: '#323338', marginBottom: '20px', fontWeight: '600'}}>مساحات العمل</h2>
        <div className="stats-grid">
          {mockWorkspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="stat-card workspace-quick-card"
              onClick={() => navigate(`/workspace/${workspace.id}`)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '--accent-color': workspace.color
              }}
            >
              <div className="stat-header">
                <div className="stat-icon" style={{ backgroundColor: `${workspace.color}20` }}>
                  <span style={{ fontSize: '20px' }}>{workspace.icon}</span>
                </div>
              </div>
              <div className="stat-body">
                <div className="stat-value" style={{fontSize: '14px', fontWeight: '700'}}>{workspace.name}</div>
                <div className="stat-label" style={{fontSize: '12px'}}>{workspace.boards} لوحة</div>
                <div className="stat-subtitle" style={{fontSize: '11px'}}>{workspace.members} عضو</div>
              </div>
              <div className="stat-progress">
                <div
                  className="stat-progress-bar"
                  style={{
                    width: '100%',
                    backgroundColor: workspace.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{marginTop: '40px', textAlign: 'center'}}>
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button
              onClick={() => navigate('/workspaces')}
              className="btn btn-primary"
            >
              <FolderKanban size={18} />
              <span>عرض جميع مساحات العمل</span>
            </button>
            <button
              onClick={() => navigate('/team')}
              className="btn btn-secondary"
            >
              <Users size={18} />
              <span>إدارة الفريق</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
