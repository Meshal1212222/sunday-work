import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
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
  Zap,
  MessageCircle
} from 'lucide-react'
import { mockWorkspaces, mockBoards } from '../data/mockData'
import './Sidebar.css'

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate()
  const [boardsExpanded, setBoardsExpanded] = useState(true)
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false)
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState('4163103')
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef(null)
  const resizerRef = useRef(null)

  // Handle sidebar resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return

      const newWidth = window.innerWidth - e.clientX
      if (newWidth >= 250 && newWidth <= 500) {
        setSidebarWidth(newWidth)
        if (sidebarRef.current) {
          sidebarRef.current.style.width = `${newWidth}px`
        }
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  const handleResizerMouseDown = (e) => {
    e.preventDefault()
    setIsResizing(true)
  }

  // Use mock data
  const allWorkspaces = mockWorkspaces
  const allBoards = mockBoards

  // Get current workspace and boards
  const currentWorkspace = allWorkspaces.find(w => w.id === currentWorkspaceId) || allWorkspaces[0]
  const boards = allBoards[currentWorkspaceId] || []

  const switchWorkspace = (id) => {
    setCurrentWorkspaceId(id)
    setWorkspaceMenuOpen(false)
    navigate('/workspaces')
  }

  const handleCreateWorkspace = () => {
    setWorkspaceMenuOpen(false)
    setShowCreateWorkspace(true)
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/dashboard' },
    { icon: Zap, label: 'الأتمتة', path: '/automations' },
    { icon: Users, label: 'الفريق', path: '/team' },
    { icon: Settings, label: 'الإعدادات', path: '/settings' },
    { icon: MessageCircle, label: 'اختبار واتساب', path: '/whatsapp-test' },
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
      <aside
        ref={sidebarRef}
        className={`sidebar ${isOpen ? 'open' : 'closed'}`}
        style={{ width: `${sidebarWidth}px` }}
      >
        {/* Resize Handle */}
        <div
          ref={resizerRef}
          className={`sidebar-resizer ${isResizing ? 'resizing' : ''}`}
          onMouseDown={handleResizerMouseDown}
        />

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
              <button
                className="workspace-dropdown-item workspace-dropdown-create"
                onClick={handleCreateWorkspace}
              >
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

      {/* Create Workspace Modal */}
      {showCreateWorkspace && (
        <div className="modal-overlay" onClick={() => setShowCreateWorkspace(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>إنشاء مساحة عمل جديدة</h2>
              <button onClick={() => setShowCreateWorkspace(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>سيتم إضافة وظيفة إنشاء مساحة عمل جديدة قريباً.</p>
              <p>حالياً يمكنك التنقل بين مساحات العمل الموجودة.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowCreateWorkspace(false)}>
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
