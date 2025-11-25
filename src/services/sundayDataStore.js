/**
 * Sunday Local Data Store
 * قاعدة بيانات محلية لحفظ البوردات والمهام
 * البديل المحلي لـ Monday.com
 */

import firebaseBackup from './firebaseBackup'

class SundayDataStore {
  constructor() {
    this.storageKey = 'sunday_local_data'
    this.data = this.loadData()
    this.autoBackupEnabled = true // تفعيل النسخ الاحتياطي التلقائي
  }

  /**
   * تحميل البيانات من localStorage
   */
  loadData() {
    try {
      const saved = localStorage.getItem(this.storageKey)
      if (saved) {
        console.log('✅ Loaded data from localStorage')
        return JSON.parse(saved)
      } else {
        // إذا لم توجد بيانات محلية، حاول الاسترجاع من Firebase
        console.log('⚠️ No local data found, checking Firebase...')
        this.restoreFromFirebaseIfEmpty()
      }
    } catch (error) {
      console.error('Error loading Sunday data:', error)
    }

    // البيانات الافتراضية
    return {
      boards: [],
      items: {},
      users: [],
      workspaces: []
    }
  }

  /**
   * استرجاع تلقائي من Firebase إذا كان localStorage فارغاً
   */
  async restoreFromFirebaseIfEmpty() {
    try {
      const result = await firebaseBackup.restoreAllData()
      if (result.success && result.data) {
        console.log('✅ Restored data from Firebase automatically')
        this.data = {
          ...result.data,
          users: result.data.users || []
        }
        this.saveData(false) // حفظ في localStorage فقط (بدون backup إلى Firebase مرة أخرى)
      }
    } catch (error) {
      console.log('ℹ️ No Firebase backup found or error:', error.message)
    }
  }

  /**
   * حفظ البيانات
   * @param {boolean} backupToFirebase - حفظ نسخة احتياطية في Firebase (افتراضي: true)
   */
  async saveData(backupToFirebase = true) {
    try {
      // 1. حفظ في localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(this.data))
      console.log('💾 Sunday data saved to localStorage')

      // 2. حفظ في Firebase (إذا كان مفعلاً)
      if (backupToFirebase && this.autoBackupEnabled) {
        this.backupToFirebase()
      }
    } catch (error) {
      console.error('Error saving Sunday data:', error)
    }
  }

  /**
   * نسخ احتياطي إلى Firebase (بدون انتظار)
   */
  async backupToFirebase() {
    try {
      // نسخ احتياطي في الخلفية (لا ننتظر حتى لا نبطئ التطبيق)
      firebaseBackup.backupAllData(this.data).then(result => {
        if (result.success) {
          console.log('☁️ Backed up to Firebase successfully')
        } else {
          console.warn('⚠️ Firebase backup failed:', result.error)
        }
      })
    } catch (error) {
      console.warn('⚠️ Firebase backup error:', error.message)
    }
  }

  /**
   * الحصول على كل البوردات
   */
  getBoards() {
    return this.data.boards
  }

  /**
   * البحث عن بورد بالاسم
   */
  findBoardByName(boardName) {
    if (!boardName) return null

    const searchTerm = boardName.toLowerCase().trim()

    return this.data.boards.find(board =>
      board.name.toLowerCase().includes(searchTerm) ||
      searchTerm.includes(board.name.toLowerCase())
    )
  }

  /**
   * إنشاء بورد جديد
   */
  createBoard(boardName) {
    const newBoard = {
      id: `board_${Date.now()}`,
      name: boardName,
      groups: [],
      columns: [
        { id: 'name', title: 'اسم المهمة', type: 'text' },
        { id: 'person', title: 'الشخص', type: 'person' },
        { id: 'status', title: 'الحالة', type: 'status' },
        { id: 'date', title: 'التاريخ', type: 'date' }
      ],
      created_at: new Date().toISOString()
    }

    this.data.boards.push(newBoard)
    this.data.items[newBoard.id] = []
    this.saveData()

    console.log('✅ Created new board:', newBoard.name)
    return newBoard
  }

