/**
 * Firebase Firestore Backup Service
 * حفظ واسترجاع البيانات من Firebase Firestore
 */

import { firestore as db } from '../firebase/config'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'

class FirebaseBackup {
  constructor() {
    this.collections = {
      boards: 'sunday_boards',
      items: 'sunday_items',
      workspaces: 'sunday_workspaces',
      metadata: 'sunday_metadata'
    }
  }

  /**
   * حفظ كل البيانات في Firebase
   */
  async backupAllData(data) {
    try {
      console.log('🔥 Starting Firebase backup...')
      const startTime = Date.now()

      const companyId = this.getCompanyId()

      // 1. حفظ البوردات
      if (data.boards && data.boards.length > 0) {
        for (const board of data.boards) {
          await setDoc(doc(db, this.collections.boards, `${companyId}_${board.id}`), {
            ...board,
            companyId,
            updatedAt: new Date().toISOString()
          })
        }
        console.log(`   ✅ Backed up ${data.boards.length} boards`)
      }

      // 2. حفظ المهام
      if (data.items) {
        for (const [boardId, items] of Object.entries(data.items)) {
          if (items && items.length > 0) {
            for (const item of items) {
              await setDoc(doc(db, this.collections.items, `${companyId}_${item.id}`), {
                ...item,
                companyId,
                boardId,
                updatedAt: new Date().toISOString()
              })
            }
          }
        }

        const totalItems = Object.values(data.items).flat().length
        console.log(`   ✅ Backed up ${totalItems} items`)
      }

      // 3. حفظ Workspaces
      if (data.workspaces && data.workspaces.length > 0) {
        for (const workspace of data.workspaces) {
          await setDoc(doc(db, this.collections.workspaces, `${companyId}_${workspace.id}`), {
            ...workspace,
            companyId,
            updatedAt: new Date().toISOString()
          })
        }
        console.log(`   ✅ Backed up ${data.workspaces.length} workspaces`)
      }

      // 4. حفظ Metadata
      await setDoc(doc(db, this.collections.metadata, companyId), {
        companyId,
        lastBackup: new Date().toISOString(),
        boardsCount: data.boards?.length || 0,
        itemsCount: data.items ? Object.values(data.items).flat().length : 0,
        workspacesCount: data.workspaces?.length || 0
      })

      const duration = ((Date.now() - startTime) / 1000).toFixed(2)
      console.log(`✅ Firebase backup completed in ${duration}s`)

      return {
        success: true,
        duration: `${duration}s`,
        timestamp: new Date().toISOString()
      }

    } catch (error) {
      console.error('❌ Firebase backup failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * استرجاع كل البيانات من Firebase
   */
  async restoreAllData() {
    try {
      console.log('🔥 Starting Firebase restore...')
      const startTime = Date.now()

      const companyId = this.getCompanyId()

      const restoredData = {
        boards: [],
        items: {},
        workspaces: []
      }

      // 1. استرجاع البوردات
      const boardsSnapshot = await getDocs(
        query(collection(db, this.collections.boards), where('companyId', '==', companyId))
      )

      boardsSnapshot.forEach(doc => {
        const board = doc.data()
        delete board.companyId
        delete board.updatedAt
        restoredData.boards.push(board)
      })
      console.log(`   ✅ Restored ${restoredData.boards.length} boards`)

      // 2. استرجاع المهام
      const itemsSnapshot = await getDocs(
        query(collection(db, this.collections.items), where('companyId', '==', companyId))
      )

      itemsSnapshot.forEach(doc => {
        const item = doc.data()
        const boardId = item.boardId

        delete item.companyId
        delete item.updatedAt

        if (!restoredData.items[boardId]) {
          restoredData.items[boardId] = []
        }
        restoredData.items[boardId].push(item)
      })

      const totalItems = Object.values(restoredData.items).flat().length
      console.log(`   ✅ Restored ${totalItems} items`)

      // 3. استرجاع Workspaces
      const workspacesSnapshot = await getDocs(
        query(collection(db, this.collections.workspaces), where('companyId', '==', companyId))
      )

      workspacesSnapshot.forEach(doc => {
        const workspace = doc.data()
        delete workspace.companyId
        delete workspace.updatedAt
        restoredData.workspaces.push(workspace)
      })
      console.log(`   ✅ Restored ${restoredData.workspaces.length} workspaces`)

      const duration = ((Date.now() - startTime) / 1000).toFixed(2)
      console.log(`✅ Firebase restore completed in ${duration}s`)

      return {
        success: true,
        data: restoredData,
        duration: `${duration}s`
      }

    } catch (error) {
      console.error('❌ Firebase restore failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * حفظ بورد واحد
   */
  async backupBoard(board) {
    try {
      const companyId = this.getCompanyId()
      await setDoc(doc(db, this.collections.boards, `${companyId}_${board.id}`), {
        ...board,
        companyId,
        updatedAt: new Date().toISOString()
      })
      return { success: true }
    } catch (error) {
      console.error('Error backing up board:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * حفظ مهمة واحدة
   */
  async backupItem(item) {
    try {
      const companyId = this.getCompanyId()
      await setDoc(doc(db, this.collections.items, `${companyId}_${item.id}`), {
        ...item,
        companyId,
        updatedAt: new Date().toISOString()
      })
      return { success: true }
    } catch (error) {
      console.error('Error backing up item:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * حذف مهمة من Firebase
   */
  async deleteItem(itemId) {
    try {
      const companyId = this.getCompanyId()
      await deleteDoc(doc(db, this.collections.items, `${companyId}_${itemId}`))
      return { success: true }
    } catch (error) {
      console.error('Error deleting item from Firebase:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * الحصول على معلومات آخر نسخة احتياطية
   */
  async getBackupMetadata() {
    try {
      const companyId = this.getCompanyId()
      const metadataDoc = await getDoc(doc(db, this.collections.metadata, companyId))

      if (metadataDoc.exists()) {
        return {
          success: true,
          metadata: metadataDoc.data()
        }
      } else {
        return {
          success: false,
          message: 'No backup found'
        }
      }
    } catch (error) {
      console.error('Error getting backup metadata:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * الحصول على company ID (من localStorage أو user)
   */
  getCompanyId() {
    // يمكنك تخصيص هذا حسب نظامك
    const companyId = localStorage.getItem('company_id') || 'default_company'
    return companyId
  }

  /**
   * تعيين company ID
   */
  setCompanyId(companyId) {
    localStorage.setItem('company_id', companyId)
  }
}

const firebaseBackup = new FirebaseBackup()
export default firebaseBackup
