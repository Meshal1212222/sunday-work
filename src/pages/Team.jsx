import { useState, useEffect } from 'react'
import { Users, Mail, Phone, Shield, Plus, Edit2, Trash2 } from 'lucide-react'
import { database } from '../firebase/config'
import { ref, get, set, push, remove } from 'firebase/database'
import './Team.css'

export default function Team() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', title: '' })

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  async function fetchTeamMembers() {
    try {
      setLoading(true)
      const teamRef = ref(database, 'team')
      const snapshot = await get(teamRef)

      if (snapshot.exists()) {
        const data = snapshot.val()
        const membersList = Object.entries(data).map(([id, member]) => ({
          id,
          ...member
        }))
        setMembers(membersList)
      } else {
        setMembers([])
      }
    } catch (error) {
      console.error('Failed to fetch team:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async () => {
    if (!newMember.name.trim()) return

    try {
      const teamRef = ref(database, 'team')
      await push(teamRef, {
        ...newMember,
        enabled: true,
        createdAt: Date.now()
      })
      setNewMember({ name: '', email: '', phone: '', title: '' })
      setShowAddModal(false)
      fetchTeamMembers()
    } catch (error) {
      console.error('Failed to add member:', error)
    }
  }

  const handleDeleteMember = async (memberId) => {
    if (!confirm('هل أنت متأكد من حذف هذا العضو؟')) return

    try {
      const memberRef = ref(database, `team/${memberId}`)
      await remove(memberRef)
      fetchTeamMembers()
    } catch (error) {
      console.error('Failed to delete member:', error)
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

        <button className="add-member-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          <span>إضافة عضو</span>
        </button>
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
              <div className="member-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteMember(member.id)}
                  title="حذف"
                >
                  <Trash2 size={16} />
                </button>
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
              </div>
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

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>إضافة عضو جديد</h2>

            <div className="form-group">
              <label>الاسم *</label>
              <input
                type="text"
                value={newMember.name}
                onChange={e => setNewMember({...newMember, name: e.target.value})}
                placeholder="اسم العضو"
              />
            </div>

            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                value={newMember.email}
                onChange={e => setNewMember({...newMember, email: e.target.value})}
                placeholder="email@example.com"
              />
            </div>

            <div className="form-group">
              <label>رقم الجوال</label>
              <input
                type="tel"
                value={newMember.phone}
                onChange={e => setNewMember({...newMember, phone: e.target.value})}
                placeholder="+966xxxxxxxxx"
              />
            </div>

            <div className="form-group">
              <label>المنصب</label>
              <input
                type="text"
                value={newMember.title}
                onChange={e => setNewMember({...newMember, title: e.target.value})}
                placeholder="المنصب الوظيفي"
              />
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                إلغاء
              </button>
              <button className="save-btn" onClick={handleAddMember}>
                إضافة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
