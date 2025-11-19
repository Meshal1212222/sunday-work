import { useState } from 'react'
import WhatsAppNotification from '../components/WhatsAppNotification'
import { MessageCircle } from 'lucide-react'
import './WhatsAppTest.css'

export default function WhatsAppTest() {
  const [taskData, setTaskData] = useState({
    title: 'الربط مع شركة مزودة لتذاكر الطيران',
    department: 'النمو والتطوير والشراكات',
    status: 'جديدة',
    qualityCheck: 'غير محدد',
    dueDate: 'غير محدد'
  })

  const [assigneeData, setAssigneeData] = useState({
    name: 'محمد',
    whatsappNumber: '' // اتركه فارغ ليقوم المستخدم بإدخال رقمه
  })

  const [currentUserData] = useState({
    name: 'مشال'
  })

  return (
    <div className="whatsapp-test-page">
      <div className="test-header">
        <MessageCircle size={40} style={{ color: '#25D366' }} />
        <h1>اختبار إرسال تنبيهات واتساب</h1>
        <p>صفحة تجريبية لاختبار نظام Ultra MSG</p>
      </div>

      <div className="test-container">
        {/* Task Data Form */}
        <div className="test-section">
          <h2>📋 بيانات المهمة</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>المهمة الرئيسية:</label>
              <input
                type="text"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>القسم:</label>
              <input
                type="text"
                value={taskData.department}
                onChange={(e) => setTaskData({ ...taskData, department: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>الحالة:</label>
              <select
                value={taskData.status}
                onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                className="input-field"
              >
                <option value="جديدة">جديدة</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="منتهية">منتهية</option>
                <option value="معلقة">معلقة</option>
                <option value="متأخرة">متأخرة</option>
              </select>
            </div>

            <div className="form-group">
              <label>متابعة الجودة:</label>
              <input
                type="text"
                value={taskData.qualityCheck}
                onChange={(e) => setTaskData({ ...taskData, qualityCheck: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>التاريخ:</label>
              <input
                type="text"
                value={taskData.dueDate}
                onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                className="input-field"
                placeholder="2024-12-31"
              />
            </div>
          </div>
        </div>

        {/* Assignee Data Form */}
        <div className="test-section">
          <h2>👤 بيانات الموظف المستلم</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>اسم الموظف:</label>
              <input
                type="text"
                value={assigneeData.name}
                onChange={(e) => setAssigneeData({ ...assigneeData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>رقم الواتساب: <span style={{ color: '#DC3545', fontWeight: '700' }}>*</span></label>
              <input
                type="text"
                value={assigneeData.whatsappNumber}
                onChange={(e) => setAssigneeData({ ...assigneeData, whatsappNumber: e.target.value })}
                className="input-field"
                placeholder="966501234567"
                dir="ltr"
                style={{
                  textAlign: 'left',
                  borderColor: assigneeData.whatsappNumber && assigneeData.whatsappNumber.length < 12 ? '#FFC107' : '#E0E0E0'
                }}
              />
              <small style={{ color: assigneeData.whatsappNumber ? '#128C7E' : '#DC3545', fontSize: '12px', marginTop: '4px', display: 'block', fontWeight: '600' }}>
                ⚠️ أدخل رقم واتساب حقيقي! الصيغة: 966XXXXXXXXX (بدون صفر أو + في البداية)
              </small>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="test-section preview-section">
          <h2>👁️ معاينة الرسالة</h2>
          <div className="message-preview-box">
            <p>هلا وغلا يا <strong>{assigneeData.name}</strong> 😃✨</p>
            <p><strong>{currentUserData.name}</strong> يطلب منك تحديث عن ✅✨،</p>
            <br />
            <p><strong>المهمة الرئيسية:</strong> {taskData.title}</p>
            <p><strong>القسم:</strong> {taskData.department}</p>
            <p><strong>الحالة:</strong> {taskData.status}</p>
            <p><strong>متابعة الجودة:</strong> {taskData.qualityCheck}</p>
            <p><strong>التاريخ:</strong> {taskData.dueDate}</p>
            <br />
            <p>ياليت تطلع عليها 👀</p>
          </div>
        </div>

        {/* Send Button */}
        <div className="test-section send-section">
          <div className="info-alert">
            <strong>⚠️ تنبيه مهم:</strong>
            <p>• تأكد من إدخال بيانات Ultra MSG في صفحة الإعدادات أولاً</p>
            <p>• تأكد من صحة رقم الواتساب (بصيغة: 966XXXXXXXXX)</p>
            <p>• الرسالة سترسل فعلياً إلى الرقم المدخل!</p>
          </div>

          <WhatsAppNotification
            task={taskData}
            assignee={assigneeData}
            currentUser={currentUserData}
          />
        </div>
      </div>

      {/* Quick Instructions */}
      <div className="instructions">
        <h3>📝 التعليمات السريعة:</h3>
        <ol>
          <li>تأكد من إعداد Ultra MSG في صفحة <a href="/sunday-management/settings">الإعدادات</a></li>
          <li>عدّل بيانات المهمة حسب حاجتك</li>
          <li>أدخل اسم ورقم الموظف المستلم</li>
          <li>راجع معاينة الرسالة</li>
          <li>اضغط "تنبيه واتساب" لإرسال الرسالة</li>
        </ol>
      </div>
    </div>
  )
}
