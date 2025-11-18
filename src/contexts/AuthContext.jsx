import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthChange, getUserData } from '../firebase/auth'

const AuthContext = createContext({})

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
