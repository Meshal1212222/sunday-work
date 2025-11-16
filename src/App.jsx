import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Workspaces from './pages/Workspaces'
import WorkspaceView from './pages/WorkspaceView'
import Board from './pages/Board'
import Team from './pages/Team'
import Settings from './pages/Settings'
import Help from './pages/Help'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

// Context
import { WorkspaceProvider } from './context/WorkspaceContext'

function App() {
  // Temporary auth state (will be replaced with proper auth later)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    <WorkspaceProvider>
      <Router>
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
              <Route path="/workspace/:id" element={<WorkspaceView />} />
              <Route path="/board/:id" element={<Board />} />
              <Route path="/team" element={<Team />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          )}
        </Routes>
      </Router>
    </WorkspaceProvider>
  )
}

export default App
