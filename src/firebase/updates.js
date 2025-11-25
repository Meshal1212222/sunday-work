import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
  getDocs
} from 'firebase/firestore'
import { firestore } from './config'

/**
 * Add a new update to a board item
 * @param {string} boardId - Board ID
 * @param {string} itemId - Item ID
 * @param {string} text - Update text
 * @param {string} authorId - User ID
 * @param {string} authorName - User display name
 */
export async function addUpdate(boardId, itemId, text, authorId, authorName) {
  try {
    const updatesRef = collection(firestore, 'boards', boardId, 'items', itemId, 'updates')

    const update = {
      text: text.trim(),
      authorId: authorId,
      authorName: authorName,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    }

    await addDoc(updatesRef, update)
    return { success: true }
  } catch (error) {
    console.error('Error adding update:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Subscribe to real-time updates for a board item
 * @param {string} boardId - Board ID
 * @param {string} itemId - Item ID
 * @param {function} callback - Callback function that receives updates array
 * @returns {function} Unsubscribe function
 */
export function subscribeToUpdates(boardId, itemId, callback) {
  try {
    const updatesRef = collection(firestore, 'boards', boardId, 'items', itemId, 'updates')
    const q = query(updatesRef, orderBy('timestamp', 'asc'))

    return onSnapshot(q, (snapshot) => {
      const updates = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        updates.push({
          id: doc.id,
          author: data.authorName,
          authorId: data.authorId,
          text: data.text,
          time: formatTime(data.timestamp?.toDate() || new Date(data.createdAt)),
          timestamp: data.timestamp?.toDate() || new Date(data.createdAt)
        })
      })
      callback(updates)
    }, (error) => {
      console.error('Error subscribing to updates:', error)
      callback([])
    })
  } catch (error) {
    console.error('Error setting up updates subscription:', error)
    return () => {} // Return empty unsubscribe function
  }
}

/**
 * Get all updates for a board item (one-time fetch)
 * @param {string} boardId - Board ID
 * @param {string} itemId - Item ID
 * @returns {Promise<Array>} Array of updates
 */
export async function getUpdates(boardId, itemId) {
  try {
    const updatesRef = collection(firestore, 'boards', boardId, 'items', itemId, 'updates')
    const q = query(updatesRef, orderBy('timestamp', 'asc'))
    const snapshot = await getDocs(q)

    const updates = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      updates.push({
        id: doc.id,
        author: data.authorName,
        authorId: data.authorId,
        text: data.text,
        time: formatTime(data.timestamp?.toDate() || new Date(data.createdAt)),
        timestamp: data.timestamp?.toDate() || new Date(data.createdAt)
      })
    })

    return { success: true, updates }
  } catch (error) {
    console.error('Error getting updates:', error)
    return { success: false, error: error.message, updates: [] }
  }
}

/**
 * Get update counts for multiple items (for badges)
 * @param {string} boardId - Board ID
 * @param {Array<string>} itemIds - Array of item IDs
 * @returns {Promise<Object>} Object with itemId as key and count as value
 */
export async function getUpdateCounts(boardId, itemIds) {
  try {
    const counts = {}

    // Fetch counts in parallel
    await Promise.all(
      itemIds.map(async (itemId) => {
        const updatesRef = collection(firestore, 'boards', boardId, 'items', itemId, 'updates')
        const snapshot = await getDocs(updatesRef)
        counts[itemId] = snapshot.size
      })
    )

    return { success: true, counts }
  } catch (error) {
    console.error('Error getting update counts:', error)
    return { success: false, error: error.message, counts: {} }
  }
}

/**
 * Format timestamp to readable time
 * @param {Date} date - Date object
 * @returns {string} Formatted time string
 */
function formatTime(date) {
  if (!date) return ''

  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'الآن'
  if (minutes < 60) return `منذ ${minutes} دقيقة`
  if (hours < 24) return `منذ ${hours} ساعة`
  if (days < 7) return `منذ ${days} يوم`

  return date.toLocaleDateString('ar-EG', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Subscribe to update counts for multiple items (real-time)
 * @param {string} boardId - Board ID
 * @param {Array<string>} itemIds - Array of item IDs
 * @param {function} callback - Callback function that receives counts object
 * @returns {function} Unsubscribe function that unsubscribes from all items
 */
export function subscribeToUpdateCounts(boardId, itemIds, callback) {
  const unsubscribes = []
  const counts = {}

  itemIds.forEach((itemId) => {
    const updatesRef = collection(firestore, 'boards', boardId, 'items', itemId, 'updates')
    const unsubscribe = onSnapshot(updatesRef, (snapshot) => {
      counts[itemId] = snapshot.size
      callback({ ...counts })
    })
    unsubscribes.push(unsubscribe)
  })

  // Return function that unsubscribes from all
  return () => {
    unsubscribes.forEach(unsub => unsub())
  }
}
