/**
 * Monday.com Webhook Integration Service
 * يستقبل التحديثات من Monday.com ويعالجها تلقائياً
 */

import ultraMsgService from './ultramsg'

class MondayWebhookService {
  constructor() {
    this.webhookUrl = null
    this.automationRules = []
    this.loadAutomationRules()
  }

  /**
   * تحميل قواعد الأتمتة من localStorage
   */
  loadAutomationRules() {
    try {
      const saved = localStorage.getItem('whatsapp_automation_rules')
      if (saved) {
        this.automationRules = JSON.parse(saved)
      } else {
        // القواعد الافتراضية (نسخة من Zapier)
        this.automationRules = [
          {
            id: 'wa-1',
            name: 'إرسال واتساب عند تغيير الحالة',
            trigger: 'column_changed',
            triggerColumn: 'status',
            condition: null,
            action: 'send_whatsapp',
            active: true,
            messageTemplate: 'status_change'
          },
          {
            id: 'wa-2',
            name: 'إرسال واتساب عند تعيين موظف',
            trigger: 'column_changed',
            triggerColumn: 'person',
            condition: null,
            action: 'send_whatsapp',
            active: true,
            messageTemplate: 'task_assigned'
          },
          {
            id: 'wa-3',
            name: 'إرسال واتساب عند اقتراب الموعد',
            trigger: 'date_approaching',
            triggerColumn: 'date',
            condition: { daysBefor: 1 },
            action: 'send_whatsapp',
            active: true,
            messageTemplate: 'deadline_reminder'
          },
          {
            id: 'wa-4',
            name: 'إرسال واتساب عند التأخير',
            trigger: 'column_changed',
            triggerColumn: 'status',
            condition: { statusValue: 'متأخر' },
            action: 'send_whatsapp',
            active: true,
            messageTemplate: 'task_overdue'
          }
        ]
        this.saveAutomationRules()
      }
    } catch (error) {
      console.error('Error loading automation rules:', error)
      this.automationRules = []
    }
  }

  /**
   * حفظ قواعد الأتمتة إلى localStorage
   */
  saveAutomationRules() {
    try {
      localStorage.setItem('whatsapp_automation_rules', JSON.stringify(this.automationRules))
    } catch (error) {
      console.error('Error saving automation rules:', error)
    }
  }

