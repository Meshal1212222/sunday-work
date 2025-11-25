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

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I'
const MONDAY_API_URL = 'https://api.monday.com/v2'

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
  const [selectedMonth, setSelectedMonth] = useState(null)
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
      }
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  // سحب كل البيانات من Monday وتنظيمها بالأشهر
  const syncAllData = async () => {
    setSyncing(true)
    setError(null)

    try {
      // 1. سحب كل البوردات
      const boardsQuery = `
        query {
          boards(limit: 100) {
            id
            name
            items_count
          }
        }
      `

      const boardsResponse = await fetch(MONDAY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': MONDAY_API_TOKEN
        },
        body: JSON.stringify({ query: boardsQuery })
      })

      const boardsResult = await boardsResponse.json()
      if (boardsResult.errors) throw new Error(boardsResult.errors[0].message)

      const boards = boardsResult.data.boards
      const archiveData = {}

      // 2. سحب كل مهمة من كل بورد
      for (const board of boards) {
        console.log(`📥 جاري سحب: ${board.name}`)

        const itemsQuery = `
          query ($boardId: ID!) {
            boards(ids: [$boardId]) {
              id
              name
              columns {
                id
                title
                type
              }
              groups {
                id
                title
                color
              }
              items_page(limit: 500) {
                items {
                  id
                  name
                  created_at
                  group {
                    id
                    title
                  }
                  column_values {
                    id
                    type
                    text
                    value
                  }
                }
              }
            }
          }
        `

        const itemsResponse = await fetch(MONDAY_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': MONDAY_API_TOKEN
          },
          body: JSON.stringify({ query: itemsQuery, variables: { boardId: board.id } })
        })

        const itemsResult = await itemsResponse.json()
        if (itemsResult.errors) continue

        const boardData = itemsResult.data.boards[0]
        if (!boardData) continue

        // تنظيم المهام بالأشهر
        boardData.items_page?.items?.forEach(item => {
          const createdAt = new Date(item.created_at)
          const monthKey = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`

          if (!archiveData[monthKey]) {
            archiveData[monthKey] = {
              year: createdAt.getFullYear(),
              month: createdAt.getMonth() + 1,
              monthName: ARABIC_MONTHS[createdAt.getMonth()],
              boards: {}
            }
          }

          if (!archiveData[monthKey].boards[board.id]) {
            archiveData[monthKey].boards[board.id] = {
              id: board.id,
              name: board.name,
              columns: boardData.columns,
              groups: boardData.groups,
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
          const statusCol = item.column_values.find(c => c.type === 'status' || c.type === 'color')
          const status = statusCol?.text?.toLowerCase() || ''

          const itemData = {
            id: item.id,
            name: item.name,
            createdAt: item.created_at,
            groupId: item.group?.id,
            groupName: item.group?.title,
            status: statusCol?.text || 'جديد',
            columnValues: item.column_values
          }

          archiveData[monthKey].boards[board.id].items.push(itemData)
          archiveData[monthKey].boards[board.id].stats.total++

          if (status.includes('done') || status.includes('مكتمل')) {
            archiveData[monthKey].boards[board.id].stats.completed++
          } else if (status.includes('working') || status.includes('قيد')) {
            archiveData[monthKey].boards[board.id].stats.inProgress++
          } else if (status.includes('stuck') || status.includes('معلق')) {
            archiveData[monthKey].boards[board.id].stats.stuck++
          }
        })

        // تأخير لتجنب rate limiting
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      // 3. حفظ في Firebase
      const archiveRef = ref(database, 'archives')
      await set(archiveRef, {
        ...archiveData,
        lastUpdated: Date.now()
      })

      setArchives(archiveData)
      console.log('✅ تم حفظ الأرشيف بنجاح')

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
          onClick={syncAllData}
          disabled={syncing}
        >
          <RefreshCw className={syncing ? 'spinning' : ''} size={20} />
          <span>{syncing ? 'جاري السحب...' : 'سحب كل البيانات'}</span>
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
          <p>اضغط على "سحب كل البيانات" لتحميل جميع المهام من Monday.com</p>
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
                                              {item.status}
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
