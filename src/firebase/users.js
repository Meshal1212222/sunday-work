import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit as firestoreLimit
} from 'firebase/firestore'
import { firestore } from './config'

/**
 * Get all users in a company
 * @param {string} companyCode - Company code
 * @returns {Promise<Array>} Array of users
 */
export async function getCompanyUsers(companyCode) {
  try {
    const usersRef = collection(firestore, 'users')
    const q = query(
      usersRef,
      where('companyCode', '==', companyCode),
      where('isActive', '==', true),
      orderBy('displayName', 'asc')
    )

    const snapshot = await getDocs(q)
    const users = []

    snapshot.forEach((doc) => {
      const data = doc.data()
      users.push({
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        role: data.role,
        avatar: data.avatar
      })
    })

    return { success: true, users }
  } catch (error) {
    console.error('Error getting company users:', error)
    return { success: false, error: error.message, users: [] }
  }
}

/**
 * Search users by name or email
 * @param {string} companyCode - Company code
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching users
 */
export async function searchCompanyUsers(companyCode, searchTerm) {
  try {
    // Get all company users first (Firestore doesn't support complex text search)
    const result = await getCompanyUsers(companyCode)

    if (!result.success) {
      return result
    }

    // Filter users by search term
    const term = searchTerm.toLowerCase()
    const filteredUsers = result.users.filter(user =>
      user.displayName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    )

    return { success: true, users: filteredUsers }
  } catch (error) {
    console.error('Error searching company users:', error)
    return { success: false, error: error.message, users: [] }
  }
}

/**
 * Get user initials for avatar
 * @param {string} name - User name
 * @returns {string} Initials
 */
export function getUserInitials(name) {
  if (!name) return '؟'
  return name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
