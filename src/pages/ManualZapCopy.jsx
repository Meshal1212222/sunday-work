import React, { useState } from 'react'
import { Copy, Save, CheckCircle, AlertCircle, Plus, Trash2, Eye } from 'lucide-react'
import mondayWebhookService from '../services/mondayWebhook'
import './ManualZapCopy.css'

export default function ManualZapCopy() {
  const [zapData, setZapData] = useState({
    name: '',
    trigger: 'column_changed',
    triggerColumn: 'status',
    condition: '',
    messageTemplate: '',
    active: true
  })

  const [result, setResult] = useState(null)
  const [preview, setPreview] = useState('')

  const triggers = [
    { value: 'column_changed', label: 'عند تغيير عمود (Column Changed)' },
    { value: 'item_created', label: 'عند إنشاء مهمة (Item Created)' },
    { value: 'date_approaching', label: 'عند اقتراب الموعد (Date Approaching)' },
    { value: 'status_changed', label: 'عند تغيير الحالة (Status Changed)' }
  ]

  const columns = [
    { value: 'status', label: 'Status (الحالة)' },
    { value: 'person', label: 'Person (الموظف)' },
    { value: 'date', label: 'Date (التاريخ)' },
    { value: 'text', label: 'Text (نص)' },
    { value: 'phone', label: 'Phone (الهاتف)' }
  ]

  const messageTemplates = [
    {
      name: 'تحديث الحالة',
      value: `هلا وغلا يا {assigneeName} 😃✨

تم تحديث حالة المهمة:

📋 المهمة: {taskName}
🏢 القسم: {boardName}
✅ الحالة الجديدة: {status}

ياليت تطلع عليها 👀`
    },
    {
      name: 'مهمة جديدة',
      value: `هلا وغلا يا {assigneeName} 😃✨

تم تعيينك على مهمة جديدة:

📋 المهمة: {taskName}
🏢 القسم: {boardName}
✅ الحالة: {status}

ياليت تطلع عليها 👀`
    },
    {
      name: 'تذكير بالموعد',
      value: `تنبيه مهم يا {assigneeName} ⏰

موعد المهمة قريب:

📋 المهمة: {taskName}
🏢 القسم: {boardName}
⏰ الموعد: غداً

لا تنسى! 🔔`
    },
    {
      name: 'تأخير في المهمة',
      value: `تنبيه عاجل يا {assigneeName} 🚨

المهمة متأخرة:

📋 المهمة: {taskName}
🏢 القسم: {boardName}
⚠️ الحالة: متأخر

يرجى المتابعة فوراً! 🔴`
    }
  ]

  const handleInputChange = (field, value) => {
    setZapData(prev => ({ ...prev, [field]: value }))
  }

  const handleTemplateSelect = (template) => {
    setZapData(prev => ({ ...prev, messageTemplate: template.value }))
    generatePreview(template.value)
  }

  const generatePreview = (template) => {
    const previewText = template
      .replace('{assigneeName}', 'أحمد')
      .replace('{taskName}', 'مثال: تطوير الموقع')
      .replace('{boardName}', 'مثال: المشاريع')
      .replace('{status}', 'قيد التنفيذ')

    setPreview(previewText)
  }

  const handleSave = () => {
    if (!zapData.name || !zapData.messageTemplate) {
      setResult({
        success: false,
        message: 'الرجاء تعبئة اسم الـ Zap ونص الرسالة'
      })
      return
    }

    try {
      // حفظ القاعدة
      const rule = {
        name: zapData.name,
        trigger: zapData.trigger,
        triggerColumn: zapData.triggerColumn,
        condition: zapData.condition || null,
        action: 'send_whatsapp',
        active: zapData.active,
        messageTemplate: 'custom',
        customMessage: zapData.messageTemplate,
        source: 'manual_copy'
      }

      mondayWebhookService.addRule(rule)

      setResult({
        success: true,
        message: `✅ تم حفظ "${zapData.name}" بنجاح!`
      })

      // مسح النموذج
      setTimeout(() => {
        setZapData({
          name: '',
          trigger: 'column_changed',
          triggerColumn: 'status',
          condition: '',
          messageTemplate: '',
          active: true
        })
        setPreview('')
        setResult(null)
      }, 2000)

    } catch (error) {
      setResult({
        success: false,
        message: `فشل الحفظ: ${error.message}`
      })
    }
  }

  const handleCustomMessageChange = (value) => {
    setZapData(prev => ({ ...prev, messageTemplate: value }))
    generatePreview(value)
  }

  return (
    <div className="manual-zap-copy-page">
      <div className="page-header">
        <div className="header-content">
          <h1>📋 نسخ Zap يدوياً</h1>
          <p>انسخ بيانات الـ Zap من Zapier إلى Sunday Board</p>
        </div>
      </div>

      <div className="copy-container">
        {/* تعليمات */}
        <div className="instructions-box">
          <h3>📝 كيف تنسخ الـ Zap؟</h3>
          <ol>
            <li>افتح الـ Zap في Zapier</li>
            <li>انسخ المعلومات التالية:</li>
            <ul>
              <li>متى يشتغل الـ Zap (Trigger)</li>
              <li>أي عمود يتابع (Column)</li>
              <li>نص الرسالة اللي يرسلها</li>
            </ul>
            <li>الصق المعلومات في النموذج أدناه</li>
            <li>اضغط "حفظ"</li>
          </ol>
        </div>

        {/* نموذج النسخ */}
        <div className="copy-form">
          <h3>🎯 بيانات الـ Zap</h3>

          {/* اسم الـ Zap */}
          <div className="form-group">
            <label>
              <span className="required">*</span>
              اسم الـ Zap
            </label>
            <input
              type="text"
              placeholder="مثال: إرسال واتساب عند تغيير الحالة"
              value={zapData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          {/* Trigger */}
          <div className="form-group">
            <label>
              <span className="required">*</span>
              متى يشتغل؟ (Trigger)
            </label>
            <select
              value={zapData.trigger}
              onChange={(e) => handleInputChange('trigger', e.target.value)}
            >
              {triggers.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Column */}
          {(zapData.trigger === 'column_changed' || zapData.trigger === 'status_changed') && (
            <div className="form-group">
              <label>
                <span className="required">*</span>
                أي عمود؟ (Column)
              </label>
              <select
                value={zapData.triggerColumn}
                onChange={(e) => handleInputChange('triggerColumn', e.target.value)}
              >
                {columns.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          )}

          {/* Condition (اختياري) */}
          <div className="form-group">
            <label>شرط إضافي (اختياري)</label>
            <input
              type="text"
              placeholder='مثال: only if status is "متأخر"'
              value={zapData.condition}
              onChange={(e) => handleInputChange('condition', e.target.value)}
            />
          </div>

          {/* قوالب الرسائل الجاهزة */}
          <div className="form-group">
            <label>قوالب رسائل جاهزة</label>
            <div className="template-buttons">
              {messageTemplates.map((template, idx) => (
                <button
                  key={idx}
                  className="template-btn"
                  onClick={() => handleTemplateSelect(template)}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* نص الرسالة */}
          <div className="form-group">
            <label>
              <span className="required">*</span>
              نص الرسالة (من Zapier)
            </label>
            <textarea
              rows={10}
              placeholder="الصق نص الرسالة من Zapier هنا...

يمكنك استخدام:
{assigneeName} - اسم الموظف
{taskName} - اسم المهمة
{boardName} - اسم البورد
{status} - الحالة"
              value={zapData.messageTemplate}
              onChange={(e) => handleCustomMessageChange(e.target.value)}
            />
            <div className="help-text">
              💡 استخدم {'{assigneeName}'} للاسم، {'{taskName}'} للمهمة، {'{boardName}'} للبورد، {'{status}'} للحالة
            </div>
          </div>

          {/* معاينة الرسالة */}
          {preview && (
            <div className="message-preview-box">
              <div className="preview-header">
                <Eye size={16} />
                <span>معاينة الرسالة</span>
              </div>
              <div className="preview-content">
                {preview}
              </div>
            </div>
          )}

          {/* تفعيل */}
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={zapData.active}
                onChange={(e) => handleInputChange('active', e.target.checked)}
              />
              <span>تفعيل هذا الـ Zap فوراً</span>
            </label>
          </div>

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

          {/* أزرار */}
          <div className="form-actions">
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={!zapData.name || !zapData.messageTemplate}
            >
              <Save size={18} />
              <span>حفظ الـ Zap</span>
            </button>
          </div>
        </div>

        {/* قائمة الـ Zaps المحفوظة */}
        <div className="saved-zaps">
          <h3>✅ الـ Zaps المحفوظة</h3>
          <SavedZapsList />
        </div>
      </div>
    </div>
  )
}

function SavedZapsList() {
  const [rules, setRules] = useState([])

  React.useEffect(() => {
    loadRules()
  }, [])

  const loadRules = () => {
    const allRules = mondayWebhookService.getRules()
    setRules(allRules)
  }

  const handleToggle = (ruleId) => {
    mondayWebhookService.toggleRule(ruleId)
    loadRules()
  }

  const handleDelete = (ruleId) => {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      mondayWebhookService.deleteRule(ruleId)
      loadRules()
    }
  }

  if (rules.length === 0) {
    return (
      <div className="empty-state">
        <p>لا توجد Zaps محفوظة بعد</p>
      </div>
    )
  }

  return (
    <div className="zaps-list">
      {rules.map(rule => (
        <div key={rule.id} className="zap-item">
          <div className="zap-info">
            <h4>{rule.name}</h4>
            <div className="zap-meta">
              <span className="trigger-badge">{rule.trigger}</span>
              {rule.triggerColumn && (
                <span className="column-badge">{rule.triggerColumn}</span>
              )}
              <span className={`status-badge ${rule.active ? 'active' : 'inactive'}`}>
                {rule.active ? 'مفعل' : 'معطل'}
              </span>
            </div>
          </div>
          <div className="zap-actions">
            <button
              className="toggle-btn"
              onClick={() => handleToggle(rule.id)}
              title={rule.active ? 'تعطيل' : 'تفعيل'}
            >
              {rule.active ? '⏸️' : '▶️'}
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(rule.id)}
              title="حذف"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
