import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  FolderKanban,
  BarChart3,
  Calendar,
  Target,
  Zap,
  Activity
} from 'lucide-react'
import './Dashboard.css'

export default function Dashboard() {
  // Real stats from Monday.com
  const stats = [
    {
      icon: FolderKanban,
      label: 'إجمالي اللوحات',
      value: '26',
      subtitle: 'في 6 مساحات عمل',
      progress: 100,
      color: '#6161FF',
      bgColor: '#F0EFFF',
      trend: ''
    },
    {
      icon: Users,
      label: 'أعضاء الفريق',
      value: '29',
      subtitle: 'عضو نشط',
      progress: 100,
      color: '#00CA72',
      bgColor: '#E5FFF1',
      trend: ''
    },
    {
      icon: Activity,
      label: 'المهام النشطة',
      value: '800+',
      subtitle: 'مهمة في التقدم',
      progress: 75,
      color: '#FDAB3D',
      bgColor: '#FFF4E5',
      trend: ''
    },
    {
      icon: TrendingUp,
      label: 'مساحات العمل',
      value: '6',
      subtitle: 'مساحة نشطة',
      progress: 100,
      color: '#0073EA',
      bgColor: '#E3F2FF',
      trend: ''
    }
  ]

  const recentTasks = [
    {
      id: 1,
      title: 'تصميم واجهة المستخدم الرئيسية',
      workspace: 'مشروع التطبيق',
      status: 'done',
      priority: 'high',
      assignee: 'أحمد محمد',
      avatar: 'أ',
      dueDate: 'منذ ساعتين',
      progress: 100
    },
    {
      id: 2,
      title: 'تطوير API للمصادقة',
      workspace: 'Backend Development',
      status: 'working',
      priority: 'high',
      assignee: 'سارة أحمد',
      avatar: 'س',
      dueDate: 'غداً',
      progress: 65
    },
    {
      id: 3,
      title: 'اختبار الأداء والجودة',
      workspace: 'Quality Assurance',
      status: 'working',
      priority: 'medium',
      assignee: 'محمد علي',
      avatar: 'م',
      dueDate: 'خلال 3 أيام',
      progress: 40
    },
    {
      id: 4,
      title: 'كتابة الوثائق التقنية',
      workspace: 'Documentation',
      status: 'stuck',
      priority: 'low',
      assignee: 'فاطمة حسن',
      avatar: 'ف',
      dueDate: 'متأخر بيومين',
      progress: 30
    },
    {
      id: 5,
      title: 'مراجعة الكود وتحسين الأداء',
      workspace: 'Code Review',
      status: 'pending',
      priority: 'medium',
      assignee: 'خالد أحمد',
      avatar: 'خ',
      dueDate: 'الأسبوع القادم',
      progress: 0
    }
  ]

  const upcomingDeadlines = [
    { task: 'إطلاق النسخة التجريبية', date: 'خلال يومين', color: '#E44258' },
    { task: 'اجتماع مع العميل', date: 'غداً 2:00 م', color: '#FDAB3D' },
    { task: 'مراجعة السبرنت', date: 'الجمعة 10:00 ص', color: '#0073EA' }
  ]

  const teamMembers = [
    { name: 'أحمد محمد', tasks: 8, avatar: 'أ', status: 'نشط' },
    { name: 'سارة أحمد', tasks: 12, avatar: 'س', status: 'نشط' },
    { name: 'محمد علي', tasks: 6, avatar: 'م', status: 'مشغول' },
    { name: 'فاطمة حسن', tasks: 9, avatar: 'ف', status: 'نشط' },
    { name: 'خالد أحمد', tasks: 7, avatar: 'خ', status: 'متاح' }
  ]

  const getStatusConfig = (status) => {
    const configs = {
      done: { label: 'مكتملة', color: '#00CA72', bgColor: '#E5FFF1' },
      working: { label: 'قيد العمل', color: '#FDAB3D', bgColor: '#FFF4E5' },
      stuck: { label: 'معلقة', color: '#E44258', bgColor: '#FFEBEE' },
      pending: { label: 'معلقة', color: '#C4C4C4', bgColor: '#F5F5F5' }
    }
    return configs[status] || configs.pending
  }

  const getPriorityIcon = (priority) => {
    if (priority === 'high') return '🔴'
    if (priority === 'medium') return '🟡'
    return '🟢'
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>مرحباً، مشال 👋</h1>
          <p>لديك 23 مهمة نشطة و 5 مهام تحتاج متابعة عاجلة</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <BarChart3 size={18} />
            <span>التقارير</span>
          </button>
          <button className="btn btn-primary">
            <FolderKanban size={18} />
            <span>مشروع جديد</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ '--accent-color': stat.color }}>
            <div className="stat-header">
              <div className="stat-icon" style={{ backgroundColor: stat.bgColor }}>
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div className="stat-trend" style={{ color: stat.color }}>
                {stat.trend}
              </div>
            </div>
            <div className="stat-body">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-subtitle">{stat.subtitle}</div>
            </div>
            <div className="stat-progress">
              <div
                className="stat-progress-bar"
                style={{
                  width: `${stat.progress}%`,
                  backgroundColor: stat.color
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Recent Tasks - Larger Card */}
        <div className="dashboard-card tasks-card">
          <div className="card-header">
            <div className="card-title">
              <Activity size={20} />
              <h3>المهام النشطة</h3>
              <span className="badge-count">{recentTasks.length}</span>
            </div>
            <button className="btn btn-sm btn-outline">عرض الكل</button>
          </div>
          <div className="tasks-table">
            <div className="task-table-header">
              <div className="task-col-name">المهمة</div>
              <div className="task-col-status">الحالة</div>
              <div className="task-col-assignee">المسؤول</div>
              <div className="task-col-progress">التقدم</div>
              <div className="task-col-date">الموعد</div>
            </div>
            {recentTasks.map((task) => {
              const statusConfig = getStatusConfig(task.status)
              return (
                <div key={task.id} className="task-table-row">
                  <div className="task-col-name">
                    <span className="priority-icon">{getPriorityIcon(task.priority)}</span>
                    <div>
                      <div className="task-title">{task.title}</div>
                      <div className="task-workspace">{task.workspace}</div>
                    </div>
                  </div>
                  <div className="task-col-status">
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: statusConfig.bgColor,
                        color: statusConfig.color
                      }}
                    >
                      {statusConfig.label}
                    </span>
                  </div>
                  <div className="task-col-assignee">
                    <div className="assignee-avatar">{task.avatar}</div>
                    <span>{task.assignee}</span>
                  </div>
                  <div className="task-col-progress">
                    <div className="progress-container">
                      <div className="progress-bar-small">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${task.progress}%`,
                            backgroundColor: statusConfig.color
                          }}
                        />
                      </div>
                      <span className="progress-text">{task.progress}%</span>
                    </div>
                  </div>
                  <div className="task-col-date">
                    <Calendar size={14} />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Side Panel */}
        <div className="dashboard-sidebar">
          {/* Upcoming Deadlines */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <Zap size={18} />
                <h3>مواعيد قادمة</h3>
              </div>
            </div>
            <div className="deadlines-list">
              {upcomingDeadlines.map((item, index) => (
                <div key={index} className="deadline-item">
                  <div
                    className="deadline-indicator"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="deadline-content">
                    <div className="deadline-task">{item.task}</div>
                    <div className="deadline-date">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <Users size={18} />
                <h3>أعضاء الفريق</h3>
              </div>
            </div>
            <div className="team-list">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="team-member-info">
                    <div className="team-avatar">{member.avatar}</div>
                    <div>
                      <div className="team-name">{member.name}</div>
                      <div className="team-tasks">{member.tasks} مهام</div>
                    </div>
                  </div>
                  <span
                    className="team-status"
                    style={{
                      color: member.status === 'نشط' ? '#00CA72' :
                             member.status === 'مشغول' ? '#FDAB3D' : '#0073EA'
                    }}
                  >
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