  /**
   * معالجة webhook من Monday.com
   * @param {Object} webhookData - البيانات الواردة من Monday
   */
  async processWebhook(webhookData) {
    try {
      console.log('📥 Monday Webhook Received:', webhookData)

      const { event, pulseId, pulseName, boardId, columnId, columnType, value, userId } = webhookData

      // البحث عن القواعد المطابقة
      const matchingRules = this.automationRules.filter(rule => {
        if (!rule.active) return false

        // تحقق من نوع الحدث
        if (rule.trigger === 'column_changed' && event === 'change_column_value') {
          if (rule.triggerColumn === 'status' && columnType === 'color') return true
          if (rule.triggerColumn === 'person' && columnType === 'multiple-person') return true
          if (rule.triggerColumn === 'date' && columnType === 'date') return true
        }

        return false
      })

      console.log(`✅ Found ${matchingRules.length} matching rules`)

      // تنفيذ كل قاعدة مطابقة
      for (const rule of matchingRules) {
        await this.executeRule(rule, webhookData)
      }

      return { success: true, rulesExecuted: matchingRules.length }
    } catch (error) {
      console.error('Error processing webhook:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * تنفيذ قاعدة أتمتة
   * @param {Object} rule - القاعدة المراد تنفيذها
   * @param {Object} data - بيانات الحدث
   */
  async executeRule(rule, data) {
    try {
      console.log(`🎯 Executing rule: ${rule.name}`)

      if (rule.action === 'send_whatsapp') {
        await this.sendWhatsAppNotification(rule, data)
      }

      return { success: true }
    } catch (error) {
      console.error(`Error executing rule ${rule.id}:`, error)
      return { success: false, error: error.message }
    }
  }

  /**
   * إرسال إشعار واتساب
   * @param {Object} rule - قاعدة الأتمتة
   * @param {Object} data - بيانات المهمة
   */
  async sendWhatsAppNotification(rule, data) {
    try {
      // استخراج رقم الموظف من البيانات
      const phoneNumber = this.extractPhoneNumber(data)
      if (!phoneNumber) {
        console.log('⚠️  No phone number found, skipping WhatsApp send')
        return { success: false, message: 'No phone number' }
      }

      // استخراج اسم الموظف
      const assigneeName = this.extractAssigneeName(data)

      // إنشاء الرسالة بناءً على القالب
      const message = this.generateMessage(rule.messageTemplate, data, assigneeName)

      // التحقق من إعدادات Ultra MSG
      const config = this.getUltraMsgConfig()
      if (!config) {
        console.log('⚠️  Ultra MSG not configured')
        return { success: false, message: 'Ultra MSG not configured' }
      }

      // تهيئة Ultra MSG
      ultraMsgService.configure(config.apiUrl, config.instanceId, config.token)

      // إرسال الرسالة
      console.log(`📤 Sending WhatsApp to ${phoneNumber}`)
      const response = await ultraMsgService.sendMessage(phoneNumber, message)

      console.log('📨 WhatsApp Response:', response)
      return response

    } catch (error) {
      console.error('Error sending WhatsApp notification:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * استخراج رقم الهاتف من بيانات Monday
   */
  extractPhoneNumber(data) {
    // يمكن أن يكون الرقم في عدة أماكن
    // 1. في columnValue إذا كان النوع phone
    // 2. في custom field
    // 3. في user profile

    if (data.phoneNumber) return data.phoneNumber
    if (data.assigneePhone) return data.assigneePhone

    // محاولة استخراجه من column values
    if (data.columnValues) {
      const phoneCol = data.columnValues.find(col =>
        col.type === 'phone' ||
        col.title?.toLowerCase().includes('phone') ||
        col.title?.toLowerCase().includes('واتساب') ||
        col.title?.toLowerCase().includes('جوال')
      )
      if (phoneCol) return phoneCol.text || phoneCol.value
    }

    return null
  }

  /**
   * استخراج اسم الموظف من بيانات Monday
   */
  extractAssigneeName(data) {
    if (data.assigneeName) return data.assigneeName
    if (data.personName) return data.personName

    // محاولة استخراجه من column values
    if (data.columnValues) {
      const personCol = data.columnValues.find(col =>
        col.type === 'multiple-person' || col.type === 'person'
      )
      if (personCol) {
        try {
          const parsed = JSON.parse(personCol.value)
          if (parsed.personsAndTeams && parsed.personsAndTeams.length > 0) {
            return parsed.personsAndTeams[0].name
          }
        } catch (e) {
          return personCol.text
        }
      }
    }

    return 'الموظف'
  }

  /**
   * إنشاء رسالة بناءً على القالب
   */
  generateMessage(template, data, assigneeName) {
    const taskName = data.pulseName || data.itemName || 'المهمة'
    const boardName = data.boardName || 'البورد'
    const status = data.statusText || data.value || 'غير محدد'

    const templates = {
      status_change: `هلا وغلا يا ${assigneeName} 😃✨

تم تحديث حالة المهمة:

📋 المهمة: ${taskName}
🏢 القسم: ${boardName}
✅ الحالة الجديدة: ${status}

ياليت تطلع عليها 👀`,

      task_assigned: `هلا وغلا يا ${assigneeName} 😃✨

تم تعيينك على مهمة جديدة:

📋 المهمة: ${taskName}
🏢 القسم: ${boardName}
✅ الحالة: ${status}

ياليت تطلع عليها 👀`,

      deadline_reminder: `تنبيه مهم يا ${assigneeName} ⏰

موعد المهمة قريب:

📋 المهمة: ${taskName}
🏢 القسم: ${boardName}
⏰ الموعد: غداً

لا تنسى! 🔔`,

      task_overdue: `تنبيه عاجل يا ${assigneeName} 🚨

المهمة متأخرة:

📋 المهمة: ${taskName}
🏢 القسم: ${boardName}
⚠️  الحالة: متأخر

يرجى المتابعة فوراً! 🔴`
    }

    return templates[template] || templates.status_change
  }

  /**
   * الحصول على إعدادات Ultra MSG
   */
  getUltraMsgConfig() {
    try {
      const config = localStorage.getItem('ultramsg_config')
      return config ? JSON.parse(config) : null
    } catch (error) {
      return null
    }
  }

  /**
   * إضافة قاعدة أتمتة جديدة
   */
  addRule(rule) {
    this.automationRules.push({
      ...rule,
      id: `wa-${Date.now()}`
    })
    this.saveAutomationRules()
  }

  /**
   * تحديث قاعدة أتمتة
   */
  updateRule(ruleId, updates) {
    const index = this.automationRules.findIndex(r => r.id === ruleId)
    if (index !== -1) {
      this.automationRules[index] = { ...this.automationRules[index], ...updates }
      this.saveAutomationRules()
    }
  }

  /**
   * حذف قاعدة أتمتة
   */
  deleteRule(ruleId) {
    this.automationRules = this.automationRules.filter(r => r.id !== ruleId)
    this.saveAutomationRules()
  }

  /**
   * تفعيل/تعطيل قاعدة
   */
  toggleRule(ruleId) {
    const rule = this.automationRules.find(r => r.id === ruleId)
    if (rule) {
      rule.active = !rule.active
      this.saveAutomationRules()
    }
  }

  /**
   * الحصول على جميع القواعد
   */
  getRules() {
    return this.automationRules
  }
}

// إنشاء instance واحد
const mondayWebhookService = new MondayWebhookService()

export default mondayWebhookService
