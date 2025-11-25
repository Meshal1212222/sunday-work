import { database } from './config'
import { ref, onValue, onDisconnect, set, serverTimestamp, get } from 'firebase/database'

/**
 * Initialize presence tracking for a user
 * @param {string} userId - Unique user ID
 * @param {string} userName - User display name
 * @param {string} boardId - Board ID they're viewing
 * @param {string} userColor - Avatar color for the user
 */
export function initializePresence(userId, userName, boardId, userColor = '#0073EA') {
  if (!userId || !userName || !boardId) {
    console.warn('Missing required presence parameters')
    return null
  }

  const userPresenceRef = ref(database, `presence/${boardId}/${userId}`)

  // Set user as online
  const presenceData = {
    userId,
    userName,
    color: userColor,
    lastSeen: serverTimestamp(),
    status: 'online'
  }

  // Set the user as online
  set(userPresenceRef, presenceData)

  // When user disconnects, update their status
  onDisconnect(userPresenceRef).set({
    ...presenceData,
    status: 'offline',
    lastSeen: serverTimestamp()
  })

  // Update presence every 30 seconds to show activity
  const presenceInterval = setInterval(() => {
    set(userPresenceRef, presenceData).catch(err => {
      console.error('Failed to update presence:', err)
    })
  }, 30000)

  // Return cleanup function
  return () => {
    clearInterval(presenceInterval)
    set(userPresenceRef, {
      ...presenceData,
      status: 'offline',
      lastSeen: serverTimestamp()
    })
  }
}

/**
 * Subscribe to presence updates for a board
 * @param {string} boardId - Board ID to watch
 * @param {function} callback - Callback function that receives array of online users
 */
export function subscribeToPresence(boardId, callback) {
  if (!boardId) {
    console.warn('Missing boardId for presence subscription')
    return () => {}
  }

  const presenceRef = ref(database, `presence/${boardId}`)

  const unsubscribe = onValue(presenceRef, (snapshot) => {
    const presenceData = snapshot.val()

    if (!presenceData) {
      callback([])
      return
    }

    // Convert to array and filter online users
    const onlineUsers = Object.values(presenceData)
      .filter(user => user.status === 'online')
      .sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0))

    callback(onlineUsers)
  }, (error) => {
    console.error('Presence subscription error:', error)
    callback([])
  })

  return unsubscribe
}

/**
 * Get current online users count
 * @param {string} boardId - Board ID
 * @returns {Promise<number>} Number of online users
 */
export async function getOnlineUsersCount(boardId) {
  if (!boardId) return 0

  const presenceRef = ref(database, `presence/${boardId}`)

  try {
    const snapshot = await get(presenceRef)
    const presenceData = snapshot.val()

    if (!presenceData) return 0

    return Object.values(presenceData)
      .filter(user => user.status === 'online')
      .length
  } catch (error) {
    console.error('Failed to get online users count:', error)
    return 0
  }
}

/**
 * Generate a random color for user avatar
 */
export function generateUserColor() {
  const colors = [
    '#0073EA', // Blue
    '#00C875', // Green
    '#E44258', // Red
    '#FDAB3D', // Orange
    '#7F5AF0', // Purple
    '#FF6B9D', // Pink
    '#00D9FF', // Cyan
    '#FFB800', // Yellow
    '#784BD1', // Violet
    '#2ECC71'  // Emerald
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * Generate user initials from name
 */
export function getUserInitials(name) {
  if (!name) return '?'
  const words = name.trim().split(' ')
  if (words.length === 1) return words[0][0].toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}
