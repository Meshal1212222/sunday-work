import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { database } from '../firebase/config'
import { ref, get, set } from 'firebase/database'
import {
  Archive as ArchiveIcon,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Folder,
  FileText,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  BarChart3,
  RefreshCw
} from 'lucide-react'
import './Archive.css'

// أسماء الأشهر بالعربي
const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
]

export default function Archive() {
  const [archives, setArchives] = useState({})
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [expandedMonth, setExpandedMonth] = useState(null)
  const [expandedBoard, setExpandedBoard] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadArchives()
  }, [])

  // تحميل الأرشيف من Firebase
  const loadArchives = async () => {
    try {
      setLoading(true)
      const archiveRef = ref(database, 'archives')
      const snapshot = await get(archiveRef)

      if (snapshot.exists()) {
        setArchives(snapshot.val())
      } else {
        // إذا لم يكن هناك أرشيف، نُنشئ من البيانات الموجودة
        await buildArchiveFromBoards()
      }
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  // بناء الأرشيف من البوردات المحفوظة في Firebase
  const buildArchiveFromBoards = async () => {
    setSyncing(true)
    setError(null)

    try {
      const boardsRef = ref(database, 'boards')
      const boardsSnapshot = await get(boardsRef)

      if (!boardsSnapshot.exists()) {
        setSyncing(false)
        return
      }

      const boardsData = boardsSnapshot.val()
      const archiveData = {}

      Object.entries(boardsData).forEach(([boardId, boardData]) => {
        const boardName = boardData.name || boardData.board?.name || `Board ${boardId}`
        const columns = boardData.columns || boardData.board?.columns || []
        const groups = boardData.groups || boardData.board?.groups || []

        // استخراج المهام من الهيكل المختلف
        let items = []

        if (boardData.items_page?.items) {
          items = boardData.items_page.items
        } else if (boardData.itemsByGroup) {
          Object.values(boardData.itemsByGroup).forEach(groupItems => {
            if (Array.isArray(groupItems)) {
              items = [...items, ...groupItems]
            }
          })
        } else if (boardData.items && Array.isArray(boardData.items)) {
          items = boardData.items
        }

        items.forEach(item => {
          // تحديد التاريخ
          let createdAt
          if (item.created_at) {
            createdAt = new Date(item.created_at)
          } else if (item.createdAt) {
            createdAt = new Date(item.createdAt)
          } else {
            createdAt = new Date()
          }

          const monthKey = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`

          if (!archiveData[monthKey]) {
            archiveData[monthKey] = {
              year: createdAt.getFullYear(),
              month: createdAt.getMonth() + 1,
              monthName: ARABIC_MONTHS[createdAt.getMonth()],
              boards: {}
            }
          }

          if (!archiveData[monthKey].boards[boardId]) {
            archiveData[monthKey].boards[boardId] = {
              id: boardId,
              name: boardName,
              columns: columns,
              groups: groups,
              items: [],
              stats: {
                total: 0,
                completed: 0,
                inProgress: 0,
                stuck: 0
              }
            }
          }

          // استخراج الحالة
          let statusText = ''
          if (item.column_values) {
            const statusCol = item.column_values.find(c => c.type === 'status' || c.type === 'color')
            statusText = (statusCol?.text || '').toLowerCase()
          } else if (item.status) {
            statusText = item.status.toLowerCase()
          }

          const itemData = {
            id: item.id,
            name: item.name,
            createdAt: item.created_at || item.createdAt || new Date().toISOString(),
            groupId: item.group?.id || item.groupId,
            groupName: item.group?.title || item.groupName,
            status: statusText || 'جديد',
            columnValues: item.column_values || item.columnValues
          }

          archiveData[monthKey].boards[boardId].items.push(itemData)
          archiveData[monthKey].boards[boardId].stats.total++

          if (statusText.includes('done') || statusText.includes('مكتمل') || statusText.includes('تم')) {
            archiveData[monthKey].boards[boardId].stats.completed++
          } else if (statusText.includes('working') || statusText.includes('قيد') || statusText.includes('جاري')) {
            archiveData[monthKey].boards[boardId].stats.inProgress++
          } else if (statusText.includes('stuck') || statusText.includes('معلق')) {
            archiveData[monthKey].boards[boardId].stats.stuck++
          }
        })
      })

      // حفظ في Firebase
      const archiveRef = ref(database, 'archives')
      await set(archiveRef, {
        ...archiveData,
        lastUpdated: Date.now()
      })

      setArchives(archiveData)
      console.log('✅ تم بناء الأرشيف بنجاح')

    } catch (err) {
      setError(err.message)
    }

    setSyncing(false)
  }

  // حساب إحصائيات الشهر
  const getMonthStats = (monthData) => {
    let total = 0, completed = 0, inProgress = 0, stuck = 0

    Object.values(monthData.boards).forEach(board => {
      total += board.stats.total
      completed += board.stats.completed
      inProgress += board.stats.inProgress
      stuck += board.stats.stuck
    })

    const productivity = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, completed, inProgress, stuck, productivity }
  }

  // ترتيب الأشهر من الأحدث للأقدم
  const sortedMonths = Object.keys(archives)
    .filter(key => key !== 'lastUpdated')
    .sort((a, b) => b.localeCompare(a))

  if (loading) {
    return (
      <div className="archive-page loading">
        <RefreshCw className="spinning" size={48} />
        <p>جاري تحميل الأرشيف...</p>
      </div>
    )
  }

  return (
    <div className="archive-page">
      <div className="archive-header">
        <div className="header-title">
          <ArchiveIcon size={32} />
          <div>
            <h1>أرشيف المهام</h1>
            <p>جميع المهام منظمة حسب الشهر</p>
          </div>
        </div>

        <button
          className="sync-archive-btn"
          onClick={buildArchiveFromBoards}
          disabled={syncing}
        >
          <RefreshCw className={syncing ? 'spinning' : ''} size={20} />
          <span>{syncing ? 'جاري التحديث...' : 'تحديث الأرشيف'}</span>
        </button>
      </div>

      {error && (
        <div className="archive-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {sortedMonths.length === 0 ? (
        <div className="archive-empty">
          <Folder size={64} />
          <h2>لا توجد بيانات في الأرشيف</h2>
          <p>اضغط على "تحديث الأرشيف" لتنظيم المهام الموجودة</p>
        </div>
      ) : (
        <div className="archive-content">
          {/* قائمة الأشهر */}
          <div className="months-list">
            {sortedMonths.map(monthKey => {
              const monthData = archives[monthKey]
              const stats = getMonthStats(monthData)
              const isExpanded = expandedMonth === monthKey
              const boardsCount = Object.keys(monthData.boards).length

              return (
                <div key={monthKey} className={`month-card ${isExpanded ? 'expanded' : ''}`}>
                  <div
                    className="month-header"
                    onClick={() => setExpandedMonth(isExpanded ? null : monthKey)}
                  >
                    <div className="month-info">
                      <Calendar size={24} />
                      <div>
                        <h3>{monthData.monthName} {monthData.year}</h3>
                        <span>{boardsCount} بورد • {stats.total} مهمة</span>
                      </div>
                    </div>

                    <div className="month-stats">
                      <div className="stat completed">
                        <CheckCircle size={16} />
                        <span>{stats.completed}</span>
                      </div>
                      <div className="stat in-progress">
                        <Clock size={16} />
                        <span>{stats.inProgress}</span>
                      </div>
                      <div className="stat stuck">
                        <AlertCircle size={16} />
                        <span>{stats.stuck}</span>
                      </div>
                      <div className="productivity-badge">
                        <TrendingUp size={16} />
                        <span>{stats.productivity}%</span>
                      </div>
                    </div>

                    <ChevronDown className={`expand-icon ${isExpanded ? 'rotated' : ''}`} size={20} />
                  </div>

                  {isExpanded && (
                    <div className="month-content">
                      {/* تحليل الإنتاجية */}
                      <div className="productivity-analysis">
                        <h4><BarChart3 size={18} /> تحليل الإنتاجية</h4>
                        <div className="productivity-bars">
                          <div className="bar-item">
                            <span className="bar-label">المكتملة</span>
                            <div className="bar-track">
                              <div
                                className="bar-fill completed"
                                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="bar-value">{stats.completed}</span>
                          </div>
                          <div className="bar-item">
                            <span className="bar-label">قيد العمل</span>
                            <div className="bar-track">
                              <div
                                className="bar-fill in-progress"
                                style={{ width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="bar-value">{stats.inProgress}</span>
                          </div>
                          <div className="bar-item">
                            <span className="bar-label">معلقة</span>
                            <div className="bar-track">
                              <div
                                className="bar-fill stuck"
                                style={{ width: `${stats.total > 0 ? (stats.stuck / stats.total) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="bar-value">{stats.stuck}</span>
                          </div>
                        </div>
                      </div>

                      {/* قائمة البوردات */}
                      <div className="boards-grid">
                        {Object.values(monthData.boards).map(board => {
                          const isBoardExpanded = expandedBoard === `${monthKey}-${board.id}`

                          return (
                            <div key={board.id} className={`board-card ${isBoardExpanded ? 'expanded' : ''}`}>
                              <div
                                className="board-header"
                                onClick={() => setExpandedBoard(isBoardExpanded ? null : `${monthKey}-${board.id}`)}
                              >
                                <div className="board-info">
                                  <FileText size={20} />
                                  <div>
                                    <h4>{board.name}</h4>
                                    <span>{board.items.length} مهمة</span>
                                  </div>
                                </div>
                                <div className="board-mini-stats">
                                  <span className="completed">{board.stats.completed}</span>
                                  <span className="in-progress">{board.stats.inProgress}</span>
                                  <span className="stuck">{board.stats.stuck}</span>
                                </div>
                                <ChevronLeft className={`expand-icon ${isBoardExpanded ? 'rotated' : ''}`} size={18} />
                              </div>

                              {isBoardExpanded && (
                                <div className="board-items">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>المهمة</th>
                                        <th>المجموعة</th>
                                        <th>الحالة</th>
                                        <th>تاريخ الإنشاء</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {board.items.map(item => (
                                        <tr key={item.id}>
                                          <td>{item.name}</td>
                                          <td>{item.groupName || '-'}</td>
                                          <td>
                                            <span className={`status-badge ${
                                              item.status.includes('مكتمل') || item.status.toLowerCase().includes('done') ? 'completed' :
                                              item.status.includes('قيد') || item.status.toLowerCase().includes('working') ? 'in-progress' :
                                              item.status.includes('معلق') || item.status.toLowerCase().includes('stuck') ? 'stuck' : ''
                                            }`}>
                                              {item.status || 'جديد'}
                                            </span>
                                          </td>
                                          <td>{new Date(item.createdAt).toLocaleDateString('ar-SA')}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
