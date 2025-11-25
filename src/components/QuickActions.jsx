import { useState } from 'react'
import {
  Plus,
  Zap,
  FileText,
  Users,
  Calendar,
  MessageSquare,
  Sparkles,
  X
} from 'lucide-react'
import './QuickActions.css'

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      id: 'task',
      label: 'مهمة جديدة',
      icon: FileText,
      color: '#6161FF',
      action: () => console.log('New task')
    },
    {
      id: 'board',
      label: 'لوحة جديدة',
      icon: Zap,
      color: '#00CA72',
      action: () => console.log('New board')
    },
    {
      id: 'member',
      label: 'إضافة عضو',
      icon: Users,
      color: '#FDAB3D',
      action: () => console.log('Add member')
    },
    {
      id: 'meeting',
      label: 'جدولة اجتماع',
      icon: Calendar,
      color: '#E44258',
      action: () => console.log('Schedule meeting')
    },
    {
      id: 'message',
      label: 'رسالة جديدة',
      icon: MessageSquare,
      color: '#0073EA',
      action: () => console.log('New message')
    },
    {
      id: 'ai',
      label: 'اسأل المساعد الذكي',
      icon: Sparkles,
      color: '#FF158A',
      action: () => console.log('Ask AI')
    }
  ]

  return (
    <>
      {/* Main FAB Button */}
      <button
        className={`quick-actions-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Quick Actions"
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </button>

      {/* Actions Menu */}
      {isOpen && (
        <>
          <div
            className="quick-actions-overlay"
            onClick={() => setIsOpen(false)}
          />
          <div className="quick-actions-menu">
            {actions.map((action, index) => (
              <button
                key={action.id}
                className="quick-action-item"
                style={{
                  '--action-color': action.color,
                  '--delay': `${index * 0.05}s`
                }}
                onClick={() => {
                  action.action()
                  setIsOpen(false)
                }}
              >
                <div className="action-icon">
                  <action.icon size={20} />
                </div>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}
