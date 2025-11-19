import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Auth from './pages/Auth'
import AuthDebug from './pages/AuthDebug'
import AuthTest from './pages/AuthTest'
import Dashboard from './pages/Dashboard'
import Workspaces from './pages/Workspaces'
import WorkspaceView from './pages/WorkspaceView'
import Board from './pages/Board'
import Automations from './pages/Automations'
import Team from './pages/Team'
import Settings from './pages/Settings'
import Help from './pages/Help'

// Layouts
import MainLayout from './layouts/MainLayout'

// Context
import { WorkspaceProvider } from './context/WorkspaceContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Router basename="/sunday-work">
      <Routes>
        {/* Auth Routes - Always accessible (MUST be first) */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth-debug" element={<AuthDebug />} />
        <Route path="/test" element={<AuthTest />} />

        {/* Root redirect based on auth */}
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />
        } />

        {/* Protected Routes */}
        {isAuthenticated && (
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/workspace/:id" element={<WorkspaceView />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Route>
        )}

        {/* Catch all - Redirect based on auth */}
        <Route path="*" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />
        } />
      </Routes>
    </Router>
  )
}

function App() {
  // Special route for testing Auth page - bypass everything
  if (window.location.pathname === '/sunday-work/test') {
    return <AuthTest />
  }

  return (
    <AuthProvider>
      <WorkspaceProvider>
        <AppRoutes />
      </WorkspaceProvider>
    </AuthProvider>
  )
}

export default App
