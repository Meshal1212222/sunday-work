import { useState, useEffect } from 'react'
import { Users, Mail, Phone, Shield } from 'lucide-react'
import { getTeamMembers } from '../services/mondayService'
import './Team.css'

export default function Team() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  async function fetchTeamMembers() {
    try {
      setLoading(true)
      const data = await getTeamMembers()
      setMembers(data)
    } catch (error) {
      console.error('Failed to fetch team:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>جاري تحميل بيانات الفريق...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <Users size={32} />
          <div>
            <h1>الفريق</h1>
            <p className="page-subtitle">إدارة أعضاء الفريق وصلاحياتهم</p>
          </div>
        </div>
      </div>

      <div className="team-grid">
        {members.map((member) => (
          <div key={member.id} className="team-card">
            <div className="team-card-header">
              <div className="member-avatar">
                {member.photo_original ? (
                  <img src={member.photo_original} alt={member.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {member.name?.charAt(0) || '👤'}
                  </div>
                )}
              </div>
              <div className="member-status">
                {member.enabled ? (
                  <span className="status-badge active">نشط</span>
                ) : (
                  <span className="status-badge inactive">غير نشط</span>
                )}
              </div>
            </div>

            <div className="team-card-body">
              <h3 className="member-name">{member.name}</h3>
              {member.title && (
                <p className="member-title">{member.title}</p>
              )}

              <div className="member-info">
                {member.email && (
                  <div className="info-item">
                    <Mail size={16} />
                    <span>{member.email}</span>
                  </div>
                )}
                {(member.phone || member.mobile_phone) && (
                  <div className="info-item">
                    <Phone size={16} />
                    <span>{member.phone || member.mobile_phone}</span>
                  </div>
                )}
                {member.location && (
                  <div className="info-item">
                    <Shield size={16} />
                    <span>{member.location}</span>
                  </div>
                )}
              </div>

              {member.is_guest && (
                <div className="member-badge">ضيف</div>
              )}
              {member.is_pending && (
                <div className="member-badge pending">قيد الانتظار</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="empty-state">
          <Users size={64} />
          <h3>لا يوجد أعضاء في الفريق</h3>
          <p>ابدأ بإضافة أعضاء جدد للفريق</p>
        </div>
      )}
    </div>
  )
}
