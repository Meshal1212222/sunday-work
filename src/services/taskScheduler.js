/**
 * Task Scheduler Service
 * مراقبة تلقائية للمهام وإرسال التذكيرات
 */

import mondayService from './mondayService'
import mondayWebhookService from './mondayWebhook'
import ultraMsgService from './ultramsg'

class TaskSchedulerService {
  constructor() {
    this.isRunning = false
    this.checkInterval = null
    this.checkIntervalMinutes = 60 // كل ساعة
  }

  /**
   * بدء المراقبة التلقائية
   */
  start() {
    if (this.isRunning) {
      console.log('⚠️  Scheduler is already running')
      return
    }

    console.log('🚀 Starting Task Scheduler...')
    this.isRunning = true

    // فحص فوري
    this.checkAllTasks()

    // فحص دوري كل ساعة
    this.checkInterval = setInterval(() => {
      this.checkAllTasks()
    }, this.checkIntervalMinutes * 60 * 1000)

    console.log(`✅ Scheduler started (checking every ${this.checkIntervalMinutes} minutes)`)
  }

  /**
   * إيقاف المراقبة
   */
  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
      this.checkInterval = null
    }
    this.isRunning = false
    console.log('⏸️  Scheduler stopped')
  }

  /**
   * فحص جميع المهام
   */
  async checkAllTasks() {
    try {
      console.log('🔍 Checking all tasks for deadlines...')

      // جلب جميع البوردات
      const boards = await mondayService.getBoards()

      if (!boards || boards.length === 0) {
        console.log('⚠️  No boards found')
        return
      }

      // فحص كل بورد
      for (const board of boards) {
        await this.checkBoardTasks(board.id)
      }

      console.log('✅ Task check completed')
    } catch (error) {
      console.error('❌ Error checking tasks:', error)
    }
  }

  /**
   * فحص مهام بورد معين
   */
  async checkBoardTasks(boardId) {
    try {
      // جلب المهام
      const board = await mondayService.getBoardItems(boardId)

      if (!board || !board.items) {
        return
      }

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      // فحص كل مهمة
      for (const item of board.items) {
        await this.checkTaskDeadline(item, board.name, today, tomorrow)
      }
    } catch (error) {
      console.error(`Error checking board ${boardId}:`, error)
    }
  }

  /**
   * فحص موعد مهمة واحدة
   */
  async checkTaskDeadline(item, boardName, today, tomorrow) {
    try {
      // استخراج تاريخ التسليم
      const dateColumn = item.column_values.find(col => col.type === 'date')
      if (!dateColumn || !dateColumn.text) {
        return // لا يوجد تاريخ
      }

      const dueDate = new Date(dateColumn.text)
      dueDate.setHours(0, 0, 0, 0)

      // استخراج بيانات الموظف
      const personColumn = item.column_values.find(col =>
        col.type === 'multiple-person' || col.type === 'person'
      )

      if (!personColumn) {
        return // لا يوجد موظف مسؤول
      }

      let assigneeName = 'الموظف'
      let assigneePhone = null

      try {
        if (personColumn.value) {
          const personData = JSON.parse(personColumn.value)
          if (personData.personsAndTeams && personData.personsAndTeams.length > 0) {
            assigneeName = personData.personsAndTeams[0].name || personColumn.text || 'الموظف'
            // محاولة الحصول على الرقم من قاعدة Leads
            const lead = mondayWebhookService.findLeadById(personData.personsAndTeams[0].id)
            if (lead && lead.phone) {
              assigneePhone = lead.phone
            }
          }
        }
      } catch (e) {
        assigneeName = personColumn.text || 'الموظف'
      }

      // البحث عن رقم الموظف في أعمدة المهمة
      if (!assigneePhone) {
        const phoneColumn = item.column_values.find(col =>
          col.type === 'phone' ||
          col.title?.toLowerCase().includes('phone') ||
          col.title?.toLowerCase().includes('واتساب') ||
          col.title?.toLowerCase().includes('جوال')
        )
        if (phoneColumn && phoneColumn.text) {
          assigneePhone = phoneColumn.text
        }
      }

      if (!assigneePhone) {
        console.log(`⚠️  No phone number for task: ${item.name}`)
        return // لا يوجد رقم للموظف
      }

      // استخراج الحالة
      const statusColumn = item.column_values.find(col => col.type === 'color')
      const status = statusColumn?.text || 'غير محدد'

      // تحقق: الموعد غداً (تذكير)
      if (dueDate.getTime() === tomorrow.getTime()) {
        console.log(`📅 Task "${item.name}" due tomorrow - sending reminder`)
        await this.sendDeadlineReminder(item.name, boardName, assigneeName, assigneePhone, status, 1)
      }

      // تحقق: الموعد قد انتهى (تنبيه)
      if (dueDate < today) {
        const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))
        console.log(`⚠️  Task "${item.name}" is ${daysOverdue} day(s) overdue - sending alert`)
        await this.sendOverdueAlert(item.name, boardName, assigneeName, assigneePhone, status, daysOverdue)
      }

    } catch (error) {
      console.error(`Error checking task ${item.name}:`, error)
    }
  }

  /**
   * إرسال تذكير بموعد قريب
   */
  async sendDeadlineReminder(taskName, boardName, assigneeName, assigneePhone, status, daysLeft) {
    try {
      // التحقق من إعدادات Ultra MSG
      const config = mondayWebhookService.getUltraMsgConfig()
      if (!config) {
        console.log('⚠️  Ultra MSG not configured')
        return
      }

      ultraMsgService.configure(config.apiUrl, config.instanceId, config.token)

      const message = `تنبيه مهم يا ${assigneeName} ⏰

موعد المهمة قريب:

📋 المهمة: ${taskName}
🏢 القسم: ${boardName}
⏰ المتبقي: ${daysLeft} ${daysLeft === 1 ? 'يوم' : 'أيام'}
✅ الحالة: ${status}

لا تنسى! 🔔`

      await ultraMsgService.sendMessage(assigneePhone, message)
      console.log(`✅ Reminder sent to ${assigneeName} (${assigneePhone})`)
    } catch (error) {
      console.error('Error sending deadline reminder:', error)
    }
  }

  /**
   * إرسال تنبيه بتجاوز الموعد
   */
  async sendOverdueAlert(taskName, boardName, assigneeName, assigneePhone, status, daysOverdue) {
    try {
      // التحقق من إعدادات Ultra MSG
      const config = mondayWebhookService.getUltraMsgConfig()
      if (!config) {
        console.log('⚠️  Ultra MSG not configured')
        return
      }

      ultraMsgService.configure(config.apiUrl, config.instanceId, config.token)

      const message = `🚨 تنبيه عاجل يا ${assigneeName}!

المهمة تجاوزت تاريخ التسليم:

📋 المهمة: ${taskName}
📂 القسم: ${boardName}
⏰ متأخرة بـ: ${daysOverdue} ${daysOverdue === 1 ? 'يوم' : 'أيام'}
🎨 الحالة: ${status}

⚠️  يرجى المتابعة فوراً!
التأخير يؤثر على سير العمل.`

      await ultraMsgService.sendMessage(assigneePhone, message)
      console.log(`✅ Overdue alert sent to ${assigneeName} (${assigneePhone})`)
    } catch (error) {
      console.error('Error sending overdue alert:', error)
    }
  }

  /**
   * تغيير فترة الفحص (بالدقائق)
   */
  setCheckInterval(minutes) {
    this.checkIntervalMinutes = minutes

    if (this.isRunning) {
      this.stop()
      this.start()
    }
  }

  /**
   * الحصول على حالة الـ Scheduler
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      checkIntervalMinutes: this.checkIntervalMinutes,
      nextCheckIn: this.isRunning
        ? `${this.checkIntervalMinutes} minutes`
        : 'Not scheduled'
    }
  }
}

// إنشاء instance واحد
const taskSchedulerService = new TaskSchedulerService()

// بدء تلقائي عند تحميل الصفحة
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // تأخير 5 ثواني بعد تحميل الصفحة
    setTimeout(() => {
      taskSchedulerService.start()
    }, 5000)
  })
}

export default taskSchedulerService
