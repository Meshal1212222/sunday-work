/**
 * Zapier Import Service
 * استيراد Zaps من حساب Zapier
 */

class ZapierImportService {
  constructor() {
    this.apiKey = null
    this.baseUrl = 'https://api.zapier.com/v1'
  }

  /**
   * تعيين API Key
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey
  }

  /**
   * جلب جميع الـ Zaps من الحساب
   */
  async fetchZaps() {
    if (!this.apiKey) {
      throw new Error('Zapier API Key مطلوب')
    }

    try {
      console.log('📥 Fetching Zaps from Zapier...')

      const response = await fetch(`${this.baseUrl}/zaps`, {
        method: 'GET',
        headers: {
          'X-API-Key': this.apiKey,
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Zapier API Error: ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ Zaps fetched:', data)

      return data
    } catch (error) {
      console.error('❌ Error fetching Zaps:', error)
      throw error
    }
  }

  /**
   * جلب تفاصيل Zap معين
   */
  async fetchZapDetails(zapId) {
    if (!this.apiKey) {
      throw new Error('Zapier API Key مطلوب')
    }

    try {
      console.log(`📥 Fetching Zap ${zapId}...`)

      const response = await fetch(`${this.baseUrl}/zaps/${zapId}`, {
        method: 'GET',
        headers: {
          'X-API-Key': this.apiKey,
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Zapier API Error: ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ Zap details:', data)

      return data
    } catch (error) {
      console.error('❌ Error fetching Zap details:', error)
      throw error
    }
  }

  /**
   * تحويل Zap إلى Automation Rule في Sunday Board
   */
  convertZapToAutomation(zap) {
    try {
      console.log('🔄 Converting Zap to Automation...')

      // استخراج Trigger
      const trigger = zap.steps.find(step => step.type === 'trigger')
      const action = zap.steps.find(step => step.type === 'action')

      // تحديد نوع الـ trigger
      let automationRule = {
        id: `imported-${zap.id}`,
        name: zap.title || 'Imported from Zapier',
        active: zap.state === 'on',
        source: 'zapier',
        zapId: zap.id
      }

      // تحليل Monday.com trigger
      if (trigger?.app === 'monday') {
        const triggerEvent = trigger.event

        if (triggerEvent === 'column_value_changed') {
          automationRule.trigger = 'column_changed'
          automationRule.triggerColumn = this.extractColumnType(trigger)
        } else if (triggerEvent === 'new_item') {
          automationRule.trigger = 'item_created'
        } else if (triggerEvent === 'item_status_changed') {
          automationRule.trigger = 'column_changed'
          automationRule.triggerColumn = 'status'
        }
      }

      // تحليل Ultra MSG action
      if (action?.app === 'ultramsg' || action?.action === 'send_message') {
        automationRule.action = 'send_whatsapp'

        // استخراج قالب الرسالة
        if (action.params?.message || action.params?.body) {
          automationRule.messageTemplate = 'custom'
          automationRule.customMessage = action.params.message || action.params.body
        }

        // استخراج رقم الهاتف
        if (action.params?.to || action.params?.phone) {
          automationRule.phoneField = action.params.to || action.params.phone
        }
      }

      console.log('✅ Converted automation:', automationRule)
      return automationRule

    } catch (error) {
      console.error('❌ Error converting Zap:', error)
      throw error
    }
  }

  /**
   * استخراج نوع الـ column من trigger
   */
  extractColumnType(trigger) {
    const params = trigger.params || {}

    if (params.column_id) {
      const columnId = params.column_id.toLowerCase()

      if (columnId.includes('status')) return 'status'
      if (columnId.includes('person')) return 'person'
      if (columnId.includes('date')) return 'date'
      if (columnId.includes('phone') || columnId.includes('whatsapp')) return 'phone'
    }

    return 'status' // default
  }

  /**
   * استيراد جميع Zaps المتعلقة بـ Monday + WhatsApp
   */
  async importMondayWhatsAppZaps() {
    try {
      const zaps = await this.fetchZaps()

      // تصفية الـ Zaps التي تحتوي على Monday و Ultra MSG
      const relevantZaps = zaps.filter(zap => {
        const hasMondayTrigger = zap.steps.some(step =>
          step.type === 'trigger' && step.app === 'monday'
        )
        const hasWhatsAppAction = zap.steps.some(step =>
          step.type === 'action' &&
          (step.app === 'ultramsg' || step.app === 'whatsapp')
        )

        return hasMondayTrigger && hasWhatsAppAction
      })

      console.log(`✅ Found ${relevantZaps.length} Monday→WhatsApp Zaps`)

      // تحويل كل Zap إلى Automation
      const automations = []
      for (const zap of relevantZaps) {
        const automation = this.convertZapToAutomation(zap)
        automations.push(automation)
      }

      return automations

    } catch (error) {
      console.error('❌ Error importing Zaps:', error)
      throw error
    }
  }
}

const zapierImportService = new ZapierImportService()

export default zapierImportService
