import { useState, useEffect } from 'react'
import { database } from '../firebase/config'
import { ref, set, get } from 'firebase/database'
import { RefreshCw, Check, Database, Cloud, AlertCircle } from 'lucide-react'
import './SyncAll.css'

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I'
const MONDAY_API_URL = 'https://api.monday.com/v2'

export default function SyncAll() {
  const [syncing, setSyncing] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0, currentBoard: '' })
  const [results, setResults] = useState([])
  const [allBoards, setAllBoards] = useState([])
  const [error, setError] = useState(null)
  const [step, setStep] = useState('idle') // idle, fetching-list, syncing, done

  // سحب قائمة كل البوردات من Monday
  const fetchAllBoardsList = async () => {
    const query = `
      query {
        boards(limit: 100) {
          id
          name
          items_count
          groups {
            id
            title
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
      body: JSON.stringify({ query })
    })

    const result = await response.json()
    if (result.errors) {
      throw new Error(result.errors[0].message)
    }

    return result.data.boards
  }

  // سحب بيانات بورد كامل مع المهام
  const fetchBoardWithItems = async (boardId) => {
    const query = `
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
                type
                text
                value
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
      body: JSON.stringify({ query, variables: { boardId } })
    })

    const result = await response.json()
    if (result.errors) {
      throw new Error(result.errors[0].message)
    }

    return result.data.boards[0]
  }

  // تحويل بيانات Monday إلى صيغتنا
  const transformBoardData = (mondayBoard) => {
    const board = {
      id: mondayBoard.id,
      name: mondayBoard.name,
      columns: mondayBoard.columns,
      groups: mondayBoard.groups.map(g => ({
        id: g.id,
        title: g.title
      }))
    }

    const itemsByGroup = {}
    mondayBoard.groups.forEach(group => {
      itemsByGroup[group.id] = []
    })

    const allItems = []

    mondayBoard.items_page?.items?.forEach(item => {
      const personCol = item.column_values.find(c => c.type === 'multiple-person' || c.type === 'people')
      const statusCol = item.column_values.find(c => c.type === 'status')
      const dateCol = item.column_values.find(c => c.type === 'date')

      let assignee = personCol?.text || null
      let status = statusCol?.text || 'جديدة'
      let dueDate = null

      if (dateCol?.value) {
        try {
          const dateValue = JSON.parse(dateCol.value)
          dueDate = dateValue.date || null
          if (dateValue.time) {
            dueDate = `${dateValue.date}T${dateValue.time}`
          }
        } catch (e) {}
      }

      const transformedItem = {
        id: item.id,
        name: item.name,
        boardId: mondayBoard.id,
        groupId: item.group.id,
        assignee,
        status,
        dueDate,
        columnValues: item.column_values,
        state: 'active'
      }

      if (itemsByGroup[item.group.id]) {
        itemsByGroup[item.group.id].push(transformedItem)
      }
      allItems.push(transformedItem)
    })

    return { board, itemsByGroup, allItems }
  }

  // حفظ بورد في Firebase
  const saveBoardToFirebase = async (boardId, data) => {
    const boardRef = ref(database, `boards/${boardId}`)
    await set(boardRef, {
      ...data,
      lastUpdated: Date.now()
    })
  }

  // حفظ قائمة البوردات
  const saveBoardsListToFirebase = async (boards) => {
    const listRef = ref(database, 'boardsList')
    await set(listRef, {
      boards: boards.map(b => ({
        id: b.id,
        name: b.name,
        itemsCount: b.items_count || 0
      })),
      lastUpdated: Date.now()
    })
  }

  // بدء المزامنة الكاملة
  const startFullSync = async () => {
    setSyncing(true)
    setError(null)
    setResults([])
    setStep('fetching-list')

    try {
      // 1. سحب قائمة البوردات
      console.log('📋 جاري سحب قائمة البوردات...')
      const boards = await fetchAllBoardsList()
      setAllBoards(boards)
      console.log(`✅ تم إيجاد ${boards.length} بورد`)

      // حفظ قائمة البوردات
      await saveBoardsListToFirebase(boards)

      // 2. سحب كل بورد وحفظه
      setStep('syncing')
      setProgress({ current: 0, total: boards.length, currentBoard: '' })

      for (let i = 0; i < boards.length; i++) {
        const boardInfo = boards[i]
        setProgress({ current: i + 1, total: boards.length, currentBoard: boardInfo.name })

        try {
          console.log(`📥 [${i + 1}/${boards.length}] جاري سحب: ${boardInfo.name}`)
          const fullBoard = await fetchBoardWithItems(boardInfo.id)

          if (fullBoard) {
            const { board, itemsByGroup, allItems } = transformBoardData(fullBoard)

            await saveBoardToFirebase(boardInfo.id, {
              board,
              itemsByGroup,
              itemsCount: allItems.length
            })

            setResults(prev => [...prev, {
              id: boardInfo.id,
              name: boardInfo.name,
              itemsCount: allItems.length,
              status: 'success'
            }])

            console.log(`✅ تم حفظ: ${boardInfo.name} (${allItems.length} مهمة)`)
          }
        } catch (err) {
          console.error(`❌ خطأ في ${boardInfo.name}:`, err)
          setResults(prev => [...prev, {
            id: boardInfo.id,
            name: boardInfo.name,
            status: 'error',
            error: err.message
          }])
        }

        // انتظار قصير لتجنب rate limiting
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      setStep('done')
      console.log('🎉 تمت المزامنة بنجاح!')

    } catch (err) {
      console.error('❌ خطأ في المزامنة:', err)
      setError(err.message)
      setStep('idle')
    }

    setSyncing(false)
  }

  // فحص البيانات المحفوظة
  const checkSavedData = async () => {
    try {
      const listRef = ref(database, 'boardsList')
      const snapshot = await get(listRef)

      if (snapshot.exists()) {
        const data = snapshot.val()
        setAllBoards(data.boards || [])

        // فحص كل بورد
        const checkResults = []
        for (const board of data.boards) {
          const boardRef = ref(database, `boards/${board.id}`)
          const boardSnapshot = await get(boardRef)

          if (boardSnapshot.exists()) {
            const boardData = boardSnapshot.val()
            checkResults.push({
              id: board.id,
              name: board.name,
              itemsCount: boardData.itemsCount || 0,
              lastUpdated: boardData.lastUpdated,
              status: 'saved'
            })
          } else {
            checkResults.push({
              id: board.id,
              name: board.name,
              status: 'missing'
            })
          }
        }
        setResults(checkResults)
      } else {
        setError('لا توجد بيانات محفوظة. اضغط "سحب الكل" أولاً.')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="sync-all-page">
      <div className="sync-header">
        <h1>🔄 سحب جميع بيانات Monday.com</h1>
        <p>سحب كل البوردات والمهام وحفظها في Firebase للعمل بدون اتصال</p>
      </div>

      <div className="sync-actions">
        <button
          className="sync-btn primary"
          onClick={startFullSync}
          disabled={syncing}
        >
          {syncing ? (
            <>
              <RefreshCw className="spinning" size={20} />
              <span>
                {step === 'fetching-list' ? 'جاري سحب القائمة...' :
                 `جاري المزامنة (${progress.current}/${progress.total})`}
              </span>
            </>
          ) : (
            <>
              <Cloud size={20} />
              <span>سحب الكل من Monday.com</span>
            </>
          )}
        </button>

        <button
          className="sync-btn secondary"
          onClick={checkSavedData}
          disabled={syncing}
        >
          <Database size={20} />
          <span>فحص البيانات المحفوظة</span>
        </button>
      </div>

      {error && (
        <div className="sync-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {syncing && step === 'syncing' && (
        <div className="sync-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
          <p>📥 جاري سحب: <strong>{progress.currentBoard}</strong></p>
        </div>
      )}

      {step === 'done' && (
        <div className="sync-success">
          <Check size={24} />
          <span>تمت المزامنة بنجاح! يمكنك الآن استخدام التطبيق بدون Monday.com</span>
        </div>
      )}

      {results.length > 0 && (
        <div className="sync-results">
          <h2>📋 البوردات ({results.length})</h2>
          <div className="boards-list">
            {results.map(board => (
              <div key={board.id} className={`board-item ${board.status}`}>
                <div className="board-icon">
                  {board.status === 'success' || board.status === 'saved' ? '✅' :
                   board.status === 'error' ? '❌' : '⚠️'}
                </div>
                <div className="board-info">
                  <h3>{board.name}</h3>
                  <div className="board-meta">
                    {board.itemsCount !== undefined && (
                      <span>📝 {board.itemsCount} مهمة</span>
                    )}
                    {board.lastUpdated && (
                      <span>📅 {new Date(board.lastUpdated).toLocaleString('ar-SA')}</span>
                    )}
                    {board.error && (
                      <span className="error-text">{board.error}</span>
                    )}
                  </div>
                </div>
                <a href={`/board/${board.id}`} className="view-btn">عرض</a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sync-info">
        <h3>📌 كيف يعمل:</h3>
        <ol>
          <li>اضغط <strong>"سحب الكل من Monday.com"</strong></li>
          <li>انتظر حتى تنتهي المزامنة (قد تأخذ 1-2 دقيقة)</li>
          <li>بعدها كل البيانات ستكون محفوظة في Firebase</li>
          <li>التطبيق سيعمل بدون الحاجة لـ Monday.com ✨</li>
        </ol>
      </div>
    </div>
  )
}
