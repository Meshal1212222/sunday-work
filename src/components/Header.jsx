import { Menu, Bell, Search, MessageSquare, LogOut } from 'lucide-react'
import './Header.css'

export default function Header({ toggleSidebar, setAuth }) {
  const handleLogout = () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      setAuth(false)
    }
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
          <div className="user-avatar">م</div>
          <div className="user-info">
            <div className="user-name">مشال</div>
            <div className="user-role">مدير</div>
          </div>
        </div>

        <button className="icon-button logout-button" onClick={handleLogout} title="تسجيل الخروج">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}
