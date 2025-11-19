import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import CommandPalette from '../components/CommandPalette'
import QuickActions from '../components/QuickActions'
import './MainLayout.css'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="main-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Command Palette - Press Cmd+K / Ctrl+K */}
      <CommandPalette />

      {/* Quick Actions - Floating Button */}
      <QuickActions />
    </div>
  )
}
