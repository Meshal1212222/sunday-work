import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  getDocs
} from 'firebase/firestore'
import { firestore } from './config'

/**
 * Activity Types
 */
export const ActivityTypes = {
  TASK_CREATED: 'task_created',
  TASK_DELETED: 'task_deleted',
  TASK_UPDATED: 'task_updated',
  TASK_MOVED: 'task_moved',
  COLUMN_UPDATED: 'column_updated',
  UPDATE_POSTED: 'update_posted',
  USER_MENTIONED: 'user_mentioned',
  SUBTASK_CREATED: 'subtask_created',
  SUBTASK_DELETED: 'subtask_deleted'
}

/**
 * Log an activity
 * @param {string} boardId - Board ID
 * @param {string} type - Activity type from ActivityTypes
 * @param {string} userId - User ID who performed the action
 * @param {string} userName - User display name
 * @param {Object} details - Additional details about the activity
 */
export async function logActivity(boardId, type, userId, userName, details = {}) {
  try {
    const activityRef = collection(firestore, 'boards', boardId, 'activity')

    const activity = {
      type,
      userId,
      userName,
      details,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    }

    await addDoc(activityRef, activity)
    return { success: true }
  } catch (error) {
    console.error('Error logging activity:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Subscribe to activity log for a board (real-time)
 * @param {string} boardId - Board ID
 * @param {number} limitCount - Number of activities to fetch (default: 50)
 * @param {function} callback - Callback function that receives activities array
 * @returns {function} Unsubscribe function
 */
export function subscribeToActivityLog(boardId, limitCount = 50, callback) {
  try {
    const activityRef = collection(firestore, 'boards', boardId, 'activity')
    const q = query(activityRef, orderBy('timestamp', 'desc'), limit(limitCount))

    return onSnapshot(q, (snapshot) => {
      const activities = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        activities.push({
          id: doc.id,
          type: data.type,
          userId: data.userId,
          userName: data.userName,
          details: data.details,
          time: formatActivityTime(data.timestamp?.toDate() || new Date(data.createdAt)),
          timestamp: data.timestamp?.toDate() || new Date(data.createdAt)
        })
      })
      callback(activities)
    }, (error) => {
      console.error('Error subscribing to activity log:', error)
      callback([])
    })
  } catch (error) {
    console.error('Error setting up activity log subscription:', error)
    return () => {} // Return empty unsubscribe function
  }
}

/**
 * Get activity log for a board (one-time fetch)
 * @param {string} boardId - Board ID
 * @param {number} limitCount - Number of activities to fetch
 * @returns {Promise<Array>} Array of activities
 */
export async function getActivityLog(boardId, limitCount = 50) {
  try {
    const activityRef = collection(firestore, 'boards', boardId, 'activity')
    const q = query(activityRef, orderBy('timestamp', 'desc'), limit(limitCount))
    const snapshot = await getDocs(q)

    const activities = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      activities.push({
        id: doc.id,
        type: data.type,
        userId: data.userId,
        userName: data.userName,
        details: data.details,
        time: formatActivityTime(data.timestamp?.toDate() || new Date(data.createdAt)),
        timestamp: data.timestamp?.toDate() || new Date(data.createdAt)
      })
    })

    return { success: true, activities }
  } catch (error) {
    console.error('Error getting activity log:', error)
    return { success: false, error: error.message, activities: [] }
  }
}

/**
 * Format activity time
 * @param {Date} date - Date object
 * @returns {string} Formatted time string
 */
function formatActivityTime(date) {
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
 * Get activity description in Arabic
 * @param {Object} activity - Activity object
 * @returns {string} Activity description
 */
export function getActivityDescription(activity) {
  const { type, details } = activity

  switch (type) {
    case ActivityTypes.TASK_CREATED:
      return `أنشأ مهمة "${details.taskName}"`

    case ActivityTypes.TASK_DELETED:
      return `حذف مهمة "${details.taskName}"`

    case ActivityTypes.TASK_UPDATED:
      return `حدّث مهمة "${details.taskName}"`

    case ActivityTypes.TASK_MOVED:
      return `نقل مهمة "${details.taskName}" من "${details.fromGroup}" إلى "${details.toGroup}"`

    case ActivityTypes.COLUMN_UPDATED:
      return `غيّر ${details.columnName} في "${details.taskName}"`

    case ActivityTypes.UPDATE_POSTED:
      return `نشر تحديثاً على "${details.taskName}"`

    case ActivityTypes.USER_MENTIONED:
      return `ذكر ${details.mentionedUser} في تحديث`

    case ActivityTypes.SUBTASK_CREATED:
      return `أضاف مهمة فرعية "${details.subtaskName}" إلى "${details.taskName}"`

    case ActivityTypes.SUBTASK_DELETED:
      return `حذف مهمة فرعية "${details.subtaskName}" من "${details.taskName}"`

    default:
      return 'نشاط غير معروف'
  }
}

/**
 * Get activity icon based on type
 * @param {string} type - Activity type
 * @returns {string} Icon emoji
 */
export function getActivityIcon(type) {
  switch (type) {
    case ActivityTypes.TASK_CREATED:
      return '➕'
    case ActivityTypes.TASK_DELETED:
      return '🗑️'
    case ActivityTypes.TASK_UPDATED:
      return '✏️'
    case ActivityTypes.TASK_MOVED:
      return '↔️'
    case ActivityTypes.COLUMN_UPDATED:
      return '🔄'
    case ActivityTypes.UPDATE_POSTED:
      return '💬'
    case ActivityTypes.USER_MENTIONED:
      return '@'
    case ActivityTypes.SUBTASK_CREATED:
      return '➕'
    case ActivityTypes.SUBTASK_DELETED:
      return '🗑️'
    default:
      return '📝'
  }
}
