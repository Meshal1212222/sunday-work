import { useState } from 'react'
import { Send, MessageCircle, Check, AlertCircle, Loader2 } from 'lucide-react'
import ultraMsgService from '../services/ultramsg'
import './WhatsAppNotification.css'

export default function WhatsAppNotification({ task, assignee, currentUser }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // بيانات Ultra MSG (يجب أن تكون في localStorage أو من الإعدادات)
  const getUltraMsgConfig = () => {
    const config = localStorage.getItem('ultramsg_config')
    return config ? JSON.parse(config) : null
  }

  const handleSendNotification = async () => {
    // التحقق من إعدادات Ultra MSG
    const config = getUltraMsgConfig()
    if (!config || !config.apiUrl || !config.token) {
      setResult({
        success: false,
        message: 'يجب تكوين إعدادات Ultra MSG أولاً من صفحة الإعدادات'
      })
      return
    }

    // التحقق من رقم الموظف
    if (!assignee?.whatsappNumber) {
      setResult({
        success: false,
        message: 'رقم واتساب الموظف غير موجود'
      })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      // تهيئة Ultra MSG
      ultraMsgService.configure(config.apiUrl, config.instanceId, config.token)

      // إرسال الإشعار
      const response = await ultraMsgService.sendTaskUpdateNotification(
        task,
        assignee.name,
        assignee.whatsappNumber,
        currentUser.name || 'المدير'
      )

      setResult(response)

      if (response.success) {
        // إغلاق النافذة بعد 2 ثانية
        setTimeout(() => {
          setShowModal(false)
          setResult(null)
        }, 2000)
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'حدث خطأ أثناء الإرسال',
        error: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* زر إرسال إشعار */}
      <button
        className="whatsapp-notify-btn"
        onClick={() => setShowModal(true)}
        title="إرسال تنبيه واتساب"
      >
        <MessageCircle size={18} />
        <span>تنبيه واتساب</span>
      </button>

      {/* نافذة التأكيد */}
      {showModal && (
        <div className="whatsapp-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="whatsapp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="whatsapp-modal-header">
              <MessageCircle size={24} style={{ color: '#25D366' }} />
              <h3>إرسال تنبيه واتساب</h3>
            </div>

            <div className="whatsapp-modal-body">
              {/* معاينة الرسالة */}
              <div className="message-preview">
                <h4>معاينة الرسالة:</h4>
                <div className="message-content">
                  <p>هلا وغلا يا {assignee?.name || 'الموظف'} 😃✨</p>
                  <p>{currentUser?.name || 'المدير'} يطلب منك تحديث عن ✅✨،</p>
                  <br />
                  <p><strong>المهمة الرئيسية:</strong> {task?.title || 'غير محدد'}</p>
                  <p><strong>القسم:</strong> {task?.department || 'غير محدد'}</p>
                  <p><strong>الحالة:</strong> {task?.status || 'غير محدد'}</p>
                  <p><strong>متابعة الجودة:</strong> {task?.qualityCheck || 'غير محدد'}</p>
                  <p><strong>التاريخ:</strong> {task?.dueDate || 'غير محدد'}</p>
                  <br />
                  <p>ياليت تطلع عليها 👀</p>
                </div>
              </div>

              {/* معلومات المستلم */}
              <div className="recipient-info">
                <p><strong>المرسل إليه:</strong> {assignee?.name || 'غير محدد'}</p>
                <p><strong>رقم الواتساب:</strong> {assignee?.whatsappNumber || 'غير محدد'}</p>
              </div>

              {/* نتيجة الإرسال */}
              {result && (
                <div className={`result-message ${result.success ? 'success' : 'error'}`}>
                  {result.success ? (
                    <Check size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{result.message}</span>
                </div>
              )}
            </div>

            <div className="whatsapp-modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                إلغاء
              </button>
              <button
                className="btn-send"
                onClick={handleSendNotification}
                disabled={loading || !assignee?.whatsappNumber}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>إرسال</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
