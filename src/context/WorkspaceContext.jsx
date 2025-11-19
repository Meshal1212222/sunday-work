import { createContext, useContext, useState } from 'react'

const WorkspaceContext = createContext()

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider')
  }
  return context
}

export function WorkspaceProvider({ children }) {
  const [currentWorkspace, setCurrentWorkspace] = useState('1')

  // Workspaces data
  const [workspaces] = useState([
    {
      id: '1',
      name: 'مساحة العمل الرئيسية',
      icon: '🏢',
      color: '#6161FF',
      members: 24
    },
    {
      id: '2',
      name: 'التسويق الرقمي',
      icon: '📊',
      color: '#00CA72',
      members: 12
    },
    {
      id: '3',
      name: 'تطوير المنتج',
      icon: '💻',
      color: '#FDAB3D',
      members: 18
    }
  ])

  // Boards data - organized by workspace
  const [boards] = useState({
    '1': [
      { id: 'b1', name: 'مشروع التطبيق الجديد', icon: '📱', color: '#6161FF', tasks: 24 },
      { id: 'b2', name: 'التسويق الرقمي', icon: '📊', color: '#00CA72', tasks: 18 },
      { id: 'b3', name: 'تطوير Backend', icon: '⚙️', color: '#FDAB3D', tasks: 31 },
      { id: 'b4', name: 'إدارة المحتوى', icon: '✍️', color: '#E44258', tasks: 12 },
      { id: 'b5', name: 'خدمة العملاء', icon: '💬', color: '#0073EA', tasks: 8 },
      { id: 'b6', name: 'الموارد البشرية', icon: '👥', color: '#FF158A', tasks: 15 }
    ],
    '2': [
      { id: 'b7', name: 'حملة وسائل التواصل', icon: '📱', color: '#00CA72', tasks: 14 },
      { id: 'b8', name: 'إنشاء المحتوى', icon: '✨', color: '#6161FF', tasks: 22 },
      { id: 'b9', name: 'تحليل البيانات', icon: '📈', color: '#0073EA', tasks: 9 }
    ],
    '3': [
      { id: 'b10', name: 'تصميم UI/UX', icon: '🎨', color: '#FF158A', tasks: 16 },
      { id: 'b11', name: 'Frontend Development', icon: '💻', color: '#6161FF', tasks: 28 },
      { id: 'b12', name: 'Backend Development', icon: '⚙️', color: '#FDAB3D', tasks: 19 },
      { id: 'b13', name: 'Testing & QA', icon: '🔍', color: '#00CA72', tasks: 11 }
    ]
  })

  const getCurrentWorkspace = () => {
    return workspaces.find(w => w.id === currentWorkspace)
  }

  const getCurrentBoards = () => {
    return boards[currentWorkspace] || []
  }

  const getAllWorkspaces = () => {
    return workspaces
  }

  const switchWorkspace = (workspaceId) => {
    setCurrentWorkspace(workspaceId)
  }

  const value = {
    currentWorkspace,
    workspaces,
    boards,
    getCurrentWorkspace,
    getCurrentBoards,
    getAllWorkspaces,
    switchWorkspace
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
