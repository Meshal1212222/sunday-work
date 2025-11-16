import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Loader2, ExternalLink } from 'lucide-react'
import './Board.css'

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I'
const MONDAY_API_URL = 'https://api.monday.com/v2'

async function fetchBoardData(boardId) {
  // Simplified query - only fetch tasks and names
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
                    groupItems.map(item => (
                      <div key={item.id} className="board-item">
                        <div className="item-row">
                          <div className="item-main">
                            <div className="item-name">
                              <span>✓</span>
                              <span>{item.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
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
