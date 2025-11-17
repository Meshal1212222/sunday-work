import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react'
import './Settings.css'

export default function Settings() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <SettingsIcon size={32} />
          <div>
            <h1>الإعدادات</h1>
            <p className="page-subtitle">إدارة إعدادات الحساب والنظام</p>
          </div>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <User size={24} />
            <h3>الملف الشخصي</h3>
          </div>
          <div className="settings-card-body">
            <p>إدارة معلومات الملف الشخصي والصورة</p>
            <button className="btn-secondary">تعديل الملف الشخصي</button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <Bell size={24} />
            <h3>الإشعارات</h3>
          </div>
          <div className="settings-card-body">
            <p>تخصيص إعدادات الإشعارات والتنبيهات</p>
            <button className="btn-secondary">إدارة الإشعارات</button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <Shield size={24} />
            <h3>الأمان والخصوصية</h3>
          </div>
          <div className="settings-card-body">
            <p>إعدادات كلمة المرور والأمان</p>
            <button className="btn-secondary">إدارة الأمان</button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <Palette size={24} />
            <h3>المظهر</h3>
          </div>
          <div className="settings-card-body">
            <p>تخصيص ألوان ومظهر النظام</p>
            <button className="btn-secondary">تخصيص المظهر</button>
          </div>
        </div>
      </div>
    </div>
  )
}
