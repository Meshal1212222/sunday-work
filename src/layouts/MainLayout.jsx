import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import './MainLayout.css'

export default function MainLayout({ setAuth }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="main-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          setAuth={setAuth}
        />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
