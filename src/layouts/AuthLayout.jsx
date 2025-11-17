import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-header">
          <div className="logo-container">
            <div className="logo">
              <span className="logo-icon">📅</span>
              <span className="logo-text">Sunday</span>
            </div>
            <p className="logo-subtitle">منصة إدارة المشاريع الاحترافية</p>
          </div>
        </div>

        <div className="auth-content">
          <Outlet />
        </div>

        <div className="auth-footer">
          <p>© 2024 Sunday Management Platform. جميع الحقوق محفوظة.</p>
        </div>
      </div>

      <div className="auth-background">
        <div className="auth-pattern"></div>
      </div>
    </div>
  )
}
