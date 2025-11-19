import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  Plus,
  Zap,
  Moon,
  Sun,
  Command,
  TrendingUp
} from 'lucide-react'
import './CommandPalette.css'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  // Commands list
  const commands = [
    {
      id: 'dashboard',
      label: 'لوحة التحكم',
      icon: LayoutDashboard,
      action: () => navigate('/dashboard'),
      keywords: ['dashboard', 'لوحة', 'التحكم', 'home']
    },
    {
      id: 'workspaces',
      label: 'مساحات العمل',
      icon: FolderKanban,
      action: () => navigate('/workspaces'),
      keywords: ['workspaces', 'مساحات', 'العمل', 'boards', 'لوحات']
    },
    {
      id: 'team',
      label: 'الفريق',
      icon: Users,
      action: () => navigate('/team'),
      keywords: ['team', 'فريق', 'أعضاء', 'members']
    },
    {
      id: 'settings',
      label: 'الإعدادات',
      icon: Settings,
      action: () => navigate('/settings'),
      keywords: ['settings', 'إعدادات', 'تفضيلات', 'preferences']
    },
    {
      id: 'new-board',
      label: 'لوحة جديدة',
      icon: Plus,
      action: () => console.log('Create new board'),
      keywords: ['new', 'board', 'create', 'جديد', 'لوحة', 'إنشاء']
    },
    {
      id: 'analytics',
      label: 'التحليلات',
      icon: TrendingUp,
      action: () => console.log('Analytics'),
      keywords: ['analytics', 'تحليلات', 'إحصائيات', 'stats']
    },
    {
      id: 'shortcuts',
      label: 'اختصارات لوحة المفاتيح',
      icon: Command,
      action: () => console.log('Show shortcuts'),
      keywords: ['shortcuts', 'اختصارات', 'keyboard', 'keys']
    }
  ]

  // Filter commands based on search
  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()))
  )

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    // Open palette with Cmd+K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsOpen(true)
      return
    }

    // Close with Escape
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
      setSearch('')
      setSelectedIndex(0)
      return
    }

    if (!isOpen) return

    // Navigate with arrow keys
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev =>
        prev < filteredCommands.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : 0)
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault()
      executeCommand(filteredCommands[selectedIndex])
    }
  }, [isOpen, filteredCommands, selectedIndex])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  const executeCommand = (command) => {
    command.action()
    setIsOpen(false)
    setSearch('')
    setSelectedIndex(0)
  }

  if (!isOpen) return null

  return (
    <div className="command-palette-overlay" onClick={() => setIsOpen(false)}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <div className="command-palette-header">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="command-palette-input"
            placeholder="ابحث عن أي شيء... (⌘K)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <kbd className="command-palette-kbd">ESC</kbd>
        </div>

        <div className="command-palette-results">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => (
              <button
                key={cmd.id}
                className={`command-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => executeCommand(cmd)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <cmd.icon size={18} />
                <span>{cmd.label}</span>
                {index === selectedIndex && (
                  <kbd className="command-item-kbd">↵</kbd>
                )}
              </button>
            ))
          ) : (
            <div className="command-empty">
              <Search size={32} />
              <p>لا توجد نتائج</p>
            </div>
          )}
        </div>

        <div className="command-palette-footer">
          <div className="command-hint">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <span>للتنقل</span>
          </div>
          <div className="command-hint">
            <kbd>↵</kbd>
            <span>للتحديد</span>
          </div>
          <div className="command-hint">
            <kbd>ESC</kbd>
            <span>للإغلاق</span>
          </div>
        </div>
      </div>
    </div>
  )
}
