/**
 * Monday.com API Integration
 * Fetches boards, items, and workspace data from Monday.com
 */

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I'
const MONDAY_API_URL = 'https://api.monday.com/v2'

/**
 * Make a GraphQL query to Monday.com API
 */
async function mondayQuery(query, variables = {}) {
  try {
    const response = await fetch(MONDAY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MONDAY_API_TOKEN,
        'API-Version': '2024-01'
      },
      body: JSON.stringify({
        query,
        variables
      })
    })

    if (!response.ok) {
      throw new Error(`Monday API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('Monday API errors:', data.errors)
      throw new Error(data.errors[0]?.message || 'Monday API error')
    }

    return data.data
  } catch (error) {
    console.error('Monday API request failed:', error)
    throw error
  }
}

/**
 * Get all boards with full details (including archived)
 * @param {boolean} includeArchived - Include archived boards
 */
export async function getBoards(includeArchived = true) {
  // Monday API supports state filter: all, active, archived, deleted
  const query = `
    query {
      boards(limit: 500, state: ${includeArchived ? 'all' : 'active'}) {
        id
        name
        description
        state
        board_kind
        items_count
        updated_at
        workspace {
          id
          name
        }
        owners {
          id
          name
          email
        }
        columns {
          id
          title
          type
          settings_str
        }
        groups {
          id
          title
          color
        }
      }
    }
  `

  try {
    const data = await mondayQuery(query)
    const boards = data.boards || []
    console.log(`✅ Fetched ${boards.length} boards (active: ${boards.filter(b => b.state === 'active').length}, archived: ${boards.filter(b => b.state === 'archived').length})`)
    return boards
  } catch (error) {
    console.error('Failed to fetch boards:', error)
    return []
  }
}

/**
 * Get all board items (including archived)
 * @param {string} boardId - Board ID
 * @param {boolean} includeArchived - Include archived items (default: true)
 */
export async function getBoardItems(boardId, includeArchived = true) {
  const query = `
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        id
        name
        state
        items_page(limit: 500) {
          items {
            id
            name
            state
            created_at
            updated_at
            creator {
              id
              name
              email
            }
            subscribers {
              id
              name
              email
            }
            column_values {
              id
              title
              text
              type
              value
            }
            group {
              id
              title
              color
            }
          }
        }
      }
    }
  `

  try {
    const data = await mondayQuery(query, { boardId: String(boardId) })
    if (data.boards && data.boards[0]) {
      const board = data.boards[0]
      let allItems = board.items_page?.items || []

      // Filter archived items if needed
      if (!includeArchived) {
        allItems = allItems.filter(item => item.state !== 'archived')
      }

      const activeCount = allItems.filter(i => i.state === 'active').length
      const archivedCount = allItems.filter(i => i.state === 'archived').length

      console.log(`📋 Board ${board.name}: ${allItems.length} total items (active: ${activeCount}, archived: ${archivedCount})`)
      return allItems
    }
    return []
  } catch (error) {
    console.error(`Failed to fetch items for board ${boardId}:`, error)
    return []
  }
}

/**
 * Get workspaces
 */
export async function getWorkspaces() {
  const query = `
    query {
      workspaces {
        id
        name
        description
        created_at
      }
    }
  `

  try {
    const data = await mondayQuery(query)
    return data.workspaces || []
  } catch (error) {
    console.error('Failed to fetch workspaces:', error)
    return []
  }
}

/**
 * Get user info
 */
export async function getCurrentUser() {
  const query = `
    query {
      me {
        id
        name
        email
        photo_original
        phone
        mobile_phone
        title
        birthday
        country_code
        location
        time_zone_identifier
        created_at
        account {
          id
          name
        }
      }
    }
  `

  try {
    const data = await mondayQuery(query)
    return data.me || null
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return null
  }
}

/**
 * Get all team members (users)
 */
export async function getTeamMembers() {
  const query = `
    query {
      users {
        id
        name
        email
        phone
        mobile_phone
        photo_original
        title
        birthday
        location
        created_at
        enabled
        is_guest
        is_pending
      }
    }
  `

  try {
    const data = await mondayQuery(query)
    console.log('Team members:', data.users)
    return data.users || []
  } catch (error) {
    console.error('Failed to fetch team members:', error)
    return []
  }
}

/**
 * Get board automations using REST API
 */
export async function getBoardAutomations(boardId) {
  try {
    const response = await fetch(`https://api.monday.com/v2/boards/${boardId}/automations`, {
      method: 'GET',
      headers: {
        'Authorization': MONDAY_API_TOKEN,
        'API-Version': '2024-01'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch automations: ${response.status}`)
    }

    const data = await response.json()
    console.log(`Board ${boardId} automations:`, data)
    return data.automations || []
  } catch (error) {
    console.error(`Failed to fetch automations for board ${boardId}:`, error)
    // Return empty array if automations can't be fetched
    return []
  }
}

/**
 * Map Monday.com board to Sunday format
 */
export function mapBoardToSunday(mondayBoard) {
  // Generate icon based on board name
  const getIcon = (name) => {
    if (name.includes('تسويق') || name.includes('Marketing')) return '📊'
    if (name.includes('تطوير') || name.includes('Development')) return '💻'
    if (name.includes('تصميم') || name.includes('Design')) return '🎨'
    if (name.includes('محتوى') || name.includes('Content')) return '✍️'
    if (name.includes('عملاء') || name.includes('Customer')) return '💬'
    if (name.includes('موارد') || name.includes('HR')) return '👥'
    if (name.includes('مبيعات') || name.includes('Sales')) return '💰'
    return '📱'
  }

  // Generate color based on index
  const colors = ['#6161FF', '#00CA72', '#FDAB3D', '#E44258', '#0073EA', '#FF158A', '#00D1CD']
  const colorIndex = parseInt(mondayBoard.id) % colors.length

  return {
    id: mondayBoard.id,
    name: mondayBoard.name,
    icon: getIcon(mondayBoard.name),
    color: colors[colorIndex],
    tasks: mondayBoard.items_count || 0,
    workspaceId: mondayBoard.workspace?.id || '1',
    workspaceName: mondayBoard.workspace?.name || 'Main Workspace'
  }
}

/**
 * Get single item (task) with all column values
 * This is useful for getting phone numbers and other data not sent in webhooks
 */
export async function getItem(itemId) {
  const query = `
    query ($itemId: ID!) {
      items(ids: [$itemId]) {
        id
        name
        state
        created_at
        updated_at
        board {
          id
          name
        }
        group {
          id
          title
        }
        creator {
          id
          name
          email
        }
        subscribers {
          id
          name
          email
        }
        column_values {
          id
          title
          text
          type
          value
        }
      }
    }
  `

  try {
    const data = await mondayQuery(query, { itemId: String(itemId) })
    if (data.items && data.items.length > 0) {
      console.log('✅ Fetched item from Monday:', data.items[0].name)
      return data.items[0]
    }
    console.log('⚠️ No item found with ID:', itemId)
    return null
  } catch (error) {
    console.error(`Failed to fetch item ${itemId}:`, error)
    return null
  }
}

/**
 * Map Monday.com workspace to Sunday format
 */
export function mapWorkspaceToSunday(mondayWorkspace, boards = []) {
  const getIcon = (name) => {
    if (name.includes('تسويق') || name.includes('Marketing')) return '📊'
    if (name.includes('تطوير') || name.includes('Development')) return '💻'
    if (name.includes('مبيعات') || name.includes('Sales')) return '💰'
    return '🏢'
  }

  const workspaceBoards = boards.filter(b =>
    b.workspace?.id === mondayWorkspace.id
  )

  return {
    id: mondayWorkspace.id,
    name: mondayWorkspace.name,
    icon: getIcon(mondayWorkspace.name),
    color: '#6161FF',
    members: 24, // Will need another API call to get actual members
    boards: workspaceBoards.length
  }
}
