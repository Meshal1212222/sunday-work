import { Settings as SettingsIcon, User, Bell, Shield, Palette, MessageCircle, Save, Check, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import ultraMsgService from '../services/ultramsg'
import './Settings.css'

export default function Settings() {
  const [ultraMsgConfig, setUltraMsgConfig] = useState({
    apiUrl: '',
    instanceId: '',
    token: ''
  })
  const [saveStatus, setSaveStatus] = useState(null)
  const [testStatus, setTestStatus] = useState(null)
  const [testing, setTesting] = useState(false)

  // تحميل الإعدادات المحفوظة
  useEffect(() => {
    const savedConfig = localStorage.getItem('ultramsg_config')
    if (savedConfig) {
      setUltraMsgConfig(JSON.parse(savedConfig))
    }
  }, [])

  // حفظ إعدادات Ultra MSG
  const handleSaveUltraMsg = () => {
    localStorage.setItem('ultramsg_config', JSON.stringify(ultraMsgConfig))
    setSaveStatus({ success: true, message: 'تم حفظ الإعدادات بنجاح ✅' })

    setTimeout(() => setSaveStatus(null), 3000)
  }

  // اختبار الاتصال
  const handleTestConnection = async () => {
    if (!ultraMsgConfig.apiUrl || !ultraMsgConfig.token) {
      setTestStatus({ success: false, message: 'يرجى ملء جميع البيانات أولاً' })
      return
    }

    setTesting(true)
    setTestStatus(null)

    try {
      // تهيئة الخدمة
      ultraMsgService.configure(
        ultraMsgConfig.apiUrl,
        ultraMsgConfig.instanceId,
        ultraMsgConfig.token
      )

      // يمكنك تغيير هذا الرقم لرقمك للاختبار
      const testPhone = '966500000000'
      const testMessage = '✅ اختبار اتصال Sunday Board Pro - Ultra MSG'

      const result = await ultraMsgService.sendMessage(testPhone, testMessage)

      setTestStatus(result)
    } catch (error) {
      setTestStatus({
        success: false,
        message: 'فشل الاتصال',
        error: error.message
      })
    } finally {
      setTesting(false)
    }
  }
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
        {/* Ultra MSG Settings */}
        <div className="settings-card settings-card-large">
          <div className="settings-card-header">
            <MessageCircle size={24} style={{ color: '#25D366' }} />
            <h3>إعدادات Ultra MSG (واتساب)</h3>
          </div>
          <div className="settings-card-body">
            <p style={{ marginBottom: '20px', color: '#666' }}>
              قم بإعداد Ultra MSG لإرسال تنبيهات واتساب للموظفين عند تحديث المهام
            </p>

            <div className="form-group">
              <label htmlFor="apiUrl">
                <strong>API URL</strong>
                <span style={{ color: '#999', fontSize: '13px', marginRight: '8px' }}>
                  (مثال: https://api.ultramsg.com/instance12345)
                </span>
              </label>
              <input
                id="apiUrl"
                type="text"
                value={ultraMsgConfig.apiUrl}
                onChange={(e) => setUltraMsgConfig({ ...ultraMsgConfig, apiUrl: e.target.value })}
                placeholder="https://api.ultramsg.com/instanceXXXXX"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="instanceId">
                <strong>Instance ID</strong>
                <span style={{ color: '#999', fontSize: '13px', marginRight: '8px' }}>
                  (معرف Instance الخاص بك)
                </span>
              </label>
              <input
                id="instanceId"
                type="text"
                value={ultraMsgConfig.instanceId}
                onChange={(e) => setUltraMsgConfig({ ...ultraMsgConfig, instanceId: e.target.value })}
                placeholder="instance12345"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="token">
                <strong>Token</strong>
                <span style={{ color: '#999', fontSize: '13px', marginRight: '8px' }}>
                  (الـ Token من Ultra MSG)
                </span>
              </label>
              <input
                id="token"
                type="password"
                value={ultraMsgConfig.token}
                onChange={(e) => setUltraMsgConfig({ ...ultraMsgConfig, token: e.target.value })}
                placeholder="••••••••••••••"
                className="input-field"
              />
            </div>

            {saveStatus && (
              <div className={`status-message ${saveStatus.success ? 'success' : 'error'}`}>
                {saveStatus.success ? <Check size={18} /> : <AlertCircle size={18} />}
                <span>{saveStatus.message}</span>
              </div>
            )}

            {testStatus && (
              <div className={`status-message ${testStatus.success ? 'success' : 'error'}`}>
                {testStatus.success ? <Check size={18} /> : <AlertCircle size={18} />}
                <span>{testStatus.message}</span>
              </div>
            )}

            <div className="button-group">
              <button
                className="btn-primary"
                onClick={handleSaveUltraMsg}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Save size={18} />
                <span>حفظ الإعدادات</span>
              </button>

              <button
                className="btn-secondary"
                onClick={handleTestConnection}
                disabled={testing}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <MessageCircle size={18} />
                <span>{testing ? 'جاري الاختبار...' : 'اختبار الاتصال'}</span>
              </button>
            </div>

            <div className="info-box">
              <strong>💡 ملاحظة:</strong>
              <p>• يجب الحصول على بيانات Ultra MSG من موقعهم الرسمي</p>
              <p>• رابط Ultra MSG: <a href="https://ultramsg.com" target="_blank" rel="noopener noreferrer">ultramsg.com</a></p>
              <p>• تأكد من أن Instance الخاص بك نشط ومتصل</p>
            </div>
          </div>
        </div>

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
