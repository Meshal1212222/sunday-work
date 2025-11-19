/**
 * Local Data Store Service
 * يحفظ نسخة كاملة من بيانات Monday.com محلياً
 * بما في ذلك البوردات والمهام المؤرشفة
 */

import { getBoards, getBoardItems, getWorkspaces } from './mondayService'

class LocalDataStore {
  constructor() {
    this.storageKeys = {
      boards: 'sunday_boards',
      items: 'sunday_items',
      workspaces: 'sunday_workspaces',
      syncStatus: 'sunday_sync_status',
      archivedBoards: 'sunday_archived_boards',
      archivedItems: 'sunday_archived_items'
    }
  }

  /**
   * سحب كل البيانات من Monday وحفظها محلياً
   */
  async syncAllDataFromMonday() {
    try {
      console.log('🔄 Starting full sync from Monday.com...')
      const startTime = Date.now()

      const syncStatus = {
        startedAt: new Date().toISOString(),
        status: 'in_progress',
        progress: {
          workspaces: 0,
          boards: 0,
          items: 0,
          archived_boards: 0,
          archived_items: 0
        }
      }

      this.saveSyncStatus(syncStatus)

      // 1. سحب Workspaces
      console.log('📂 Syncing workspaces...')
      const workspaces = await getWorkspaces()
      this.saveWorkspaces(workspaces)
      syncStatus.progress.workspaces = workspaces.length
      this.saveSyncStatus(syncStatus)

      // 2. سحب كل البوردات (نشطة ومؤرشفة)
      console.log('📊 Syncing boards...')
      const allBoards = await getBoards(true) // Include archived

      const activeBoards = allBoards.filter(b => b.state === 'active')
      const archivedBoards = allBoards.filter(b => b.state === 'archived')

      this.saveBoards(activeBoards)
      this.saveArchivedBoards(archivedBoards)

      syncStatus.progress.boards = activeBoards.length
      syncStatus.progress.archived_boards = archivedBoards.length
      this.saveSyncStatus(syncStatus)

      console.log(`   ✅ Active boards: ${activeBoards.length}`)
      console.log(`   📦 Archived boards: ${archivedBoards.length}`)

      // 3. سحب كل المهام من كل البوردات
      console.log('📋 Syncing items from all boards...')

      const allItems = {}
      const archivedItems = {}
      let totalActiveItems = 0
      let totalArchivedItems = 0

      for (const board of allBoards) {
        console.log(`   📋 Syncing items from board: ${board.name}`)

        try {
          const items = await getBoardItems(board.id, true) // Include archived

          const activeItems = items.filter(i => i.state === 'active')
          const boardArchivedItems = items.filter(i => i.state === 'archived')

          allItems[board.id] = activeItems
          archivedItems[board.id] = boardArchivedItems

          totalActiveItems += activeItems.length
          totalArchivedItems += boardArchivedItems.length

          console.log(`      ✅ ${activeItems.length} active, 📦 ${boardArchivedItems.length} archived`)
        } catch (error) {
          console.error(`   ❌ Failed to sync board ${board.id}:`, error)
          allItems[board.id] = []
          archivedItems[board.id] = []
        }

        // تحديث التقدم
        syncStatus.progress.items = totalActiveItems
        syncStatus.progress.archived_items = totalArchivedItems
        this.saveSyncStatus(syncStatus)
      }

      this.saveItems(allItems)
      this.saveArchivedItems(archivedItems)

      // 4. إنهاء المزامنة
      const endTime = Date.now()
      const duration = ((endTime - startTime) / 1000).toFixed(2)

      syncStatus.status = 'completed'
      syncStatus.completedAt = new Date().toISOString()
      syncStatus.duration = `${duration}s`
      this.saveSyncStatus(syncStatus)

      console.log(`✅ Sync completed in ${duration}s`)
      console.log(`📊 Summary:`)
      console.log(`   - Workspaces: ${workspaces.length}`)
      console.log(`   - Active Boards: ${activeBoards.length}`)
      console.log(`   - Archived Boards: ${archivedBoards.length}`)
      console.log(`   - Active Items: ${totalActiveItems}`)
      console.log(`   - Archived Items: ${totalArchivedItems}`)
      console.log(`   - Total: ${totalActiveItems + totalArchivedItems} items`)

      return {
        success: true,
        summary: {
          workspaces: workspaces.length,
          boards: activeBoards.length,
          archivedBoards: archivedBoards.length,
          items: totalActiveItems,
          archivedItems: totalArchivedItems,
          total: totalActiveItems + totalArchivedItems,
          duration: `${duration}s`
        }
      }

    } catch (error) {
      console.error('❌ Sync failed:', error)

      const syncStatus = {
        status: 'failed',
        error: error.message,
        failedAt: new Date().toISOString()
      }
      this.saveSyncStatus(syncStatus)

      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * حفظ Workspaces
   */
  saveWorkspaces(workspaces) {
    try {
      localStorage.setItem(this.storageKeys.workspaces, JSON.stringify(workspaces))
      console.log(`💾 Saved ${workspaces.length} workspaces`)
    } catch (error) {
      console.error('Failed to save workspaces:', error)
    }
  }

  /**
   * حفظ البوردات النشطة
   */
  saveBoards(boards) {
    try {
      localStorage.setItem(this.storageKeys.boards, JSON.stringify(boards))
      console.log(`💾 Saved ${boards.length} active boards`)
    } catch (error) {
      console.error('Failed to save boards:', error)
    }
  }

  /**
   * حفظ البوردات المؤرشفة
   */
  saveArchivedBoards(boards) {
    try {
      localStorage.setItem(this.storageKeys.archivedBoards, JSON.stringify(boards))
      console.log(`💾 Saved ${boards.length} archived boards`)
    } catch (error) {
      console.error('Failed to save archived boards:', error)
    }
  }

  /**
   * حفظ المهام النشطة
   */
  saveItems(items) {
    try {
      localStorage.setItem(this.storageKeys.items, JSON.stringify(items))
      const totalItems = Object.values(items).reduce((sum, boardItems) => sum + boardItems.length, 0)
      console.log(`💾 Saved ${totalItems} active items`)
    } catch (error) {
      console.error('Failed to save items:', error)
    }
  }

  /**
   * حفظ المهام المؤرشفة
   */
  saveArchivedItems(items) {
    try {
      localStorage.setItem(this.storageKeys.archivedItems, JSON.stringify(items))
      const totalItems = Object.values(items).reduce((sum, boardItems) => sum + boardItems.length, 0)
      console.log(`💾 Saved ${totalItems} archived items`)
    } catch (error) {
      console.error('Failed to save archived items:', error)
    }
  }

  /**
   * حفظ حالة المزامنة
   */
  saveSyncStatus(status) {
    try {
      localStorage.setItem(this.storageKeys.syncStatus, JSON.stringify(status))
    } catch (error) {
      console.error('Failed to save sync status:', error)
    }
  }

  /**
   * جلب Workspaces المحفوظة
   */
  getWorkspaces() {
    try {
      const data = localStorage.getItem(this.storageKeys.workspaces)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Failed to get workspaces:', error)
      return []
    }
  }

  /**
   * جلب البوردات النشطة
   */
  getBoards() {
    try {
      const data = localStorage.getItem(this.storageKeys.boards)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Failed to get boards:', error)
      return []
    }
  }

  /**
   * جلب البوردات المؤرشفة
   */
  getArchivedBoards() {
    try {
      const data = localStorage.getItem(this.storageKeys.archivedBoards)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Failed to get archived boards:', error)
      return []
    }
  }

  /**
   * جلب المهام النشطة
   */
  getItems(boardId = null) {
    try {
      const data = localStorage.getItem(this.storageKeys.items)
      const allItems = data ? JSON.parse(data) : {}

      if (boardId) {
        return allItems[boardId] || []
      }

      return allItems
    } catch (error) {
      console.error('Failed to get items:', error)
      return boardId ? [] : {}
    }
  }

  /**
   * جلب المهام المؤرشفة
   */
  getArchivedItems(boardId = null) {
    try {
      const data = localStorage.getItem(this.storageKeys.archivedItems)
      const allItems = data ? JSON.parse(data) : {}

      if (boardId) {
        return allItems[boardId] || []
      }

      return allItems
    } catch (error) {
      console.error('Failed to get archived items:', error)
      return boardId ? [] : {}
    }
  }

  /**
   * جلب حالة المزامنة
   */
  getSyncStatus() {
    try {
      const data = localStorage.getItem(this.storageKeys.syncStatus)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to get sync status:', error)
      return null
    }
  }

  /**
   * مسح كل البيانات المحفوظة
   */
  clearAll() {
    try {
      Object.values(this.storageKeys).forEach(key => {
        localStorage.removeItem(key)
      })
      console.log('✅ Cleared all local data')
      return { success: true }
    } catch (error) {
      console.error('Failed to clear data:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * الحصول على إحصائيات البيانات المحفوظة
   */
  getStats() {
    const boards = this.getBoards()
    const archivedBoards = this.getArchivedBoards()
    const items = this.getItems()
    const archivedItems = this.getArchivedItems()
    const workspaces = this.getWorkspaces()
    const syncStatus = this.getSyncStatus()

    const totalActiveItems = Object.values(items).reduce((sum, boardItems) => sum + boardItems.length, 0)
    const totalArchivedItems = Object.values(archivedItems).reduce((sum, boardItems) => sum + boardItems.length, 0)

    return {
      workspaces: workspaces.length,
      boards: boards.length,
      archivedBoards: archivedBoards.length,
      items: totalActiveItems,
      archivedItems: totalArchivedItems,
      total: totalActiveItems + totalArchivedItems,
      lastSync: syncStatus?.completedAt || null,
      syncStatus: syncStatus?.status || 'never'
    }
  }
}

// إنشاء instance واحد
const localDataStore = new LocalDataStore()

export default localDataStore