  /**
   * إنشاء مجموعة جديدة في بورد
   */
  createGroup(boardId, groupName) {
    const board = this.data.boards.find(b => b.id === boardId)
    if (!board) {
      throw new Error('Board not found')
    }

    const newGroup = {
      id: `group_${Date.now()}`,
      title: groupName,
      color: this.getRandomColor()
    }

    board.groups.push(newGroup)
    this.saveData()

    console.log('✅ Created new group:', groupName)
    return newGroup
  }

  /**
   * البحث عن مجموعة بالاسم
   */
  findGroupInBoard(boardId, groupName) {
    const board = this.data.boards.find(b => b.id === boardId)
    if (!board || !groupName) return null

    const searchTerm = groupName.toLowerCase().trim()

    return board.groups.find(group =>
      group.title.toLowerCase().includes(searchTerm) ||
      searchTerm.includes(group.title.toLowerCase())
    )
  }

  /**
   * إضافة مهمة جديدة
   */
  addItem(boardId, itemData) {
    const {
      name,
      groupId,
      assignee,
      status = 'جديدة',
      dueDate = null,
      createdBy = null,
      createdAt = null,
      source = 'app'
    } = itemData

    const newItem = {
      id: `item_${Date.now()}`,
      name: name,
      boardId: boardId,
      groupId: groupId,
      assignee: assignee,
      status: status,
      dueDate: dueDate,
      createdBy: createdBy, // { name, phone, avatar }
      source: source, // 'app', 'whatsapp', etc
      created_at: createdAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      state: 'active'
    }

    if (!this.data.items[boardId]) {
      this.data.items[boardId] = []
    }

    this.data.items[boardId].push(newItem)
    this.saveData()

    console.log('✅ Created new item:', newItem.name, createdBy ? `by ${createdBy.name}` : '')
    return newItem
  }

  /**
   * الحصول على مهام بورد
   */
  getItems(boardId, groupId = null) {
    const items = this.data.items[boardId] || []

    if (groupId) {
      return items.filter(item => item.groupId === groupId && item.state === 'active')
    }

    return items.filter(item => item.state === 'active')
  }

  /**
   * تحديث مهمة
   */
  updateItem(itemId, updates) {
    // ابحث عن المهمة في كل البوردات
    for (const boardId in this.data.items) {
      const items = this.data.items[boardId]
      const itemIndex = items.findIndex(item => item.id === itemId)

      if (itemIndex !== -1) {
        items[itemIndex] = {
          ...items[itemIndex],
          ...updates,
          updated_at: new Date().toISOString()
        }

        this.saveData()
        console.log('✅ Updated item:', items[itemIndex].name)
        return items[itemIndex]
      }
    }

    throw new Error('Item not found')
  }

  /**
   * حذف مهمة (أرشفة)
   */
  deleteItem(itemId) {
    return this.updateItem(itemId, { state: 'archived' })
  }

  /**
   * البحث عن مستخدم بالاسم
   */
  findUserByName(userName) {
    if (!userName) return null

    const searchTerm = userName.toLowerCase().trim()

    return this.data.users.find(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      searchTerm.includes(user.name.toLowerCase())
    )
  }

  /**
   * إضافة مستخدم
   */
  addUser(userData) {
    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      phone: userData.phone || null,
      email: userData.email || null,
      created_at: new Date().toISOString()
    }

    this.data.users.push(newUser)
    this.saveData()

