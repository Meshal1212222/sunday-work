import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { auth } from '../firebase/config'
import { logoutUser } from '../firebase/auth'

export default function AuthDebug() {
  const authContext = useAuth()
  const [fbUser, setFbUser] = useState(null)

  useEffect(() => {
    setFbUser(auth.currentUser)
  }, [])

  const handleForceLogout = async () => {
    // Delete IndexedDB
    if (window.indexedDB) {
      const databases = await window.indexedDB.databases()
      databases.forEach(db => {
        window.indexedDB.deleteDatabase(db.name)
      })
    }

    // Clear storage
    localStorage.clear()
    sessionStorage.clear()

    // Sign out
    await logoutUser()

    // Reload
    window.location.href = '/sunday-work/auth'
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace', direction: 'ltr' }}>
      <h1>🔍 Auth Debug Panel</h1>

      <div style={{ background: '#f5f5f5', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
        <h3>AuthContext State:</h3>
        <pre>{JSON.stringify({
          isAuthenticated: authContext.isAuthenticated,
          currentUser: authContext.currentUser?.email || null,
          userData: authContext.userData || null,
          loading: authContext.loading
        }, null, 2)}</pre>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
        <h3>Firebase Auth State:</h3>
        <pre>{JSON.stringify({
          fbCurrentUser: fbUser?.email || null,
          fbUid: fbUser?.uid || null
        }, null, 2)}</pre>
      </div>

      <div style={{ background: '#fff3cd', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
        <h3>Storage:</h3>
        <p>localStorage items: {localStorage.length}</p>
        <p>sessionStorage items: {sessionStorage.length}</p>
      </div>

      <button
        onClick={handleForceLogout}
        style={{
          background: '#dc3545',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        🔥 Force Complete Logout
      </button>

      <p style={{ marginTop: '20px', color: '#666' }}>
        هذا الزر سيحذف كل شيء بما فيها IndexedDB
      </p>
    </div>
  )
}
