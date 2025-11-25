import { useState, useEffect, useRef } from 'react'
import { getUserInitials } from '../firebase/users'
import './MentionDropdown.css'

export default function MentionDropdown({ users, searchTerm, onSelect, position }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dropdownRef = useRef(null)

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Reset selected index when filtered users change
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchTerm])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < filteredUsers.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0)
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault()
        if (filteredUsers[selectedIndex]) {
          onSelect(filteredUsers[selectedIndex])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filteredUsers, onSelect])

  // Scroll selected item into view
  useEffect(() => {
    if (dropdownRef.current) {
      const selectedElement = dropdownRef.current.children[selectedIndex]
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        })
      }
    }
  }, [selectedIndex])

  if (filteredUsers.length === 0) {
    return (
      <div className="mention-dropdown" style={position}>
        <div className="mention-dropdown-empty">
          لا توجد نتائج
        </div>
      </div>
    )
  }

  return (
    <div className="mention-dropdown" style={position} ref={dropdownRef}>
      {filteredUsers.map((user, index) => (
        <div
          key={user.uid}
          className={`mention-dropdown-item ${index === selectedIndex ? 'selected' : ''}`}
          onClick={() => onSelect(user)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <div className="mention-user-avatar">
            {getUserInitials(user.displayName)}
          </div>
          <div className="mention-user-info">
            <div className="mention-user-name">{user.displayName}</div>
            <div className="mention-user-role">{getRoleDisplay(user.role)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function getRoleDisplay(role) {
  const roles = {
    admin: 'مسؤول',
    manager: 'مدير',
    employee: 'موظف'
  }
  return roles[role] || 'موظف'
}
