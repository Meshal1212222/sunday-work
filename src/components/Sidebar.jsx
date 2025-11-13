import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  HelpCircle,
  X
} from 'lucide-react'
import './Sidebar.css'

export default function Sidebar({ isOpen, setIsOpen }) {
  const navItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/dashboard' },
    { icon: FolderKanban, label: 'مساحات العمل', path: '/workspaces' },
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

        <div className="sidebar-footer">
          <div className="workspace-selector">
            <div className="workspace-icon">🏢</div>
            <div className="workspace-info">
              <div className="workspace-name">مساحة العمل الرئيسية</div>
              <div className="workspace-role">مدير</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
