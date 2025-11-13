import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  FolderKanban
} from 'lucide-react'
import './Dashboard.css'

export default function Dashboard() {
  const stats = [
    {
      icon: CheckCircle2,
      label: 'المهام المكتملة',
      value: '24',
      change: '+12%',
      color: 'success',
      bgColor: 'var(--success-light)'
    },
    {
      icon: Clock,
      label: 'المهام قيد التنفيذ',
      value: '18',
      change: '+5%',
      color: 'info',
      bgColor: 'var(--info-light)'
    },
    {
      icon: AlertCircle,
      label: 'المهام المتأخرة',
      value: '3',
      change: '-2%',
      color: 'error',
      bgColor: 'var(--error-light)'
    },
    {
      icon: TrendingUp,
      label: 'معدل الإنجاز',
      value: '87%',
      change: '+3%',
      color: 'success',
      bgColor: 'var(--success-light)'
    }
  ]

  const recentTasks = [
    {
      id: 1,
      title: 'تصميم واجهة المستخدم الرئيسية',
      workspace: 'مشروع التطبيق',
      status: 'completed',
      assignee: 'أحمد محمد',
      dueDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'تطوير API للمصادقة',
      workspace: 'Backend',
      status: 'in-progress',
      assignee: 'سارة أحمد',
      dueDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'اختبار الأداء',
      workspace: 'QA',
      status: 'pending',
      assignee: 'محمد علي',
      dueDate: '2024-01-18'
    },
    {
      id: 4,
      title: 'كتابة الوثائق التقنية',
      workspace: 'Documentation',
      status: 'overdue',
      assignee: 'فاطمة حسن',
      dueDate: '2024-01-10'
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: 'مكتملة', class: 'badge-success' },
      'in-progress': { label: 'قيد التنفيذ', class: 'badge-info' },
      pending: { label: 'معلقة', class: 'badge-warning' },
      overdue: { label: 'متأخرة', class: 'badge-error' }
    }
    return statusConfig[status]
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>مرحباً، مشال 👋</h1>
          <p>إليك نظرة عامة على مهامك ومشاريعك</p>
        </div>
        <button className="btn btn-primary">
          <FolderKanban size={20} />
          <span>مشروع جديد</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: stat.bgColor }}
            >
              <stat.icon size={24} style={{ color: `var(--${stat.color})` }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.color}`}>
                {stat.change} من الشهر الماضي
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Recent Tasks */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>المهام الأخيرة</h3>
            <button className="btn btn-sm btn-secondary">عرض الكل</button>
          </div>
          <div className="tasks-list">
            {recentTasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-info">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">
                    <span className="task-workspace">{task.workspace}</span>
                    <span className="task-assignee">
                      <Users size={14} />
                      {task.assignee}
                    </span>
                  </div>
                </div>
                <div className="task-status">
                  <span className={`badge ${getStatusBadge(task.status).class}`}>
                    {getStatusBadge(task.status).label}
                  </span>
                  <span className="task-date">{task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Activity */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>نشاط الفريق</h3>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-avatar">أ</div>
              <div className="activity-content">
                <div className="activity-text">
                  <strong>أحمد محمد</strong> أكمل مهمة "تصميم واجهة المستخدم"
                </div>
                <div className="activity-time">منذ ساعتين</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-avatar">س</div>
              <div className="activity-content">
                <div className="activity-text">
                  <strong>سارة أحمد</strong> أضافت تعليقاً على "تطوير API"
                </div>
                <div className="activity-time">منذ 4 ساعات</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-avatar">م</div>
              <div className="activity-content">
                <div className="activity-text">
                  <strong>محمد علي</strong> بدأ العمل على "اختبار الأداء"
                </div>
                <div className="activity-time">منذ 6 ساعات</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
