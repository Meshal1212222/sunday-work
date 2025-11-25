import { useState, useEffect, useMemo } from 'react'
import { database } from '../firebase/config'
import { ref, get, onValue } from 'firebase/database'
import {
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  RefreshCw,
  Target,
  Award,
  Zap,
  PieChart,
  Download
} from 'lucide-react'
import './Performance.css'

export default function Performance() {
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState('all')
  const [selectedEmployee, setSelectedEmployee] = useState('all')
  const [employees, setEmployees] = useState([])
  const [boards, setBoards] = useState([])
  const [rawStats, setRawStats] = useState(null)

  useEffect(() => {
    loadAllData()
  }, [])

  // تحميل البيانات من Firebase
  const loadAllData = async () => {
    try {
      setLoading(true)

      // تحميل إحصائيات الأداء المحفوظة
      const performanceRef = ref(database, 'performance')
      const perfSnapshot = await get(performanceRef)

      if (perfSnapshot.exists()) {
        const perfData = perfSnapshot.val()
        setRawStats({
          ...perfData.summary,
          boardsData: perfData.boards
        })
        setBoards(Object.values(perfData.boards || {}).map(b => ({ id: b.id, name: b.name })))

        // استخراج الموظفين
        const allEmployees = new Set()
        Object.values(perfData.boards || {}).forEach(board => {
          board.items?.forEach(item => {
            if (item.assignee && item.assignee !== 'غير معين') {
              item.assignee.split(',').forEach(name => allEmployees.add(name.trim()))
            }
          })
        })
        setEmployees(Array.from(allEmployees))
        setLoading(false)
        return
      }

      // إذا لم توجد إحصائيات محفوظة، حمّل من boards مباشرة
      const boardsRef = ref(database, 'boards')
      const boardsSnapshot = await get(boardsRef)

      if (boardsSnapshot.exists()) {
        const boardsData = boardsSnapshot.val()
        processFirebaseData(boardsData)
      }

      setLoading(false)
    } catch (err) {
      console.error('Error loading data:', err)
      setLoading(false)
    }
  }

  // معالجة بيانات Firebase وتحويلها لإحصائيات
  const processFirebaseData = (boardsData) => {
    const processedData = {}
    const allEmployees = new Set()
    let totalTasks = 0, completedTasks = 0, inProgressTasks = 0, stuckTasks = 0

    Object.entries(boardsData).forEach(([boardId, boardData]) => {
      const boardName = boardData.name || boardData.board?.name || `Board ${boardId}`
      const boardStats = {
        id: boardId,
        name: boardName,
        total: 0,
        completed: 0,
        inProgress: 0,
        stuck: 0,
        items: []
      }

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
        // استخراج الحالة
        let statusText = ''
        if (item.column_values) {
          const statusCol = item.column_values.find(c =>
            c.type === 'status' || c.type === 'color' || c.id?.includes('status')
          )
          statusText = (statusCol?.text || '').toLowerCase()
        } else if (item.status) {
          statusText = item.status.toLowerCase()
        }

        // استخراج الشخص المسؤول
        let assigneeName = 'غير معين'
        if (item.column_values) {
          const personCol = item.column_values.find(c =>
            c.type === 'multiple-person' || c.type === 'person' || c.type === 'people'
          )
          if (personCol?.text) {
            assigneeName = personCol.text
          } else if (personCol?.value) {
            try {
              const parsed = JSON.parse(personCol.value)
              if (parsed.personsAndTeams) {
                const names = parsed.personsAndTeams.map(p => p.name).filter(Boolean)
                if (names.length > 0) assigneeName = names.join(', ')
              }
            } catch {}
          }
        } else if (item.assignee) {
          assigneeName = item.assignee
        }

        if (assigneeName !== 'غير معين') {
          assigneeName.split(',').forEach(name => {
            allEmployees.add(name.trim())
          })
        }

        boardStats.total++
        totalTasks++

        if (statusText.includes('done') || statusText.includes('مكتمل') || statusText.includes('تم')) {
          boardStats.completed++
          completedTasks++
        } else if (statusText.includes('working') || statusText.includes('قيد') || statusText.includes('جاري')) {
          boardStats.inProgress++
          inProgressTasks++
        } else if (statusText.includes('stuck') || statusText.includes('معلق') || statusText.includes('متوقف')) {
          boardStats.stuck++
          stuckTasks++
        }

        boardStats.items.push({
          id: item.id,
          name: item.name,
          status: statusText || 'جديد',
          assignee: assigneeName,
          createdAt: item.created_at
        })
      })

      if (boardStats.total > 0) {
        processedData[boardId] = boardStats
      }
    })

    setRawStats({
      total: totalTasks,
      completed: completedTasks,
      inProgress: inProgressTasks,
      stuck: stuckTasks,
      productivity: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      boardsData: processedData
    })

    setBoards(Object.values(processedData).map(b => ({ id: b.id, name: b.name })))
    setEmployees(Array.from(allEmployees))
  }

  // إعادة تحميل البيانات من Firebase
  const refreshData = async () => {
    setSyncing(true)
    await loadAllData()
    setSyncing(false)
  }

  // حساب الإحصائيات المفلترة
  const filteredStats = useMemo(() => {
    if (!rawStats?.boardsData) return rawStats

    let total = 0, completed = 0, inProgress = 0, stuck = 0
    const employeeStats = {}
    const filteredBoards = []

    Object.values(rawStats.boardsData).forEach(board => {
      if (selectedBoard !== 'all' && board.id !== selectedBoard) return

      let boardTotal = 0, boardCompleted = 0, boardInProgress = 0, boardStuck = 0

      board.items?.forEach(item => {
        // فلترة بالموظف
        if (selectedEmployee !== 'all' && !item.assignee?.includes(selectedEmployee)) return

        const statusLower = item.status?.toLowerCase() || ''

        boardTotal++
        total++

        if (statusLower.includes('done') || statusLower.includes('مكتمل') || statusLower.includes('تم')) {
          boardCompleted++
          completed++
        } else if (statusLower.includes('working') || statusLower.includes('قيد') || statusLower.includes('جاري')) {
          boardInProgress++
          inProgress++
        } else if (statusLower.includes('stuck') || statusLower.includes('معلق')) {
          boardStuck++
          stuck++
        }

        // إحصائيات الموظفين
        const assignees = item.assignee?.split(',') || ['غير معين']
        assignees.forEach(emp => {
          const name = emp.trim()
          if (!employeeStats[name]) {
            employeeStats[name] = { total: 0, completed: 0, inProgress: 0, stuck: 0 }
          }
          employeeStats[name].total++
          if (statusLower.includes('done') || statusLower.includes('مكتمل')) {
            employeeStats[name].completed++
          }
        })
      })

      filteredBoards.push({
        ...board,
        total: boardTotal,
        completed: boardCompleted,
        inProgress: boardInProgress,
        stuck: boardStuck,
        productivity: boardTotal > 0 ? Math.round((boardCompleted / boardTotal) * 100) : 0
      })
    })

    // ترتيب الموظفين حسب الإنتاجية
    const topEmployees = Object.entries(employeeStats)
      .filter(([name]) => name !== 'غير معين')
      .map(([name, stats]) => ({
        name,
        ...stats,
        productivity: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
      }))
      .sort((a, b) => b.productivity - a.productivity)
      .slice(0, 10)

    return {
      total,
      completed,
      inProgress,
      stuck,
      productivity: total > 0 ? Math.round((completed / total) * 100) : 0,
      topEmployees,
      topBoards: filteredBoards.sort((a, b) => b.total - a.total)
    }
  }, [rawStats, selectedBoard, selectedEmployee])

  if (loading) {
    return (
      <div className="performance-page loading">
        <RefreshCw className="spinning" size={48} />
        <p>جاري تحميل البيانات...</p>
      </div>
    )
  }

  const stats = filteredStats || { total: 0, completed: 0, inProgress: 0, stuck: 0, productivity: 0, topEmployees: [], topBoards: [] }

  return (
    <div className="performance-page">
      {/* Header */}
      <div className="performance-header">
        <div className="header-title">
          <BarChart3 size={32} />
          <div>
            <h1>لوحة مراقبة الأداء</h1>
            <p>تحليل شامل لإنتاجية الفريق والمشاريع</p>
          </div>
        </div>

        {/* Filters */}
        <div className="performance-filters">
          <div className="filter-group">
            <Filter size={16} />
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
            >
              <option value="all">كل البوردات</option>
              {boards.map(board => (
                <option key={board.id} value={board.id}>{board.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <Users size={16} />
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="all">كل الموظفين</option>
              {employees.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
          </div>

          <button
            className="sync-btn"
            onClick={refreshData}
            disabled={syncing}
          >
            {syncing ? <RefreshCw className="spinning" size={18} /> : <RefreshCw size={18} />}
            <span>{syncing ? 'جاري التحديث...' : 'تحديث البيانات'}</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="overview-card total">
          <div className="card-icon">
            <Target size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{stats.total}</span>
            <span className="card-label">إجمالي المهام</span>
          </div>
        </div>

        <div className="overview-card completed">
          <div className="card-icon">
            <CheckCircle size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{stats.completed}</span>
            <span className="card-label">مكتملة</span>
          </div>
        </div>

        <div className="overview-card in-progress">
          <div className="card-icon">
            <Clock size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{stats.inProgress}</span>
            <span className="card-label">قيد العمل</span>
          </div>
        </div>

        <div className="overview-card stuck">
          <div className="card-icon">
            <AlertCircle size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{stats.stuck}</span>
            <span className="card-label">معلقة</span>
          </div>
        </div>

        <div className="overview-card productivity">
          <div className="card-icon">
            <Zap size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{stats.productivity}%</span>
            <span className="card-label">الإنتاجية</span>
          </div>
          <div className="productivity-ring">
            <svg viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray={`${stats.productivity}, 100`}
              />
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="performance-grid">
        {/* Top Employees */}
        <div className="performance-section employees-section">
          <div className="section-header">
            <Award size={20} />
            <h2>أفضل الموظفين</h2>
          </div>
          <div className="employees-list">
            {stats.topEmployees?.length === 0 ? (
              <p className="empty-message">لا توجد بيانات</p>
            ) : (
              stats.topEmployees?.map((emp, index) => (
                <div key={emp.name} className="employee-item">
                  <div className="employee-rank">
                    {index < 3 ? (
                      <span className={`medal medal-${index + 1}`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                    ) : (
                      <span className="rank-number">{index + 1}</span>
                    )}
                  </div>
                  <div className="employee-info">
                    <span className="employee-name">{emp.name}</span>
                    <div className="employee-stats">
                      <span className="completed">{emp.completed} مكتملة</span>
                      <span className="total">من {emp.total}</span>
                    </div>
                  </div>
                  <div className="employee-productivity">
                    <span className="productivity-value">{emp.productivity}%</span>
                    <div className="mini-progress">
                      <div
                        className="mini-progress-fill"
                        style={{ width: `${emp.productivity}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Boards Performance */}
        <div className="performance-section boards-section">
          <div className="section-header">
            <PieChart size={20} />
            <h2>أداء البوردات</h2>
          </div>
          <div className="boards-list">
            {stats.topBoards?.length === 0 ? (
              <p className="empty-message">لا توجد بيانات</p>
            ) : (
              stats.topBoards?.map(board => (
                <div key={board.id} className="board-item">
                  <div className="board-name">{board.name}</div>
                  <div className="board-progress">
                    <div className="stacked-bar">
                      <div
                        className="bar-segment completed"
                        style={{ width: `${board.total > 0 ? (board.completed / board.total) * 100 : 0}%` }}
                        title={`مكتملة: ${board.completed}`}
                      />
                      <div
                        className="bar-segment in-progress"
                        style={{ width: `${board.total > 0 ? (board.inProgress / board.total) * 100 : 0}%` }}
                        title={`قيد العمل: ${board.inProgress}`}
                      />
                      <div
                        className="bar-segment stuck"
                        style={{ width: `${board.total > 0 ? (board.stuck / board.total) * 100 : 0}%` }}
                        title={`معلقة: ${board.stuck}`}
                      />
                    </div>
                  </div>
                  <div className="board-numbers">
                    <span>{board.completed}/{board.total}</span>
                    <span className="productivity">{board.productivity}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
