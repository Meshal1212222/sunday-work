import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Auth from './pages/Auth'
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
        {/* Auth Routes */}
        {!isAuthenticated ? (
          <>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </>
        ) : (
          /* Protected Routes */
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/workspace/:id" element={<WorkspaceView />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <AppRoutes />
      </WorkspaceProvider>
    </AuthProvider>
  )
}

export default App
