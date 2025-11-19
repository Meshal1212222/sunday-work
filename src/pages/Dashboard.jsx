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
        <div className="dashboard-card" style={{flex: 1, textAlign: 'center', padding: '60px 20px'}}>
          <FolderKanban size={64} style={{color: '#C4C4C4', margin: '0 auto 20px'}} />
          <h3 style={{color: '#323338', marginBottom: '10px'}}>مرحباً بك في Sunday</h3>
          <p style={{color: '#676879', marginBottom: '30px'}}>
            جميع بياناتك من Monday.com متصلة ومتزامنة
          </p>
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/workspaces" className="btn btn-primary" style={{textDecoration: 'none'}}>
              <FolderKanban size={18} />
              <span>عرض مساحات العمل</span>
            </a>
            <a href="/team" className="btn btn-secondary" style={{textDecoration: 'none'}}>
              <Users size={18} />
              <span>عرض الفريق</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
