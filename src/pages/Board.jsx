import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Plus, ChevronDown, ChevronRight, Loader2, ExternalLink } from 'lucide-react'
import './Board.css'

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I'
const MONDAY_API_URL = 'https://api.monday.com/v2'

async function fetchBoardData(boardId) {
  const query = `
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        id
        name
        description
        items_count
        workspace {
          id
          name
        }
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
            group {
              id
              title
            }
            column_values {
              id
              title
              text
              type
            }
            subitems {
              id
              name
              column_values {
                title
                text
              }
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
      'Authorization': MONDAY_API_TOKEN,
      'API-Version': '2024-01'
    },
    body: JSON.stringify({
      query,
      variables: { boardId: String(boardId) }
    })
  })

  const data = await response.json()

  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'Failed to fetch board data')
  }

  return data.data.boards[0]
}

export default function Board() {
  const { id } = useParams()
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedGroups, setExpandedGroups] = useState({})
  const [expandedItems, setExpandedItems] = useState({})

  useEffect(() => {
    loadBoardData()
  }, [id])

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
      console.error('Failed to load board:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const toggleItem = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
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
          <button onClick={loadBoardData} className="btn-primary">
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

  return (
    <div className="board-page">
      <div className="board-header">
        <div>
          <div className="board-breadcrumb">
            <span>{board.workspace?.name || 'Workspace'}</span>
            <span>/</span>
            <span>{board.name}</span>
          </div>
          <h1>{board.name}</h1>
          {board.description && <p>{board.description}</p>}
          <div className="board-stats">
            <span>📊 {board.items_count} مهمة</span>
            <span>•</span>
            <span>📂 {board.groups.length} مجموعات</span>
            <span>•</span>
            <span>📋 {board.columns.length} خانة</span>
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
                    groupItems.map(item => {
                      const hasSubtasks = item.subitems && item.subitems.length > 0
                      const isItemExpanded = expandedItems[item.id]

                      return (
                        <div key={item.id} className="board-item">
                          <div className="item-row">
                            <div className="item-main">
                              {hasSubtasks && (
                                <button
                                  className="expand-btn"
                                  onClick={() => toggleItem(item.id)}
                                >
                                  {isItemExpanded ? (
                                    <ChevronDown size={16} />
                                  ) : (
                                    <ChevronRight size={16} />
                                  )}
                                </button>
                              )}
                              <div className="item-name">
                                <span>{item.name}</span>
                                {hasSubtasks && (
                                  <span className="subtask-badge">
                                    {item.subitems.length} مهمة فرعية
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="item-columns">
                              {item.column_values.slice(0, 3).map(col => (
                                col.text && (
                                  <div key={col.id} className="column-value">
                                    <span className="column-label">{col.title}:</span>
                                    <span className="column-text">{col.text}</span>
                                  </div>
                                )
                              ))}
                            </div>
                          </div>

                          {hasSubtasks && isItemExpanded && (
                            <div className="subitems">
                              {item.subitems.map(subitem => (
                                <div key={subitem.id} className="subitem-row">
                                  <div className="subitem-indicator">└─</div>
                                  <div className="subitem-name">{subitem.name}</div>
                                  <div className="subitem-columns">
                                    {subitem.column_values.slice(0, 2).map((col, idx) => (
                                      col.text && (
                                        <span key={idx} className="subitem-value">
                                          {col.text}
                                        </span>
                                      )
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })
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
