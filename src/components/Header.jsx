import { Menu, Bell, Search, MessageSquare, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { logoutUser } from '../firebase/auth'
import './Header.css'

export default function Header({ toggleSidebar }) {
  const { userData } = useAuth()

  const handleLogout = async () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      await logoutUser()
    }
  }

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return '؟'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Get role display name
  const getRoleDisplay = (role) => {
    const roles = {
      admin: 'مسؤول',
      manager: 'مدير',
      employee: 'موظف'
    }
    return roles[role] || 'موظف'
  }

  return (
    <header className="header">
      <div className="header-right">
        <button className="menu-button" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        <div className="search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="البحث في المهام..."
            className="search-input"
          />
        </div>
      </div>

      <div className="header-left">
        <button className="icon-button" title="الرسائل">
          <MessageSquare size={20} />
          <span className="notification-badge">3</span>
        </button>

        <button className="icon-button" title="الإشعارات">
          <Bell size={20} />
          <span className="notification-badge">5</span>
        </button>

        <div className="user-menu">
          <div className="user-avatar">
            {getUserInitials(userData?.displayName)}
          </div>
          <div className="user-info">
            <div className="user-name">{userData?.displayName || 'مستخدم'}</div>
            <div className="user-role">{getRoleDisplay(userData?.role)}</div>
          </div>
        </div>

        <button className="icon-button logout-button" onClick={handleLogout} title="تسجيل الخروج">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}
