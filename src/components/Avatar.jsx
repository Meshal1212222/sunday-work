import React from 'react'

export default function Avatar({ name, size = 32, color }) {
  const getInitials = (fullName) => {
    if (!fullName) return '?'
    const words = fullName.trim().split(' ')
    if (words.length === 1) return words[0][0].toUpperCase()
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }

  const generateColor = (name) => {
    if (!name) return '#0073EA'
    const charCode = name.charCodeAt(0)
    return `hsl(${charCode * 10}, 70%, 60%)`
  }

  const initials = getInitials(name)
  const bgColor = color || generateColor(name)

  return (
    <div
      className="avatar"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: bgColor,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size / 2.5}px`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        flexShrink: 0,
        userSelect: 'none'
      }}
      title={name}
    >
      {initials}
    </div>
  )
}
