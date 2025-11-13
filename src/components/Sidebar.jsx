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

  const navItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/dashboard' },
    { icon: Users, label: 'الفريق', path: '/team' },
    { icon: Settings, label: 'الإعدادات', path: '/settings' },
    { icon: HelpCircle, label: 'المساعدة', path: '/help' },
  ]

  // Monday-style Boards
  const boards = [
    { id: 1, name: 'مشروع التطبيق الجديد', icon: '📱', color: '#6161FF', tasks: 24 },
    { id: 2, name: 'التسويق الرقمي', icon: '📊', color: '#00CA72', tasks: 18 },
    { id: 3, name: 'تطوير Backend', icon: '⚙️', color: '#FDAB3D', tasks: 31 },
    { id: 4, name: 'إدارة المحتوى', icon: '✍️', color: '#E44258', tasks: 12 },
    { id: 5, name: 'خدمة العملاء', icon: '💬', color: '#0073EA', tasks: 8 },
    { id: 6, name: 'الموارد البشرية', icon: '👥', color: '#FF158A', tasks: 15 }
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

        {/* Workspace Info */}
        <div className="workspace-card">
          <div className="workspace-icon-large">🏢</div>
          <div className="workspace-info">
            <div className="workspace-name">مساحة العمل الرئيسية</div>
            <div className="workspace-role">مدير • 24 عضو</div>
          </div>
          <button className="workspace-menu-btn">
            <MoreHorizontal size={18} />
          </button>
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