    console.log('✅ Added user:', newUser.name)
    return newUser
  }

  /**
   * استيراد بيانات من Monday
   */
  async importFromMonday(mondayData) {
    try {
      console.log('📥 Importing data from Monday...')

      // استيراد البوردات
      if (mondayData.boards) {
        this.data.boards = mondayData.boards.map(board => ({
          id: board.id,
          name: board.name,
          description: board.description,
          groups: board.groups || [],
          columns: board.columns || [],
          created_at: board.created_at || new Date().toISOString(),
          source: 'monday'
        }))
      }

      // استيراد المهام
      if (mondayData.items) {
        this.data.items = {}

        for (const [boardId, items] of Object.entries(mondayData.items)) {
          this.data.items[boardId] = items.map(item => ({
            id: item.id,
            name: item.name,
            boardId: boardId,
            groupId: item.group?.id,
            assignee: item.creator?.name,
            status: this.extractStatus(item),
            dueDate: this.extractDate(item),
            created_at: item.created_at,
            updated_at: item.updated_at,
            state: item.state || 'active',
            source: 'monday'
          }))
        }
      }

      this.saveData()
      console.log('✅ Import completed successfully')

      return {
        success: true,
        boardsImported: this.data.boards.length,
        itemsImported: Object.values(this.data.items).reduce((sum, items) => sum + items.length, 0)
      }

    } catch (error) {
      console.error('❌ Import failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * استخراج الحالة من بيانات Monday
   */
  extractStatus(item) {
    if (!item.column_values) return 'جديدة'

    const statusCol = item.column_values.find(col => col.type === 'color' || col.title?.includes('الحالة'))
    return statusCol?.text || 'جديدة'
  }

  /**
   * استخراج التاريخ من بيانات Monday
   */
  extractDate(item) {
    if (!item.column_values) return null

    const dateCol = item.column_values.find(col => col.type === 'date')
    return dateCol?.text || null
  }

  /**
   * الحصول على لون عشوائي
   */
  getRandomColor() {
    const colors = ['#6161FF', '#00CA72', '#FDAB3D', '#E44258', '#0073EA', '#FF158A', '#00D1CD']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  /**
   * الحصول على إحصائيات
   */
  getStats() {
    const totalItems = Object.values(this.data.items).reduce((sum, items) => sum + items.length, 0)
    const activeItems = Object.values(this.data.items).reduce((sum, items) =>
      sum + items.filter(i => i.state === 'active').length, 0
    )

    return {
      boards: this.data.boards.length,
      items: totalItems,
      activeItems: activeItems,
      users: this.data.users.length
    }
  }

  /**
   * مسح كل البيانات
   */
  clearAll() {
    this.data = {
      boards: [],
      items: {},
      users: [],
      workspaces: []
    }
    this.saveData(false) // مسح localStorage فقط، لا نمسح Firebase
    console.log('🗑️ All data cleared from localStorage')
  }

  /**
   * نسخ احتياطي يدوي إلى Firebase
   */
  async manualBackupToFirebase() {
    try {
      console.log('🔄 Starting manual backup to Firebase...')
      const result = await firebaseBackup.backupAllData(this.data)
      return result
    } catch (error) {
      console.error('❌ Manual backup failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * استرجاع يدوي من Firebase
   */
  async manualRestoreFromFirebase() {
    try {
      console.log('🔄 Starting manual restore from Firebase...')
      const result = await firebaseBackup.restoreAllData()

      if (result.success && result.data) {
        this.data = {
          ...result.data,
          users: result.data.users || []
        }
        this.saveData(false) // حفظ في localStorage فقط
        console.log('✅ Data restored from Firebase')
      }

      return result
    } catch (error) {
      console.error('❌ Manual restore failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * الحصول على معلومات آخر نسخة احتياطية
   */
  async getBackupInfo() {
    try {
      return await firebaseBackup.getBackupMetadata()
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * تفعيل/تعطيل النسخ الاحتياطي التلقائي
   */
  toggleAutoBackup(enabled) {
    this.autoBackupEnabled = enabled
    localStorage.setItem('sunday_auto_backup', enabled ? 'true' : 'false')
    console.log(`🔄 Auto backup ${enabled ? 'enabled' : 'disabled'}`)
  }
}

// إنشاء instance واحد
const sundayDataStore = new SundayDataStore()

export default sundayDataStore
