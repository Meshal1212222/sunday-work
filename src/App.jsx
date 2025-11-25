import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Auth from './pages/Auth'
import AuthDebug from './pages/AuthDebug'
import AuthTest from './pages/AuthTest'
import Dashboard from './pages/Dashboard'
import Workspaces from './pages/Workspaces'
import WorkspaceView from './pages/WorkspaceView'
import Board from './pages/Board'
import BoardView from './pages/BoardView'
import BoardWrapper from './pages/BoardWrapper'
import BoardPro from './pages/BoardPro'
import BoardClassic from './pages/BoardClassic'
import Automations from './pages/Automations'
import Team from './pages/Team'
import Settings from './pages/Settings'
import Help from './pages/Help'
import WhatsAppTest from './pages/WhatsAppTest'
import WhatsAppGroupsTest from './pages/WhatsAppGroupsTest'
import ZapierImport from './pages/ZapierImport'
import ManualZapCopy from './pages/ManualZapCopy'
import DataSync from './pages/DataSync'
import SyncAll from './pages/SyncAll'
import WhatsAppBot from './pages/WhatsAppBot'
import MyWork from './pages/MyWork'
import Archive from './pages/Archive'
import Performance from './pages/Performance'

// Layouts
import MainLayout from './layouts/MainLayout'

// Context
import { WorkspaceProvider } from './context/WorkspaceContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <Routes>
        {/* Auth Routes - Always accessible (MUST be first) */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth-debug" element={<AuthDebug />} />
        <Route path="/test" element={<AuthTest />} />

        {/* Root redirect - always go to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main Routes - Open for demo/testing */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-work" element={<MyWork />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/workspace/:id" element={<WorkspaceView />} />
          <Route path="/board/:boardId" element={<BoardWrapper />} />
          <Route path="/board-pro/:boardId" element={<BoardPro />} />
          <Route path="/board-classic/:boardId" element={<BoardClassic />} />
          <Route path="/board-legacy/:id" element={<Board />} />
          <Route path="/board-simple/:id" element={<BoardView />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/whatsapp-test" element={<WhatsAppTest />} />
          <Route path="/whatsapp-groups" element={<WhatsAppGroupsTest />} />
          <Route path="/whatsapp-bot" element={<WhatsAppBot />} />
          <Route path="/zapier-import" element={<ZapierImport />} />
          <Route path="/manual-zap-copy" element={<ManualZapCopy />} />
          <Route path="/data-sync" element={<DataSync />} />
          <Route path="/sync-all" element={<SyncAll />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/help" element={<Help />} />
        </Route>

        {/* Catch all - go to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

function App() {
  // Special route for testing Auth page - bypass everything
  if (window.location.pathname === '/test') {
    return <AuthTest />
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <AppRoutes />
        </WorkspaceProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
