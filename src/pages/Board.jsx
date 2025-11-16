import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Loader2, ExternalLink } from 'lucide-react'
import './Board.css'

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I'
const MONDAY_API_URL = 'https://api.monday.com/v2'

async function fetchBoardData(boardId) {
  // Fetch tasks with status and person columns
  const query = `
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        id
        name
        groups {
          id
          title
          color
        }
        items_page(limit: 500) {
          items {
            id
            name
            group {
              id
            }
            column_values {
              id
              title
              text
              type
              ... on StatusValue {
                label
                index
              }
              ... on PeopleValue {
                persons_and_teams {
                  id
                  kind
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(MONDAY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MONDAY_API_TOKEN
      },
      body: JSON.stringify({
        query,
        variables: { boardId: String(boardId) }
      })
    })

    const data = await response.json()

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'فشل تحميل البيانات من Monday.com')
    }

    if (!data.data || !data.data.boards || !data.data.boards[0]) {
      throw new Error('البورد غير موجود')
    }

    return data.data.boards[0]
  } catch (error) {
    throw error
  }
}

export default function Board() {
  const { id } = useParams()
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedGroups, setExpandedGroups] = useState({})
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    async function loadBoardData() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchBoardData(id)
        setBoard(data)

        // Expand all groups by default
        const groupsExpanded = {}
        data.groups.forEach(g => {
          groupsExpanded[g.id] = true
        })
        setExpandedGroups(groupsExpanded)
      } catch (err) {
        setError(err.message || 'حدث خطأ أثناء تحميل البورد')
      } finally {
        setLoading(false)
      }
    }

    loadBoardData()
  }, [id, refreshKey])

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes('done') || statusLower.includes('مكتمل') || statusLower.includes('منتهي')) return '#00CA72'
    if (statusLower.includes('working') || statusLower.includes('قيد') || statusLower.includes('جاري')) return '#FDAB3D'
    if (statusLower.includes('stuck') || statusLower.includes('معلق') || statusLower.includes('متأخر')) return '#E44258'
    if (statusLower.includes('pending') || statusLower.includes('انتظار')) return '#C4C4C4'
    return '#0073EA' // default blue
  }

  if (loading) {
    return (
      <div className="board-page">
        <div className="loading-container">
          <Loader2 size={48} className="spin" />
          <p>جاري تحميل البورد...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="board-page">
        <div className="error-container">
          <h2>❌ خطأ في التحميل</h2>
          <p>{error}</p>
          <button onClick={() => setRefreshKey(k => k + 1)} className="btn-primary">
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  if (!board) {
    return (
      <div className="board-page">
        <div className="error-container">
          <h2>❌ البورد غير موجود</h2>
        </div>
      </div>
    )
  }

  // Group items by group
  const itemsByGroup = {}
  board.items_page.items.forEach(item => {
    const groupId = item.group?.id || 'no_group'
    if (!itemsByGroup[groupId]) {
      itemsByGroup[groupId] = []
    }
    itemsByGroup[groupId].push(item)
  })

  // Count total items
  const totalItems = board.items_page.items.length

  return (
    <div className="board-page">
      <div className="board-header">
        <div>
          <h1>{board.name}</h1>
          <div className="board-stats">
            <span>📊 {totalItems} مهمة</span>
            <span>•</span>
            <span>📂 {board.groups.length} مجموعة</span>
          </div>
        </div>
        <a
          href={`https://monday.com/boards/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <ExternalLink size={20} />
          <span>فتح في Monday.com</span>
        </a>
      </div>

      <div className="board-content">
        {board.groups.map(group => {
          const groupItems = itemsByGroup[group.id] || []
          const isExpanded = expandedGroups[group.id]

          return (
            <div key={group.id} className="board-group">
              <div
                className="group-header"
                style={{ borderLeftColor: group.color }}
                onClick={() => toggleGroup(group.id)}
              >
                <div className="group-title-section">
                  {isExpanded ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                  <h3>{group.title}</h3>
                  <span className="group-count">{groupItems.length} مهام</span>
                </div>
              </div>

              {isExpanded && (
                <div className="group-items">
                  {groupItems.length === 0 ? (
                    <div className="empty-group">
                      <p>لا توجد مهام في هذه المجموعة</p>
                    </div>
                  ) : (
                    <div className="items-table">
                      <div className="table-header">
                        <div className="col-task">المهمة</div>
                        <div className="col-person">الشخص</div>
                        <div className="col-status">الحالة</div>
                      </div>
                      {groupItems.map(item => {
                        // Extract person column
                        const personCol = item.column_values.find(col => col.type === 'multiple-person' || col.type === 'people')
                        const personName = personCol?.text || '-'

                        // Extract status column
                        const statusCol = item.column_values.find(col => col.type === 'color' || col.type === 'status')
                        const statusLabel = statusCol?.text || statusCol?.label || '-'

                        return (
                          <div key={item.id} className="table-row">
                            <div className="col-task">
                              <span className="task-checkbox">☐</span>
                              <span className="task-name">{item.name}</span>
                            </div>
                            <div className="col-person">
                              {personName !== '-' ? (
                                <div className="person-tag">
                                  <span className="person-avatar">{personName.charAt(0)}</span>
                                  <span>{personName}</span>
                                </div>
                              ) : (
                                <span className="empty-cell">-</span>
                              )}
                            </div>
                            <div className="col-status">
                              {statusLabel !== '-' ? (
                                <span className="status-badge" style={{
                                  backgroundColor: getStatusColor(statusLabel)
                                }}>
                                  {statusLabel}
                                </span>
                              ) : (
                                <span className="empty-cell">-</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
