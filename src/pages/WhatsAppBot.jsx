import { useState, useEffect } from 'react'
import { Bot, Power, Key, UserPlus, Trash2, MessageCircle, CheckCircle, AlertCircle, Download, RefreshCw } from 'lucide-react'
import whatsappBot from '../services/whatsappBot'
import sundayDataStore from '../services/sundayDataStore'
import localDataStore from '../services/localDataStore'
import './WhatsAppBot.css'

export default function WhatsAppBot() {
  const [settings, setSettings] = useState(whatsappBot.getSettings())
  const [openaiKey, setOpenaiKey] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [history, setHistory] = useState(whatsappBot.getHistory())
  const [stats, setStats] = useState(sundayDataStore.getStats())
  const [importing, setImporting] = useState(false)
  const [testMessage, setTestMessage] = useState('صيف مهمة اختبار البوت في بورد قولدن هوست في قروب الإدارة لماجد')
  const [testResult, setTestResult] = useState(null)

  const loadSettings = () => {
    setSettings(whatsappBot.getSettings())
    setHistory(whatsappBot.getHistory())
    setStats(sundayDataStore.getStats())
  }

  const handleToggleBot = () => {
    whatsappBot.setEnabled(!settings.enabled)
    loadSettings()
  }

  const handleSaveApiKey = () => {
    if (openaiKey.trim()) {
      whatsappBot.setOpenAIKey(openaiKey.trim())
      setOpenaiKey('')
      loadSettings()
      alert('✅ تم حفظ OpenAI API Key')
    }
  }

  const handleAddNumber = () => {
    if (newNumber.trim()) {
      whatsappBot.addAllowedNumber(newNumber.trim())
      setNewNumber('')
      loadSettings()
    }
  }

  const handleRemoveNumber = (number) => {
    whatsappBot.removeAllowedNumber(number)
    loadSettings()
  }

  const handleImportFromMonday = async () => {
    setImporting(true)
    try {
      // سحب البيانات من Monday أولاً
      const syncResult = await localDataStore.syncAllDataFromMonday()

      if (syncResult.success) {
        // استيراد البيانات إلى Sunday
        const mondayData = {
          boards: localDataStore.getBoards(),
          items: localDataStore.getItems()
        }

        const importResult = await sundayDataStore.importFromMonday(mondayData)

        if (importResult.success) {
          alert(`✅ تم الاستيراد بنجاح!\n📊 بوردات: ${importResult.boardsImported}\n📋 مهام: ${importResult.itemsImported}`)
          loadSettings()
        } else {
          alert(`❌ فشل الاستيراد: ${importResult.error}`)
        }
      } else {
        alert(`❌ فشل السحب من Monday: ${syncResult.error}`)
      }
    } catch (error) {
      alert(`❌ خطأ: ${error.message}`)
    } finally {
      setImporting(false)
    }
  }

  const handleTestBot = async () => {
    setTestResult(null)
    try {
      const result = await whatsappBot.handleIncomingMessage({
        from: '966500000000@c.us',
        body: testMessage,
        type: 'chat'
      })

      setTestResult(result)
      loadSettings()
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message
      })
    }
  }

  return (
    <div className="whatsapp-bot-page">
      <div className="page-header">
        <div className="header-content">
          <h1>🤖 WhatsApp AI Bot</h1>
          <p>بوت ذكي لإدارة المهام عبر واتساب</p>
        </div>
      </div>

      {/* Bot Status */}
      <div className="bot-status-card">
        <div className="status-header">
          <div className="status-icon">
            <Bot size={32} />
          </div>
          <div>
            <h3>حالة البوت</h3>
            <p className={settings.enabled ? 'status-active' : 'status-inactive'}>
              {settings.enabled ? '🟢 نشط' : '🔴 متوقف'}
            </p>
          </div>
        </div>

        <button className="toggle-btn" onClick={handleToggleBot}>
          <Power size={20} />
          <span>{settings.enabled ? 'إيقاف البوت' : 'تشغيل البوت'}</span>
        </button>
      </div>

      {/* API Configuration */}
      <div className="config-card">
        <h3><Key size={20} /> إعدادات OpenAI</h3>
        <p>أدخل OpenAI API Key لتفعيل الذكاء الاصطناعي (اختياري - البوت يعمل بدونه)</p>

        <div className="input-group">
          <input
            type="password"
            placeholder="sk-..."
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
          />
          <button onClick={handleSaveApiKey}>حفظ</button>
        </div>

        <div className="status-badge">
          {settings.hasOpenAIKey ? '✅ API Key محفوظ' : '⚪ لم يتم تعيين API Key'}
        </div>
      </div>

      {/* Allowed Numbers */}
      <div className="config-card">
        <h3><UserPlus size={20} /> الأرقام المسموحة</h3>
        <p>الأرقام المسموح لها باستخدام البوت (فارغ = السماح للجميع)</p>

        <div className="input-group">
          <input
            type="text"
            placeholder="966xxxxxxxxx"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
          <button onClick={handleAddNumber}>إضافة</button>
        </div>

        {settings.allowedNumbers.length > 0 && (
          <div className="numbers-list">
            {settings.allowedNumbers.map(number => (
              <div key={number} className="number-item">
                <span>{number}</span>
                <button onClick={() => handleRemoveNumber(number)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Import from Monday */}
      <div className="config-card">
        <h3><Download size={20} /> استيراد بيانات Monday</h3>
        <p>سحب كل البوردات والمهام من Monday قبل إقفال API</p>

        <button
          className="import-btn"
          onClick={handleImportFromMonday}
          disabled={importing}
        >
          {importing ? (
            <>
              <RefreshCw size={20} className="spin" />
              <span>جاري الاستيراد...</span>
            </>
          ) : (
            <>
              <Download size={20} />
              <span>استيراد من Monday الآن</span>
            </>
          )}
        </button>
      </div>

      {/* Sunday Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.boards}</div>
          <div className="stat-label">بورد</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.activeItems}</div>
          <div className="stat-label">مهمة نشطة</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.users}</div>
          <div className="stat-label">مستخدم</div>
        </div>
      </div>

      {/* Test Bot */}
      <div className="test-card">
        <h3><MessageCircle size={20} /> اختبار البوت</h3>

        <textarea
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          rows={3}
          placeholder="اكتب أمر لاختبار البوت..."
        />

        <button className="test-btn" onClick={handleTestBot}>
          اختبار
        </button>

        {testResult && (
          <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
            {testResult.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <div>
              {testResult.response?.reply || testResult.error}
            </div>
          </div>
        )}
      </div>

      {/* Message History */}
      {history.length > 0 && (
        <div className="history-card">
          <h3>📜 سجل الرسائل (آخر {history.length})</h3>

          <div className="history-list">
            {history.slice(0, 10).map((entry, index) => (
              <div key={index} className="history-item">
                <div className="history-header">
                  <span className="history-from">{entry.from}</span>
                  <span className="history-time">
                    {new Date(entry.timestamp).toLocaleString('ar-SA')}
                  </span>
                </div>
                <div className="history-message">📩 {entry.message}</div>
                <div className="history-response">✅ {entry.response}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="instructions">
        <h3>📖 كيفية الاستخدام</h3>

        <div className="instruction-step">
          <div className="step-number">1</div>
          <div>
            <h4>إعداد Ultra MSG Webhook</h4>
            <p>في لوحة تحكم Ultra MSG، اضبط Webhook URL على:</p>
            <code>{window.location.origin}/api/whatsapp/webhook</code>
          </div>
        </div>

        <div className="instruction-step">
          <div className="step-number">2</div>
          <div>
            <h4>استيراد البيانات من Monday</h4>
            <p>اضغط "استيراد من Monday الآن" لسحب كل بياناتك</p>
          </div>
        </div>

        <div className="instruction-step">
          <div className="step-number">3</div>
          <div>
            <h4>تفعيل البوت</h4>
            <p>اضغط "تشغيل البوت" لبدء استقبال الرسائل</p>
          </div>
        </div>

        <div className="instruction-step">
          <div className="step-number">4</div>
          <div>
            <h4>إرسال الأوامر</h4>
            <p>أرسل رسالة واتساب للرقم المتصل بـ Ultra MSG</p>
            <p>مثال: "صيف مهمة في بورد قولدن هوست في قروب الإدارة لماجد"</p>
          </div>
        </div>
      </div>
    </div>
  )
}
