import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthChange, getUserData, logoutUser } from '../firebase/auth'

const AuthContext = createContext({})

// Force complete logout and clear everything
export async function forceCompleteLogout() {
  // 1. Delete all IndexedDB databases
  if (window.indexedDB) {
    const databases = await window.indexedDB.databases()
    for (const db of databases) {
      window.indexedDB.deleteDatabase(db.name)
      console.log('Deleted DB:', db.name)
    }
  }

  // 2. Clear storage
  localStorage.clear()
  sessionStorage.clear()

  // 3. Sign out from Firebase
  await logoutUser()

  // 4. Hard reload
  window.location.href = '/sunday-work/auth'
}

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setCurrentUser(user)

      if (user) {
        // Get user data from Firestore
        const result = await getUserData(user.uid)
        if (result.success) {
          setUserData(result.data)
        }
      } else {
        setUserData(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userData,
    loading,
    isAuthenticated: !!currentUser,
    isAdmin: userData?.role === 'admin',
    isManager: userData?.role === 'manager' || userData?.role === 'admin',
    isEmployee: userData?.role === 'employee'
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
