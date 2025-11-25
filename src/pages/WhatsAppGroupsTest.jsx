import React, { useState, useEffect } from 'react'
import { MessageCircle, Send, RefreshCw, Users, CheckCircle, AlertCircle } from 'lucide-react'
import ultraMsgService from '../services/ultramsg'
import mondayWebhookService from '../services/mondayWebhook'
import './WhatsAppGroupsTest.css'

export default function WhatsAppGroupsTest() {
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [message, setMessage] = useState('مرحباً! هذه رسالة تجريبية من Sunday Board Pro 🚀')
  const [loading, setLoading] = useState(false)
  const [loadingGroups, setLoadingGroups] = useState(false)
  const [result, setResult] = useState(null)
  const [configured, setConfigured] = useState(false)

  // Load Ultra MSG config on mount
  useEffect(() => {
    const config = mondayWebhookService.getUltraMsgConfig()
    if (config) {
      ultraMsgService.configure(config.apiUrl, config.instanceId, config.token)
      setConfigured(true)
      console.log('✅ Ultra MSG configured from settings')
    } else {
      console.log('⚠️ Ultra MSG not configured')
    }
  }, [])

  const loadGroups = async () => {
    if (!configured) {
      setResult({
        success: false,
        message: 'يرجى تهيئة Ultra MSG من صفحة الإعدادات أولاً'
      })
      return
    }

    setLoadingGroups(true)
    setResult(null)

    try {
      const response = await ultraMsgService.getGroups()

      if (response.success && response.groups) {
        setGroups(response.groups)
        setResult({
          success: true,
          message: `تم جلب ${response.groups.length} مجموعة بنجاح ✅`
        })
      } else {
        setResult({
          success: false,
          message: response.message || 'فشل جلب المجموعات'
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `خطأ: ${error.message}`
      })
    } finally {
      setLoadingGroups(false)
    }
  }

  const sendTestMessage = async () => {
    if (!selectedGroup) {
      setResult({
        success: false,
        message: 'يرجى اختيار مجموعة أولاً'
      })
      return
    }

    if (!message.trim()) {
      setResult({
        success: false,
        message: 'يرجى كتابة رسالة'
      })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await ultraMsgService.sendGroupMessage(selectedGroup.id, message)

      setResult(response)

      if (response.success) {
        // Clear message after successful send
        setTimeout(() => {
          setMessage('مرحباً! هذه رسالة تجريبية من Sunday Board Pro 🚀')
        }, 2000)
      }
    } catch (error) {
      setResult({
        success: false,
        message: `خطأ: ${error.message}`
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="whatsapp-groups-test-page">
      <div className="page-header">
        <div className="header-content">
          <h1>📱 اختبار مجموعات واتساب</h1>
          <p>إرسال رسائل تجريبية لمجموعات واتساب عبر Ultra MSG</p>
        </div>
      </div>

      {!configured && (
        <div className="warning-box">
          <AlertCircle size={20} />
          <span>يرجى تهيئة Ultra MSG من صفحة الإعدادات أولاً</span>
        </div>
      )}

      <div className="test-container">
        {/* Groups List Section */}
        <div className="groups-section">
          <div className="section-header">
            <h3>
              <Users size={20} />
              <span>المجموعات المتاحة</span>
            </h3>
            <button
              className="refresh-btn"
              onClick={loadGroups}
              disabled={loadingGroups || !configured}
            >
              <RefreshCw size={16} className={loadingGroups ? 'spin' : ''} />
              <span>{loadingGroups ? 'جاري التحميل...' : 'تحديث القائمة'}</span>
            </button>
          </div>

          {groups.length > 0 ? (
            <div className="groups-list">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`group-item ${selectedGroup?.id === group.id ? 'selected' : ''}`}
                  onClick={() => setSelectedGroup(group)}
                >
                  <div className="group-icon">
                    <Users size={20} />
                  </div>
                  <div className="group-info">
                    <div className="group-name">{group.name}</div>
                    <div className="group-meta">
                      {group.participantsCount} عضو
                    </div>
                  </div>
                  {selectedGroup?.id === group.id && (
                    <div className="selected-badge">
                      <CheckCircle size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Users size={48} style={{ opacity: 0.3 }} />
              <p>لا توجد مجموعات</p>
              <p>اضغط "تحديث القائمة" لجلب المجموعات</p>
            </div>
          )}
        </div>

        {/* Message Section */}
        <div className="message-section">
          <div className="section-header">
            <h3>
              <MessageCircle size={20} />
              <span>الرسالة التجريبية</span>
            </h3>
          </div>

          {selectedGroup && (
            <div className="selected-group-preview">
              <span>سيتم الإرسال إلى:</span>
              <strong>{selectedGroup.name}</strong>
            </div>
          )}

          <div className="message-input-wrapper">
            <textarea
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              rows={8}
              disabled={loading}
            />
          </div>

          <button
            className="send-btn"
            onClick={sendTestMessage}
            disabled={loading || !selectedGroup || !configured}
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="spin" />
                <span>جاري الإرسال...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>إرسال الرسالة</span>
              </>
            )}
          </button>

          {/* Result Message */}
          {result && (
            <div className={`result-message ${result.success ? 'success' : 'error'}`}>
              {result.success ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span>{result.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions-box">
        <h3>📝 كيفية الاستخدام</h3>
        <ol>
          <li>تأكد من تهيئة Ultra MSG من صفحة الإعدادات</li>
          <li>اضغط على "تحديث القائمة" لجلب مجموعات واتساب المتاحة</li>
          <li>اختر المجموعة التي تريد الإرسال إليها</li>
          <li>اكتب رسالتك التجريبية</li>
          <li>اضغط "إرسال الرسالة"</li>
        </ol>

        <div className="info-box">
          <AlertCircle size={16} />
          <span>
            <strong>ملاحظة:</strong> لإرسال رسائل تلقائية لمجموعة، يمكنك وضع معرف المجموعة (Group ID)
            بدلاً من رقم الهاتف في أي حقل "رقم الواتساب" في النظام.
          </span>
        </div>

        <div className="tip-box">
          <h4>💡 كيفية الحصول على Group ID؟</h4>
          <p>معرف المجموعة سيظهر في القائمة أعلاه بعد الضغط على "تحديث القائمة"</p>
          <p>الصيغة: <code>966XXXXXXXXX-XXXXXXXXXX@g.us</code></p>
        </div>
      </div>
    </div>
  )
}
