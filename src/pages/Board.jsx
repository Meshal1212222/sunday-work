import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Loader2, ExternalLink, Plus } from 'lucide-react'
import './Board.css'

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I'
const MONDAY_API_URL = 'https://api.monday.com/v2'

async function fetchBoardData(boardId) {
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
              text
              type
            }
          }
        }
      }
    }
  `

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
    throw new Error(data.errors[0]?.message || 'فشل تحميل البيانات')
  }

  if (!data.data?.boards?.[0]) {
    throw new Error('البورد غير موجود')
  }

  return data.data.boards[0]
}

export default function Board() {
  const { id } = useParams()
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchBoardData(id)
        setBoard(data)
      } catch (err) {
        setError(err.message || 'حدث خطأ')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) {
    return (
      <div className="board-loading">
        <Loader2 size={48} className="spin" />
        <p>جاري التحميل...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="board-error">
        <h2>❌ خطأ</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          إعادة المحاولة
        </button>
      </div>
    )
  }

  if (!board) return null

  // Group items
  const itemsByGroup = {}
  board.items_page.items.forEach(item => {
    const gid = item.group?.id || 'other'
    if (!itemsByGroup[gid]) itemsByGroup[gid] = []
    itemsByGroup[gid].push(item)
  })

  const getStatusColor = (text) => {
    if (!text) return '#C4C4C4'
    const t = text.toLowerCase()
    if (t.includes('done') || t.includes('مكتمل')) return '#00CA72'
    if (t.includes('working') || t.includes('قيد')) return '#FDAB3D'
    if (t.includes('stuck') || t.includes('معلق')) return '#E44258'
    return '#0073EA'
  }

  return (
    <div className="monday-board">
      {/* Board Header */}
      <div className="board-top-bar">
        <div className="board-title-section">
          <h1>{board.name}</h1>
          <div className="board-meta">
            <span>{board.items_page.items.length} مهمة</span>
            <span>•</span>
            <span>{board.groups.length} مجموعة</span>
          </div>
        </div>
        <div className="board-actions">
          <a 
            href={`https://monday.com/boards/${id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="action-btn"
          >
            <ExternalLink size={16} />
            <span>فتح في Monday</span>
          </a>
        </div>
      </div>

      {/* Board Table */}
      <div className="board-table-container">
        <div className="board-table">
          {/* Table Header */}
          <div className="table-header-row">
            <div className="header-cell col-task">المهمة</div>
            <div className="header-cell col-person">المسؤول</div>
            <div className="header-cell col-status">الحالة</div>
            <div className="header-cell col-date">التاريخ</div>
          </div>

          {/* Groups */}
          {board.groups.map(group => {
            const items = itemsByGroup[group.id] || []
            
            return (
              <div key={group.id} className="table-group">
                {/* Group Header */}
                <div 
                  className="group-row"
                  style={{ borderLeftColor: group.color }}
                >
                  <div className="group-name">{group.title}</div>
                  <div className="group-count">{items.length} مهام</div>
                </div>

                {/* Group Items */}
                {items.map(item => {
                  const personCol = item.column_values.find(c => 
                    c.type === 'multiple-person' || c.type === 'people'
                  )
                  const statusCol = item.column_values.find(c => 
                    c.type === 'color' || c.type === 'status'
                  )
                  const dateCol = item.column_values.find(c => 
                    c.type === 'date'
                  )

                  const person = personCol?.text || ''
                  const status = statusCol?.text || ''
                  const date = dateCol?.text || ''

                  return (
                    <div key={item.id} className="item-row">
                      <div className="item-cell col-task">
                        <div className="task-check"></div>
                        <span className="task-text">{item.name}</span>
                      </div>
                      <div className="item-cell col-person">
                        {person ? (
                          <div className="person-pill">
                            <div className="person-avatar">{person[0]}</div>
                            <span>{person}</span>
                          </div>
                        ) : (
                          <span className="empty">-</span>
                        )}
                      </div>
                      <div className="item-cell col-status">
                        {status ? (
                          <div 
                            className="status-pill"
                            style={{ backgroundColor: getStatusColor(status) }}
                          >
                            {status}
                          </div>
                        ) : (
                          <span className="empty">-</span>
                        )}
                      </div>
                      <div className="item-cell col-date">
                        {date ? (
                          <span>{date}</span>
                        ) : (
                          <span className="empty">-</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
