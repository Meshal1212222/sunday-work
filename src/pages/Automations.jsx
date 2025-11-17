import React, { useState } from 'react'
import { Plus, Search, MoreVertical } from 'lucide-react'
import './Automations.css'

export default function Automations() {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      trigger: 'When a subitem is created',
      action: 'set subitem Status to جديد',
      owner: 'M',
      updated: 'a month ago',
      badge: 'Minor',
      active: true
    },
    {
      id: 2,
      trigger: '1 day after subitem Date arrives',
      condition: 'only if subitem Status is قيد الانتظار',
      action: 'set subitem Status to جاري العمل AND set subitem متابعة to جاري',
      owner: 'M',
      updated: 'a month ago',
      badge: 'Minor',
      active: true
    },
    {
      id: 3,
      trigger: 'When subitem Date arrives',
      condition: 'only if subitem Status is جديد',
      action: 'set subitem Status to قيد الانتظار',
      owner: 'M',
      updated: 'a month ago',
      badge: 'Minor',
      active: true
    },
    {
      id: 4,
      trigger: 'When subitem Status changes to تم الانجاز',
      condition: 'only if subitem متابعة الجودة is NOT متأخر',
      action: 'set subitem متابعة الجودة to Done',
      owner: 'M',
      updated: 'a month ago',
      badge: 'Minor',
      active: true
    },
    {
      id: 5,
      trigger: 'When Status changes to تم الإنجاز',
      condition: 'only if متابعة الجودة is NOT متأخر',
      action: 'set متابعة الجودة to تم',
      owner: 'M',
      updated: 'a month ago',
      badge: 'Minor',
      active: false
    },
    {
      id: 6,
      trigger: 'When Date arrives',
      condition: 'only if Status is جديدة',
      action: 'set Status to جاري العمل',
      owner: 'M',
      updated: 'a month ago',
      badge: 'Minor',
      active: true
    },
    {
      id: 7,
      trigger: 'When an item is created',
      action: 'set Status to جديد',
      owner: 'M',
      updated: 'a month ago',
      badge: 'Minor',
      active: true
    },
    {
      id: 8,
      trigger: '1 day after Date arrives',
      condition: 'only if Status is جاري العمل',
      action: 'set Status to متأخر AND set متابعة الجودة to متأخر',
      owner: 'M',
      updated: '2 months ago',
      badge: 'Minor',
      active: true
    },
    {
      id: 9,
      trigger: 'When Status is تم الإنجاز for 30 days',
      action: 'archive item',
      owner: 'M',
      updated: 'just now',
      badge: 'Major',
      active: true
    },
    {
      id: 10,
      trigger: 'When Date is overdue',
      action: 'set Priority to عاجل',
      owner: 'M',
      updated: 'just now',
      badge: 'Critical',
      active: true
    },
    {
      id: 11,
      trigger: 'When stuck for 2 days',
      action: 'set Priority to حرج',
      owner: 'M',
      updated: 'just now',
      badge: 'Critical',
      active: true
    },
    {
      id: 12,
      trigger: 'When Status is معلق',
      action: 'move to "المشاكل" group',
      owner: 'M',
      updated: 'just now',
      badge: 'Major',
      active: true
    },
    {
      id: 13,
      trigger: 'When Status changes to متأخر',
      action: 'notify المسؤول',
      owner: 'M',
      updated: 'just now',
      badge: 'Minor',
      active: true
    },
    {
      id: 14,
      trigger: 'When Date is 1 day away',
      action: 'notify سلمى ومحمد',
      owner: 'M',
      updated: 'just now',
      badge: 'Minor',
      active: true
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const toggleAutomation = (id) => {
    setAutomations(automations.map(auto =>
      auto.id === id ? { ...auto, active: !auto.active } : auto
    ))
  }

  const filteredAutomations = automations.filter(auto => {
    const matchesFilter = filter === 'all' ? true :
                         filter === 'active' ? auto.active :
                         !auto.active

    const matchesSearch = searchTerm === '' ? true :
                         auto.trigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auto.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (auto.condition && auto.condition.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  return (
    <div className="automations-page">
      {/* Header */}
      <div className="automations-header">
        <div className="header-left">
          <h1>⚡ Automations</h1>
          <p className="active-count">{automations.filter(a => a.active).length} active</p>
        </div>
        <button className="create-automation-btn">
          <Plus size={18} />
          <span>Create Automation</span>
        </button>
      </div>

      {/* Filters */}
      <div className="automations-filters">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({automations.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({automations.filter(a => a.active).length})
          </button>
          <button
            className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilter('inactive')}
          >
            Inactive ({automations.filter(a => !a.active).length})
          </button>
        </div>

        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search automations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Automation Cards */}
      <div className="automations-list">
        {filteredAutomations.length > 0 ? (
          filteredAutomations.map(auto => (
            <div key={auto.id} className="automation-card">
              <div className="card-content">
                {/* Trigger */}
                <div className="automation-trigger">
                  <span className="trigger-text">{auto.trigger}</span>
                </div>

                {/* Condition */}
                {auto.condition && (
                  <div className="automation-condition">
                    <span className="condition-badge">AND</span>
                    <span className="condition-text">{auto.condition}</span>
                  </div>
                )}

                {/* Action */}
                <div className="automation-action">
                  <span className="action-arrow">→</span>
                  <span className="action-text">{auto.action}</span>
                </div>

                {/* Meta Info */}
                <div className="automation-meta">
                  <div className="meta-avatar">{auto.owner}</div>
                  <span className="meta-text">Updated {auto.updated}</span>
                  <span className="meta-dot">•</span>
                  <span className="meta-badge">{auto.badge}</span>
                  <button className="meta-more">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="card-toggle">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={auto.active}
                    onChange={() => toggleAutomation(auto.id)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No automations found</p>
          </div>
        )}
      </div>
    </div>
  )
}
