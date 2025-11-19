import { useState, useEffect } from 'react'
import { Download, Archive, Database, RefreshCw, Trash2, CheckCircle, AlertCircle, Clock, FolderOpen, Cloud, Upload } from 'lucide-react'
import localDataStore from '../services/localDataStore'
import sundayDataStore from '../services/sundayDataStore'
import './DataSync.css'

export default function DataSync() {
  const [syncing, setSyncing] = useState(false)
  const [stats, setStats] = useState(null)
  const [syncStatus, setSyncStatus] = useState(null)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('overview') // overview, archived-boards, archived-items

  // Firebase Backup states
  const [backingUp, setBackingUp] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [backupInfo, setBackupInfo] = useState(null)
  const [firebaseResult, setFirebaseResult] = useState(null)

  useEffect(() => {
    loadStats()
    loadSyncStatus()
    loadBackupInfo()

    // تحديث حالة المزامنة كل ثانية إذا كانت قيد التنفيذ
    const interval = setInterval(() => {
      const status = localDataStore.getSyncStatus()
      if (status && status.status === 'in_progress') {
        setSyncStatus(status)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const loadStats = () => {
    const currentStats = localDataStore.getStats()
    setStats(currentStats)
  }

  const loadSyncStatus = () => {
    const status = localDataStore.getSyncStatus()
    setSyncStatus(status)
  }

  const loadBackupInfo = async () => {
    const info = await sundayDataStore.getBackupInfo()
    if (info.success) {
      setBackupInfo(info.metadata)
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    setResult(null)

    try {
      const syncResult = await localDataStore.syncAllDataFromMonday()

      if (syncResult.success) {
        setResult({
          success: true,
          message: `تم سحب ${syncResult.summary.total} مهمة من ${syncResult.summary.boards + syncResult.summary.archivedBoards} بورد بنجاح! 🎉`
        })
        loadStats()
        loadSyncStatus()
      } else {
        setResult({
          success: false,
          message: `فشل السحب: ${syncResult.error}`
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `خطأ: ${error.message}`
      })
    } finally {
      setSyncing(false)
    }
  }

  const handleClearData = () => {
    if (confirm('⚠️ هل أنت متأكد من حذف كل البيانات المحفوظة؟')) {
      const result = localDataStore.clearAll()
      if (result.success) {
        setResult({
          success: true,
          message: 'تم مسح كل البيانات المحفوظة ✅'
        })
        loadStats()
        setSyncStatus(null)
      }
    }
  }

  // Firebase Backup handlers
  const handleFirebaseBackup = async () => {
    setBackingUp(true)
    setFirebaseResult(null)

    try {
      const result = await sundayDataStore.manualBackupToFirebase()

      if (result.success) {
        setFirebaseResult({
          success: true,
          message: `✅ تم النسخ الاحتياطي إلى Firebase بنجاح! (${result.duration})`
        })
        loadBackupInfo()
      } else {
        setFirebaseResult({
          success: false,
          message: `❌ فشل النسخ الاحتياطي: ${result.error}`
        })
      }
    } catch (error) {
      setFirebaseResult({
        success: false,
        message: `❌ خطأ: ${error.message}`
      })
    } finally {
      setBackingUp(false)
    }
  }

  const handleFirebaseRestore = async () => {
    if (!confirm('⚠️ هل أنت متأكد من استرجاع البيانات من Firebase؟ سيتم استبدال البيانات المحلية الحالية.')) {
      return
    }

    setRestoring(true)
    setFirebaseResult(null)

    try {
      const result = await sundayDataStore.manualRestoreFromFirebase()

      if (result.success) {
        setFirebaseResult({
          success: true,
          message: `✅ تم الاسترجاع من Firebase بنجاح! (${result.duration})`
        })
        loadStats()
        loadBackupInfo()
        // إعادة تحميل الصفحة لتحديث البيانات
        setTimeout(() => window.location.reload(), 1500)
      } else {
        setFirebaseResult({
          success: false,
          message: `❌ فشل الاسترجاع: ${result.error}`
        })
      }
    } catch (error) {
      setFirebaseResult({
        success: false,
        message: `❌ خطأ: ${error.message}`
      })
    } finally {
      setRestoring(false)
    }
  }

  const archivedBoards = localDataStore.getArchivedBoards()
  const archivedItems = localDataStore.getArchivedItems()

  return (
    <div className="data-sync-page">
      <div className="page-header">
        <div className="header-content">
          <h1>📦 إدارة البيانات والأرشيف</h1>
          <p>سحب وحفظ نسخة كاملة من Monday.com محلياً</p>
        </div>
      </div>

      {/* Sync Controls */}
      <div className="sync-controls-card">
        <div className="card-header">
          <div className="header-icon">
            <Database size={24} />
          </div>
          <div>
            <h3>المزامنة مع Monday.com</h3>
            <p>سحب كل البوردات والمهام (النشطة والمؤرشفة)</p>
          </div>
        </div>

        <div className="sync-actions">
          <button
            className="sync-btn primary"
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? (
              <>
                <RefreshCw size={20} className="spin" />
                <span>جاري السحب...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>سحب البيانات الآن</span>
              </>
            )}
          </button>

          <button
            className="sync-btn danger"
            onClick={handleClearData}
            disabled={syncing}
          >
            <Trash2 size={20} />
            <span>مسح البيانات المحفوظة</span>
          </button>
        </div>

        {/* Progress */}
        {syncStatus && syncStatus.status === 'in_progress' && (
          <div className="sync-progress">
            <div className="progress-header">
              <Clock size={16} />
              <span>جاري المزامنة...</span>
            </div>
            <div className="progress-stats">
              <div className="progress-stat">
                <span className="label">Workspaces:</span>
                <span className="value">{syncStatus.progress.workspaces}</span>
              </div>
              <div className="progress-stat">
                <span className="label">Boards:</span>
                <span className="value">{syncStatus.progress.boards}</span>
              </div>
              <div className="progress-stat">
                <span className="label">Items:</span>
                <span className="value">{syncStatus.progress.items}</span>
              </div>
              <div className="progress-stat">
                <span className="label">Archived:</span>
                <span className="value">{syncStatus.progress.archived_items}</span>
              </div>
            </div>
          </div>
        )}

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

      {/* Firebase Backup Controls */}
      <div className="sync-controls-card">
        <div className="card-header">
          <div className="header-icon" style={{ background: 'linear-gradient(135deg, #FF9500, #FF6B00)' }}>
            <Cloud size={24} />
          </div>
          <div>
            <h3>النسخ الاحتياطي السحابي (Firebase)</h3>
            <p>نسخ احتياطي تلقائي ويدوي إلى Firebase Firestore</p>
          </div>
        </div>

        <div className="sync-actions">
          <button
            className="sync-btn primary"
            onClick={handleFirebaseBackup}
            disabled={backingUp || restoring}
            style={{ background: '#FF9500', borderColor: '#FF9500' }}
          >
            {backingUp ? (
              <>
                <RefreshCw size={20} className="spin" />
                <span>جاري النسخ الاحتياطي...</span>
              </>
            ) : (
              <>
                <Upload size={20} />
                <span>نسخ احتياطي الآن</span>
              </>
            )}
          </button>

          <button
            className="sync-btn"
            onClick={handleFirebaseRestore}
            disabled={backingUp || restoring}
            style={{ borderColor: '#007AFF', color: '#007AFF' }}
          >
            {restoring ? (
              <>
                <RefreshCw size={20} className="spin" />
                <span>جاري الاسترجاع...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>استرجاع من Firebase</span>
              </>
            )}
          </button>
        </div>

        {/* Backup Info */}
        {backupInfo && (
          <div className="backup-info" style={{
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
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                آخر نسخة احتياطية: {new Date(backupInfo.lastBackup).toLocaleString('ar-SA')}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#8E8E93' }}>
                {backupInfo.boardsCount} بورد • {backupInfo.itemsCount} مهمة • {backupInfo.workspacesCount} workspace
              </div>
            </div>
          </div>
        )}

        {/* Firebase Result Message */}
        {firebaseResult && (
          <div className={`result-message ${firebaseResult.success ? 'success' : 'error'}`}>
            {firebaseResult.success ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{firebaseResult.message}</span>
          </div>
        )}

        <div style={{
          fontSize: '0.8125rem',
          color: '#8E8E93',
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'rgba(0, 122, 255, 0.05)',
          borderRadius: '6px',
          border: '1px solid rgba(0, 122, 255, 0.1)'
        }}>
          💡 <strong>النسخ الاحتياطي التلقائي:</strong> يتم حفظ بياناتك تلقائياً في Firebase عند كل تعديل (إضافة/تحديث/حذف مهام)
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon boards">
              <Database size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{stats.boards}</div>
              <div className="stat-label">بورد نشط</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon archived">
              <Archive size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{stats.archivedBoards}</div>
              <div className="stat-label">بورد مؤرشف</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon items">
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{stats.items}</div>
              <div className="stat-label">مهمة نشطة</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon archived">
              <Archive size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{stats.archivedItems}</div>
              <div className="stat-label">مهمة مؤرشفة</div>
            </div>
          </div>
        </div>
      )}

      {/* Last Sync Info */}
      {syncStatus && syncStatus.completedAt && (
        <div className="last-sync-info">
          <Clock size={16} />
          <span>
            آخر مزامنة: {new Date(syncStatus.completedAt).toLocaleString('ar-SA')}
            {syncStatus.duration && ` (${syncStatus.duration})`}
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="archive-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FolderOpen size={18} />
          <span>نظرة عامة</span>
        </button>
        <button
          className={`tab ${activeTab === 'archived-boards' ? 'active' : ''}`}
          onClick={() => setActiveTab('archived-boards')}
        >
          <Archive size={18} />
          <span>البوردات المؤرشفة ({archivedBoards.length})</span>
        </button>
        <button
          className={`tab ${activeTab === 'archived-items' ? 'active' : ''}`}
          onClick={() => setActiveTab('archived-items')}
        >
          <Archive size={18} />
          <span>المهام المؤرشفة</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <h3>📊 إحصائيات البيانات</h3>
            <p>البيانات محفوظة محلياً في متصفحك ويمكنك الوصول إليها في أي وقت حتى بدون اتصال بالإنترنت.</p>

            {stats && stats.total > 0 ? (
              <div className="overview-stats">
                <div className="overview-stat-item">
                  <span className="label">إجمالي البوردات:</span>
                  <span className="value">{stats.boards + stats.archivedBoards}</span>
                </div>
                <div className="overview-stat-item">
                  <span className="label">إجمالي المهام:</span>
                  <span className="value">{stats.total}</span>
                </div>
                <div className="overview-stat-item">
                  <span className="label">حالة المزامنة:</span>
                  <span className={`status ${stats.syncStatus}`}>{
                    stats.syncStatus === 'completed' ? '✅ مكتملة' :
                    stats.syncStatus === 'in_progress' ? '⏳ قيد التنفيذ' :
                    stats.syncStatus === 'failed' ? '❌ فشلت' :
                    '⚪ لم تتم بعد'
                  }</span>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <Database size={48} style={{ opacity: 0.3 }} />
                <p>لا توجد بيانات محفوظة</p>
                <p>اضغط "سحب البيانات الآن" لبدء المزامنة</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'archived-boards' && (
          <div className="archived-boards-content">
            <h3>📦 البوردات المؤرشفة</h3>
            {archivedBoards.length > 0 ? (
              <div className="boards-list">
                {archivedBoards.map(board => (
                  <div key={board.id} className="board-card archived">
                    <div className="board-header">
                      <div className="board-icon">📋</div>
                      <div className="board-info">
                        <h4>{board.name}</h4>
                        <p>{board.description || 'لا يوجد وصف'}</p>
                      </div>
                      <div className="board-badge archived">مؤرشف</div>
                    </div>
                    <div className="board-meta">
                      <span>📊 {board.items_count} مهمة</span>
                      <span>📁 {board.groups?.length || 0} مجموعة</span>
                      <span>🏢 {board.workspace?.name || 'غير محدد'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Archive size={48} style={{ opacity: 0.3 }} />
                <p>لا توجد بوردات مؤرشفة</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'archived-items' && (
          <div className="archived-items-content">
            <h3>📦 المهام المؤرشفة</h3>
            {Object.keys(archivedItems).length > 0 ? (
              <div className="archived-items-by-board">
                {Object.entries(archivedItems).map(([boardId, items]) => {
                  if (items.length === 0) return null

                  const board = archivedBoards.find(b => b.id === boardId) ||
                                localDataStore.getBoards().find(b => b.id === boardId)

                  return (
                    <div key={boardId} className="board-items-group">
                      <h4>
                        📋 {board?.name || `Board ${boardId}`}
                        <span className="items-count">({items.length} مهمة)</span>
                      </h4>
                      <div className="items-list">
                        {items.map(item => (
                          <div key={item.id} className="item-card archived">
                            <div className="item-name">{item.name}</div>
                            <div className="item-meta">
                              <span>👤 {item.creator?.name || 'غير محدد'}</span>
                              <span>📅 {new Date(item.created_at).toLocaleDateString('ar-SA')}</span>
                              <span className="archived-badge">مؤرشف</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="empty-state">
                <Archive size={48} style={{ opacity: 0.3 }} />
                <p>لا توجد مهام مؤرشفة</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
