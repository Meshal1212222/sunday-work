import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Workspaces from './pages/Workspaces'
import Board from './pages/Board'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

function App() {
  // Temporary auth state (will be replaced with proper auth later)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    <Router basename="/sunday-work">
      <Routes>
        {/* Auth Routes */}
        {!isAuthenticated ? (
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        ) : (
          /* Protected Routes */
          <Route element={<MainLayout setAuth={setIsAuthenticated} />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  )
}

export default App
