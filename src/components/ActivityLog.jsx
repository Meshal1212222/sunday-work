import { useState, useEffect } from 'react'
import { subscribeToActivityLog, getActivityDescription, getActivityIcon } from '../firebase/activity'
import { Activity, X, Filter } from 'lucide-react'
import { getUserInitials } from '../firebase/users'
import './ActivityLog.css'

export default function ActivityLog({ boardId, isOpen, onClose }) {
  const [activities, setActivities] = useState([])
  const [filterType, setFilterType] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!boardId || !isOpen) {
      setActivities([])
      setLoading(true)
      return
    }

    setLoading(true)
    const unsubscribe = subscribeToActivityLog(boardId, 100, (newActivities) => {
      setActivities(newActivities)
      setLoading(false)
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [boardId, isOpen])

  const filteredActivities = filterType === 'all'
    ? activities
    : activities.filter(a => a.type === filterType)

  if (!isOpen) return null

  return (
    <div className="activity-log-overlay" onClick={onClose}>
      <div className="activity-log-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="activity-log-header">
          <div className="activity-log-title">
            <Activity size={20} />
            <h3>سجل النشاطات</h3>
          </div>
          <div className="activity-log-actions">
            <button className="filter-btn" title="تصفية">
              <Filter size={18} />
            </button>
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="activity-log-body">
          {loading ? (
            <div className="activity-log-loading">
              <div className="loading-spinner"></div>
              <p>جاري تحميل النشاطات...</p>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="activity-log-empty">
              <Activity size={48} style={{ opacity: 0.3 }} />
              <p>لا توجد نشاطات بعد</p>
              <p style={{ fontSize: '13px', marginTop: '8px' }}>
                سيتم تسجيل جميع التغييرات هنا
              </p>
            </div>
          ) : (
            <div className="activity-log-list">
              {filteredActivities.map((activity, index) => (
                <div key={activity.id || index} className="activity-item">
                  <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                  <div className="activity-content">
                    <div className="activity-description">
                      <strong>{activity.userName}</strong> {getActivityDescription(activity)}
                    </div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
