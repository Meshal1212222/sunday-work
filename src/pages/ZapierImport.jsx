import React, { useState } from 'react'
import { Download, Key, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react'
import zapierImportService from '../services/zapierImport'
import mondayWebhookService from '../services/mondayWebhook'
import './ZapierImport.css'

export default function ZapierImport() {
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [importedZaps, setImportedZaps] = useState([])

  const handleImport = async () => {
    if (!apiKey.trim()) {
      setResult({
        success: false,
        message: 'الرجاء إدخال Zapier API Key'
      })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      // تعيين API Key
      zapierImportService.setApiKey(apiKey)

      // استيراد الـ Zaps
      const automations = await zapierImportService.importMondayWhatsAppZaps()

      if (automations.length === 0) {
        setResult({
          success: false,
          message: 'لم يتم العثور على Zaps تربط Monday.com بـ WhatsApp'
        })
        setLoading(false)
        return
      }

      // حفظ كل automation
      for (const automation of automations) {
        mondayWebhookService.addRule(automation)
      }

      setImportedZaps(automations)
      setResult({
        success: true,
        message: `تم استيراد ${automations.length} Zaps بنجاح! ✅`
      })

      // حفظ API Key للاستخدام المستقبلي
      localStorage.setItem('zapier_api_key', apiKey)

    } catch (error) {
      console.error('Import error:', error)
      setResult({
        success: false,
        message: `فشل الاستيراد: ${error.message}`
      })
    } finally {
      setLoading(false)
    }
  }

  const loadSavedApiKey = () => {
    const saved = localStorage.getItem('zapier_api_key')
    if (saved) {
      setApiKey(saved)
      setResult({
        success: true,
        message: 'تم تحميل API Key المحفوظ'
      })
    }
  }

  return (
    <div className="zapier-import-page">
      <div className="page-header">
        <div className="header-content">
          <h1>استيراد من Zapier</h1>
          <p>استيراد الـ Zaps الخاصة بـ Monday.com → WhatsApp تلقائياً</p>
        </div>
      </div>

      <div className="import-container">
        {/* تعليمات */}
        <div className="instructions-card">
          <h3>📋 كيفية الحصول على Zapier API Key</h3>
          <ol>
            <li>
              افتح
              <a href="https://zapier.com/app/developer" target="_blank" rel="noopener noreferrer">
                Zapier Developer Dashboard <ExternalLink size={14} />
              </a>
            </li>
            <li>اضغط على "Manage Clients" أو "Get API Key"</li>
            <li>انسخ الـ API Key</li>
            <li>الصقه في الحقل أدناه</li>
          </ol>
        </div>

        {/* API Key Input */}
        <div className="api-key-section">
          <div className="input-group">
            <label htmlFor="apiKey">
              <Key size={18} />
              <span>Zapier API Key</span>
            </label>
            <div className="input-with-button">
              <input
                id="apiKey"
                type="password"
                placeholder="أدخل Zapier API Key هنا..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={loading}
              />
              <button
                className="load-saved-btn"
                onClick={loadSavedApiKey}
                disabled={loading}
              >
                تحميل المحفوظ
              </button>
            </div>
          </div>

          <button
            className="import-btn"
            onClick={handleImport}
            disabled={loading || !apiKey.trim()}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="spin" />
                <span>جاري الاستيراد...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>استيراد الـ Zaps</span>
              </>
            )}
          </button>
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

        {/* Imported Zaps List */}
        {importedZaps.length > 0 && (
          <div className="imported-zaps">
            <h3>✅ الـ Zaps المستوردة ({importedZaps.length})</h3>
            <div className="zaps-list">
              {importedZaps.map(zap => (
                <div key={zap.id} className="zap-card">
                  <div className="zap-header">
                    <h4>{zap.name}</h4>
                    <span className={`status-badge ${zap.active ? 'active' : 'inactive'}`}>
                      {zap.active ? 'مفعل' : 'معطل'}
                    </span>
                  </div>
                  <div className="zap-details">
                    <div className="detail-row">
                      <span className="label">Trigger:</span>
                      <span className="value">{zap.trigger}</span>
                    </div>
                    {zap.triggerColumn && (
                      <div className="detail-row">
                        <span className="label">Column:</span>
                        <span className="value">{zap.triggerColumn}</span>
                      </div>
                    )}
                    <div className="detail-row">
                      <span className="label">Action:</span>
                      <span className="value">{zap.action}</span>
                    </div>
                    {zap.customMessage && (
                      <div className="detail-row message-preview">
                        <span className="label">Message:</span>
                        <div className="message-content">
                          {zap.customMessage}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="help-section">
          <h3>❓ المساعدة</h3>
          <details>
            <summary>ما هي الـ Zaps التي سيتم استيرادها؟</summary>
            <p>سيتم استيراد جميع الـ Zaps التي:</p>
            <ul>
              <li>✅ Trigger من Monday.com</li>
              <li>✅ Action إلى Ultra MSG / WhatsApp</li>
            </ul>
          </details>

          <details>
            <summary>هل البيانات آمنة؟</summary>
            <p>
              نعم، الـ API Key يُحفظ محلياً في متصفحك فقط ولا يُرسل لأي خادم خارجي.
              يُستخدم فقط للاتصال المباشر بـ Zapier API.
            </p>
          </details>

          <details>
            <summary>ماذا بعد الاستيراد؟</summary>
            <p>
              بعد الاستيراد، ستظهر الـ Automations في صفحة "الأتمتة" ويمكنك تفعيلها/تعطيلها/تعديلها.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}
