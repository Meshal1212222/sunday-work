import { useState, useEffect, useMemo } from 'react'
import { database } from '../firebase/config'
import { ref, get } from 'firebase/database'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Calendar,
  RefreshCw,
  Target,
  Award,
  Zap,
  PieChart
} from 'lucide-react'
import './Performance.css'

export default function Performance() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ boards: {}, archives: {} })
  const [selectedBoard, setSelectedBoard] = useState('all')
  const [selectedEmployee, setSelectedEmployee] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [employees, setEmployees] = useState([])
  const [boards, setBoards] = useState([])

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    try {
      setLoading(true)

      // تحميل البوردات
      const boardsRef = ref(database, 'boards')
      const boardsSnapshot = await get(boardsRef)
      const boardsData = boardsSnapshot.exists() ? boardsSnapshot.val() : {}

      // تحميل الأرشيف
      const archivesRef = ref(database, 'archives')
      const archivesSnapshot = await get(archivesRef)
      const archivesData = archivesSnapshot.exists() ? archivesSnapshot.val() : {}

      setData({ boards: boardsData, archives: archivesData })

      // استخراج قائمة البوردات
      const boardsList = Object.entries(boardsData)
        .filter(([key]) => key !== 'lastUpdated')
        .map(([id, data]) => ({
          id,
          name: data.board?.name || `بورد ${id}`
        }))
      setBoards(boardsList)

      // استخراج قائمة الموظفين
      const employeesSet = new Set()
      Object.values(boardsData).forEach(boardData => {
        if (boardData.itemsByGroup) {
          Object.values(boardData.itemsByGroup).forEach(items => {
            if (Array.isArray(items)) {
              items.forEach(item => {
                const personCol = item.columnValues?.find(c =>
                  c.type === 'multiple-person' || c.type === 'person'
                )
                if (personCol?.text) {
                  employeesSet.add(personCol.text)
                }
              })
            }
          })
        }
      })
      setEmployees(Array.from(employeesSet))

      setLoading(false)
    } catch (err) {
      console.error('Error loading data:', err)
      setLoading(false)
    }
  }

  // حساب الإحصائيات المفلترة
  const stats = useMemo(() => {
    let total = 0, completed = 0, inProgress = 0, stuck = 0
    const employeeStats = {}
    const boardStats = {}
    const monthlyTrend = {}

    // معالجة البوردات الحالية
    Object.entries(data.boards).forEach(([boardId, boardData]) => {
      if (boardId === 'lastUpdated') return
      if (selectedBoard !== 'all' && boardId !== selectedBoard) return

      const boardName = boardData.board?.name || `بورد ${boardId}`
      if (!boardStats[boardId]) {
        boardStats[boardId] = { name: boardName, total: 0, completed: 0, inProgress: 0, stuck: 0 }
      }

      if (boardData.itemsByGroup) {
        Object.values(boardData.itemsByGroup).forEach(items => {
          if (Array.isArray(items)) {
            items.forEach(item => {
              // فلترة بالموظف
              const personCol = item.columnValues?.find(c =>
                c.type === 'multiple-person' || c.type === 'person'
              )
              const assignee = personCol?.text || 'غير معين'

              if (selectedEmployee !== 'all' && assignee !== selectedEmployee) return

              // إحصائيات الموظف
              if (!employeeStats[assignee]) {
                employeeStats[assignee] = { total: 0, completed: 0, inProgress: 0, stuck: 0 }
              }

              const statusCol = item.columnValues?.find(c => c.type === 'status' || c.type === 'color')
              const status = statusCol?.text?.toLowerCase() || ''

              total++
              boardStats[boardId].total++
              employeeStats[assignee].total++

              if (status.includes('done') || status.includes('مكتمل')) {
                completed++
                boardStats[boardId].completed++
                employeeStats[assignee].completed++
              } else if (status.includes('working') || status.includes('قيد')) {
                inProgress++
                boardStats[boardId].inProgress++
                employeeStats[assignee].inProgress++
              } else if (status.includes('stuck') || status.includes('معلق')) {
                stuck++
                boardStats[boardId].stuck++
                employeeStats[assignee].stuck++
              }
            })
          }
        })
      }
    })

    // معالجة الأرشيف للـ trend
    Object.entries(data.archives).forEach(([monthKey, monthData]) => {
      if (monthKey === 'lastUpdated') return

      let monthTotal = 0, monthCompleted = 0

      if (monthData.boards) {
        Object.values(monthData.boards).forEach(board => {
          if (selectedBoard !== 'all' && board.id !== selectedBoard) return
          monthTotal += board.stats?.total || 0
          monthCompleted += board.stats?.completed || 0
        })
      }

      if (monthTotal > 0) {
        monthlyTrend[monthKey] = {
          month: monthData.monthName,
          year: monthData.year,
          total: monthTotal,
          completed: monthCompleted,
          productivity: Math.round((monthCompleted / monthTotal) * 100)
        }
      }
    })

    const productivity = total > 0 ? Math.round((completed / total) * 100) : 0

    // ترتيب الموظفين حسب الإنتاجية
    const topEmployees = Object.entries(employeeStats)
      .map(([name, stats]) => ({
        name,
        ...stats,
        productivity: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
      }))
      .sort((a, b) => b.productivity - a.productivity)
      .slice(0, 10)

    // ترتيب البوردات حسب المهام
    const topBoards = Object.entries(boardStats)
      .map(([id, stats]) => ({
        id,
        ...stats,
        productivity: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
      }))
      .sort((a, b) => b.total - a.total)

    return {
      total,
      completed,
      inProgress,
      stuck,
      productivity,
      topEmployees,
      topBoards,
      monthlyTrend: Object.values(monthlyTrend).sort((a, b) => {
        const dateA = `${a.year}-${a.month}`
        const dateB = `${b.year}-${b.month}`
        return dateB.localeCompare(dateA)
      })
    }
  }, [data, selectedBoard, selectedEmployee])

  if (loading) {
    return (
      <div className="performance-page loading">
        <RefreshCw className="spinning" size={48} />
        <p>جاري تحميل البيانات...</p>
      </div>
    )
  }

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

          <button className="refresh-btn" onClick={loadAllData}>
            <RefreshCw size={18} />
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
            {stats.topEmployees.length === 0 ? (
              <p className="empty-message">لا توجد بيانات</p>
            ) : (
              stats.topEmployees.map((emp, index) => (
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
            {stats.topBoards.length === 0 ? (
              <p className="empty-message">لا توجد بيانات</p>
            ) : (
              stats.topBoards.map(board => (
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

        {/* Monthly Trend */}
        <div className="performance-section trend-section">
          <div className="section-header">
            <TrendingUp size={20} />
            <h2>الأداء الشهري</h2>
          </div>
          <div className="trend-chart">
            {stats.monthlyTrend.length === 0 ? (
              <p className="empty-message">لا توجد بيانات. اذهب للأرشيف لسحب البيانات.</p>
            ) : (
              stats.monthlyTrend.slice(0, 6).map((month, index) => (
                <div key={`${month.year}-${month.month}`} className="trend-bar">
                  <div className="trend-bar-container">
                    <div
                      className="trend-bar-fill"
                      style={{ height: `${month.productivity}%` }}
                    />
                  </div>
                  <div className="trend-label">
                    <span className="month-name">{month.month}</span>
                    <span className="month-value">{month.productivity}%</span>
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
