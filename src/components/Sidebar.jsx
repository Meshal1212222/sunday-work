import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  HelpCircle,
  X,
  Plus,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react'
import './Sidebar.css'

export default function Sidebar({ isOpen, setIsOpen }) {
  const [boardsExpanded, setBoardsExpanded] = useState(true)
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false)
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState('1')

  // Workspaces data
  const allWorkspaces = [
    { id: '1', name: 'مساحة العمل الرئيسية', icon: '🏢', members: 24 },
    { id: '2', name: 'التسويق الرقمي', icon: '📊', members: 12 },
    { id: '3', name: 'تطوير المنتج', icon: '💻', members: 18 }
  ]

  // Boards by workspace
  const allBoards = {
    '1': [
      { id: 'b1', name: 'مشروع التطبيق الجديد', icon: '📱', color: '#6161FF', tasks: 24 },
      { id: 'b2', name: 'التسويق الرقمي', icon: '📊', color: '#00CA72', tasks: 18 },
      { id: 'b3', name: 'تطوير Backend', icon: '⚙️', color: '#FDAB3D', tasks: 31 },
      { id: 'b4', name: 'إدارة المحتوى', icon: '✍️', color: '#E44258', tasks: 12 },
      { id: 'b5', name: 'خدمة العملاء', icon: '💬', color: '#0073EA', tasks: 8 },
      { id: 'b6', name: 'الموارد البشرية', icon: '👥', color: '#FF158A', tasks: 15 }
    ],
    '2': [
      { id: 'b7', name: 'حملة وسائل التواصل', icon: '📱', color: '#00CA72', tasks: 14 },
      { id: 'b8', name: 'إنشاء المحتوى', icon: '✨', color: '#6161FF', tasks: 22 },
      { id: 'b9', name: 'تحليل البيانات', icon: '📈', color: '#0073EA', tasks: 9 }
    ],
    '3': [
      { id: 'b10', name: 'تصميم UI/UX', icon: '🎨', color: '#FF158A', tasks: 16 },
      { id: 'b11', name: 'Frontend Development', icon: '💻', color: '#6161FF', tasks: 28 },
      { id: 'b12', name: 'Backend Development', icon: '⚙️', color: '#FDAB3D', tasks: 19 },
      { id: 'b13', name: 'Testing & QA', icon: '🔍', color: '#00CA72', tasks: 11 }
    ]
  }

  const currentWorkspace = allWorkspaces.find(w => w.id === currentWorkspaceId) || allWorkspaces[0]
  const boards = allBoards[currentWorkspaceId] || []

  const switchWorkspace = (id) => {
    setCurrentWorkspaceId(id)
    setWorkspaceMenuOpen(false)
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/dashboard' },
    { icon: Users, label: 'الفريق', path: '/team' },
    { icon: Settings, label: 'الإعدادات', path: '/settings' },
    { icon: HelpCircle, label: 'المساعدة', path: '/help' },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">📅</span>
            <span className="logo-text">Sunday</span>
          </div>
          <button
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Workspace Selector */}
        <div className="workspace-card-container">
          <button
            className="workspace-card"
            onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
          >
            <div className="workspace-icon-large">{currentWorkspace.icon}</div>
            <div className="workspace-info">
              <div className="workspace-name">{currentWorkspace.name}</div>
              <div className="workspace-role">مدير • {currentWorkspace.members} عضو</div>
            </div>
            <div className="workspace-menu-btn">
              <ChevronDown
                size={18}
                style={{
                  transform: workspaceMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s'
                }}
              />
            </div>
          </button>

          {/* Workspace Dropdown */}
          {workspaceMenuOpen && (
            <div className="workspace-dropdown">
              {allWorkspaces.map(workspace => (
                <button
                  key={workspace.id}
                  className={`workspace-dropdown-item ${workspace.id === currentWorkspace.id ? 'active' : ''}`}
                  onClick={() => {
                    switchWorkspace(workspace.id)
                    setWorkspaceMenuOpen(false)
                  }}
                >
                  <span className="workspace-dropdown-icon">{workspace.icon}</span>
                  <div className="workspace-dropdown-info">
                    <div className="workspace-dropdown-name">{workspace.name}</div>
                    <div className="workspace-dropdown-members">{workspace.members} أعضاء</div>
                  </div>
                  {workspace.id === currentWorkspace.id && (
                    <div className="workspace-dropdown-check">✓</div>
                  )}
                </button>
              ))}
              <div className="workspace-dropdown-divider" />
              <button className="workspace-dropdown-item workspace-dropdown-create">
                <Plus size={18} />
                <span>إنشاء مساحة عمل جديدة</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Boards Section */}
        <div className="boards-section">
          <div className="boards-header">
            <button
              className="boards-toggle"
              onClick={() => setBoardsExpanded(!boardsExpanded)}
            >
              {boardsExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              <FolderKanban size={18} />
              <span>اللوحات</span>
              <span className="boards-count">{boards.length}</span>
            </button>
            <button className="add-board-btn" title="إضافة لوحة جديدة">
              <Plus size={18} />
            </button>
          </div>

          {boardsExpanded && (
            <div className="boards-list">
              {boards.map((board) => (
                <NavLink
                  key={board.id}
                  to={`/board/${board.id}`}
                  className={({ isActive }) =>
                    `board-item ${isActive ? 'active' : ''}`
                  }
                  onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                >
                  <div className="board-indicator" style={{ backgroundColor: board.color }} />
                  <span className="board-icon">{board.icon}</span>
                  <div className="board-info">
                    <span className="board-name">{board.name}</span>
                    <span className="board-tasks">{board.tasks} مهام</span>
                  </div>
                  <button className="board-menu-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Add New Board Button */}
        <button className="add-board-large">
          <Plus size={20} />
          <span>إضافة لوحة جديدة</span>
        </button>
      </aside>
    </>
  )
}
