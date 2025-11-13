import { useState, useEffect } from 'react'
import {
  getBoards,
  getWorkspaces,
  getCurrentUser,
  getTeamMembers,
  mapBoardToSunday,
  mapWorkspaceToSunday
} from '../services/mondayService'

/**
 * Custom hook to fetch and manage Monday.com data
 */
export function useMondayData() {
  const [workspaces, setWorkspaces] = useState([])
  const [boards, setBoards] = useState({})
  const [user, setUser] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMondayData()
  }, [])

  async function fetchMondayData() {
    try {
      setLoading(true)
      setError(null)

      console.log('🚀 Fetching Monday.com data...')

      // Fetch all data in parallel
      const [mondayWorkspaces, mondayBoards, mondayUser, mondayTeam] = await Promise.all([
        getWorkspaces(),
        getBoards(),
        getCurrentUser(),
        getTeamMembers()
      ])

      console.log('✅ Monday.com workspaces:', mondayWorkspaces)
      console.log('✅ Monday.com boards:', mondayBoards)
      console.log('✅ Monday.com user:', mondayUser)
      console.log('✅ Monday.com team members:', mondayTeam)

      // Map workspaces
      const mappedWorkspaces = mondayWorkspaces.map(ws =>
        mapWorkspaceToSunday(ws, mondayBoards)
      )

      // If no workspaces, create default one
      if (mappedWorkspaces.length === 0) {
        mappedWorkspaces.push({
          id: '1',
          name: 'مساحة العمل الرئيسية',
          icon: '🏢',
          color: '#6161FF',
          members: 1,
          boards: mondayBoards.length
        })
      }

      // Map boards by workspace
      const boardsByWorkspace = {}

      mondayBoards.forEach(board => {
        const workspaceId = board.workspace?.id || mappedWorkspaces[0].id
        if (!boardsByWorkspace[workspaceId]) {
          boardsByWorkspace[workspaceId] = []
        }
        boardsByWorkspace[workspaceId].push(mapBoardToSunday(board))
      })

      setWorkspaces(mappedWorkspaces)
      setBoards(boardsByWorkspace)
      setUser(mondayUser)
      setTeamMembers(mondayTeam)

      console.log('📊 Mapped workspaces:', mappedWorkspaces)
      console.log('📋 Mapped boards:', boardsByWorkspace)
      console.log('👥 Team members count:', mondayTeam.length)

    } catch (err) {
      console.error('❌ Failed to fetch Monday.com data:', err)
      setError(err.message)

      // Set fallback data
      setWorkspaces([{
        id: '1',
        name: 'مساحة العمل الرئيسية',
        icon: '🏢',
        color: '#6161FF',
        members: 0,
        boards: 0
      }])
      setBoards({
        '1': []
      })
      setTeamMembers([])
    } finally {
      setLoading(false)
    }
  }

  return {
    workspaces,
    boards,
    user,
    teamMembers,
    loading,
    error,
    refetch: fetchMondayData
  }
}
