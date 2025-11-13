import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
  MoreHorizontal,
  Loader2
} from 'lucide-react'
import { useMondayData } from '../hooks/useMondayData'
import './Sidebar.css'

export default function Sidebar({ isOpen, setIsOpen }) {
  const [boardsExpanded, setBoardsExpanded] = useState(true)
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false)
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(null)

  // Get live Monday.com data
  const { workspaces: allWorkspaces, boards: allBoards, loading, error } = useMondayData()

  // Set default workspace when data loads
  useEffect(() => {
    if (allWorkspaces.length > 0 && !currentWorkspaceId) {
      setCurrentWorkspaceId(allWorkspaces[0].id)
    }
  }, [allWorkspaces, currentWorkspaceId])

  // Get current workspace and boards
  const currentWorkspace = allWorkspaces.find(w => w.id === currentWorkspaceId) || allWorkspaces[0]
  const boards = currentWorkspaceId ? (allBoards[currentWorkspaceId] || []) : []

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

  // Show loading state
  if (loading) {
    return (
      <>
        {isOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setIsOpen(false)}
          />
        )}
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
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            gap: '12px',
            color: 'var(--gray-500)'
          }}>
            <Loader2 size={32} className="spin" />
            <div style={{ fontSize: '14px' }}>جاري تحميل البيانات...</div>
          </div>
        </aside>
      </>
    )
  }

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
