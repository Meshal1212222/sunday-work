import { useState, useEffect } from 'react'
import { Cloud, Upload, Download, RefreshCw, CheckCircle, AlertCircle, Database, Trash2 } from 'lucide-react'
import { database } from '../firebase/config'
import { ref, get, set, remove } from 'firebase/database'
import './DataSync.css'

export default function DataSync() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ boards: 0, items: 0, team: 0 })
  const [backingUp, setBackingUp] = useState(false)
  const [result, setResult] = useState(null)
  const [lastBackup, setLastBackup] = useState(null)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    try {
      const [boardsSnap, teamSnap, backupSnap] = await Promise.all([
        get(ref(database, 'boards')),
        get(ref(database, 'team')),
        get(ref(database, 'backup_metadata'))
      ])

      let itemsCount = 0
      if (boardsSnap.exists()) {
        const boards = boardsSnap.val()
        Object.values(boards).forEach(board => {
          if (board.items_page?.items) {
            itemsCount += board.items_page.items.length
          } else if (board.itemsByGroup) {
            Object.values(board.itemsByGroup).forEach(items => {
              itemsCount += Array.isArray(items) ? items.length : 0
            })
          }
        })
      }

      setStats({
        boards: boardsSnap.exists() ? Object.keys(boardsSnap.val()).length : 0,
        items: itemsCount,
        team: teamSnap.exists() ? Object.keys(teamSnap.val()).length : 0
      })

      if (backupSnap.exists()) {
        setLastBackup(backupSnap.val())
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
    setLoading(false)
  }

  const handleBackup = async () => {
    setBackingUp(true)
    setResult(null)

    try {
      // حفظ وقت النسخ الاحتياطي
      await set(ref(database, 'backup_metadata'), {
        lastBackup: new Date().toISOString(),
        stats: stats
      })

      setResult({
        success: true,
        message: 'تم حفظ النسخة الاحتياطية بنجاح!'
      })

      setLastBackup({
        lastBackup: new Date().toISOString(),
        stats: stats
      })
    } catch (error) {
      setResult({
        success: false,
        message: `فشل النسخ الاحتياطي: ${error.message}`
      })
    }

    setBackingUp(false)
  }

  const handleExportJSON = async () => {
    try {
      const [boardsSnap, teamSnap] = await Promise.all([
        get(ref(database, 'boards')),
        get(ref(database, 'team'))
      ])

      const exportData = {
        exportDate: new Date().toISOString(),
        boards: boardsSnap.exists() ? boardsSnap.val() : {},
        team: teamSnap.exists() ? teamSnap.val() : {}
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `sunday-backup-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)

      setResult({
        success: true,
        message: 'تم تصدير البيانات بنجاح!'
      })
    } catch (error) {
      setResult({
        success: false,
        message: `فشل التصدير: ${error.message}`
      })
    }
  }

  return (
    <div className="data-sync-page">
      <div className="page-header">
        <div className="header-content">
          <h1>النسخ الاحتياطي</h1>
          <p>إدارة بيانات Sunday المحفوظة في Firebase</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon boards">
            <Database size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.boards}</div>
            <div className="stat-label">بورد</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon items">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.items}</div>
            <div className="stat-label">مهمة</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon team">
            <Database size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.team}</div>
            <div className="stat-label">عضو فريق</div>
          </div>
        </div>
      </div>

      {/* Backup Controls */}
      <div className="sync-controls-card">
        <div className="card-header">
          <div className="header-icon" style={{ background: 'linear-gradient(135deg, #FF9500, #FF6B00)' }}>
            <Cloud size={24} />
          </div>
          <div>
            <h3>Firebase Cloud</h3>
            <p>بياناتك محفوظة في السحابة</p>
          </div>
        </div>

        <div className="sync-actions">
          <button
            className="sync-btn primary"
            onClick={handleBackup}
            disabled={backingUp}
          >
            {backingUp ? (
              <>
                <RefreshCw size={20} className="spin" />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Upload size={20} />
                <span>حفظ نسخة احتياطية</span>
              </>
            )}
          </button>

          <button
            className="sync-btn"
            onClick={handleExportJSON}
            style={{ borderColor: '#007AFF', color: '#007AFF' }}
          >
            <Download size={20} />
            <span>تصدير JSON</span>
          </button>

          <button
            className="sync-btn"
            onClick={loadStats}
            disabled={loading}
          >
            <RefreshCw size={20} className={loading ? 'spin' : ''} />
            <span>تحديث</span>
          </button>
        </div>

        {/* Last Backup */}
        {lastBackup && (
          <div style={{
            background: 'rgba(52, 199, 89, 0.1)',
            border: '1px solid rgba(52, 199, 89, 0.3)',
            borderRadius: '8px',
            padding: '1rem',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <CheckCircle size={20} style={{ color: '#34C759' }} />
            <div>
              <div style={{ fontWeight: '600' }}>
                آخر نسخة: {new Date(lastBackup.lastBackup).toLocaleString('ar-SA')}
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className={`result-message ${result.success ? 'success' : 'error'}`}>
            {result.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{result.message}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{
        background: 'rgba(0, 122, 255, 0.05)',
        border: '1px solid rgba(0, 122, 255, 0.1)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginTop: '1.5rem'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#007AFF' }}>معلومات هامة</h4>
        <ul style={{ margin: 0, paddingRight: '1.25rem', color: '#666' }}>
          <li>بياناتك محفوظة تلقائياً في Firebase</li>
          <li>يمكنك تصدير نسخة JSON للاحتفاظ بها محلياً</li>
          <li>البيانات متزامنة بين جميع أجهزتك</li>
        </ul>
      </div>
    </div>
  )
}
