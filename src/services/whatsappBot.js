/**
 * WhatsApp AI Bot Service
 * يستقبل رسائل واتساب عبر Ultra MSG ويعالجها بالذكاء الاصطناعي
 */

import ultraMsgService from './ultramsg'
import sundayDataStore from './sundayDataStore'

class WhatsAppBot {
  constructor() {
    this.openaiApiKey = null
    this.botEnabled = false
    this.allowedNumbers = [] // أرقام مسموح لها باستخدام البوت
    this.commandHistory = []
    this.loadSettings()
  }

  /**
   * تحميل إعدادات البوت
   */
  loadSettings() {
    try {
      const settings = localStorage.getItem('whatsapp_bot_settings')
      if (settings) {
        const parsed = JSON.parse(settings)
        this.openaiApiKey = parsed.openaiApiKey || null
        this.botEnabled = parsed.enabled || false
        this.allowedNumbers = parsed.allowedNumbers || []
      }
    } catch (error) {
      console.error('Error loading bot settings:', error)
    }
  }

  /**
   * حفظ إعدادات البوت
   */
  saveSettings() {
    try {
      const settings = {
        openaiApiKey: this.openaiApiKey,
        enabled: this.botEnabled,
        allowedNumbers: this.allowedNumbers
      }
      localStorage.setItem('whatsapp_bot_settings', JSON.stringify(settings))
    } catch (error) {
      console.error('Error saving bot settings:', error)
    }
  }

  /**
   * تفعيل/تعطيل البوت
   */
  setEnabled(enabled) {
    this.botEnabled = enabled
    this.saveSettings()
    console.log(`🤖 Bot ${enabled ? 'enabled' : 'disabled'}`)
  }

  /**
   * تعيين OpenAI API Key
   */
  setOpenAIKey(apiKey) {
    this.openaiApiKey = apiKey
    this.saveSettings()
    console.log('🔑 OpenAI API Key updated')
  }

  /**
   * إضافة رقم مسموح
   */
  addAllowedNumber(phoneNumber) {
    const formatted = phoneNumber.replace(/[^0-9]/g, '')
    if (!this.allowedNumbers.includes(formatted)) {
      this.allowedNumbers.push(formatted)
      this.saveSettings()
      console.log('✅ Added allowed number:', formatted)
    }
  }

  /**
   * إزالة رقم مسموح
   */
  removeAllowedNumber(phoneNumber) {
    const formatted = phoneNumber.replace(/[^0-9]/g, '')
    this.allowedNumbers = this.allowedNumbers.filter(n => n !== formatted)
    this.saveSettings()
    console.log('❌ Removed allowed number:', formatted)
  }

  /**
   * التحقق من صلاحية الرقم
   */
  isNumberAllowed(phoneNumber) {
    const formatted = phoneNumber.replace(/[^0-9@.]/g, '').replace('@c.us', '')

    // إذا القائمة فاضية، اسمح للكل (للتجربة)
    if (this.allowedNumbers.length === 0) {
      return true
    }

    return this.allowedNumbers.some(allowed => formatted.includes(allowed))
  }

  /**
   * استقبال رسالة من Ultra MSG Webhook
   * @param {Object} webhookData - البيانات من Ultra MSG
   */
  async handleIncomingMessage(webhookData) {
    try {
      console.log('📩 Incoming WhatsApp message:', webhookData)

      // التحقق من تفعيل البوت
      if (!this.botEnabled) {
        console.log('⚠️ Bot is disabled')
        return { success: false, message: 'Bot is disabled' }
      }

      // استخراج البيانات
      const from = webhookData.from // e.g., "966XXXXXXXXX@c.us"
      const message = webhookData.body
      const messageType = webhookData.type

      // تجاهل الرسائل غير النصية
      if (messageType !== 'chat') {
        console.log('⚠️ Non-text message, ignoring')
        return { success: false, message: 'Only text messages supported' }
      }

      // التحقق من الصلاحية
      if (!this.isNumberAllowed(from)) {
        console.log('⚠️ Number not allowed:', from)
        await this.sendReply(from, 'عذراً، ليس لديك صلاحية استخدام البوت 🚫')
        return { success: false, message: 'Number not allowed' }
      }

      // معالجة الرسالة
      console.log(`🤖 Processing message from ${from}: "${message}"`)
      const response = await this.processMessage(from, message)

      // إرسال الرد
      if (response.reply) {
        await this.sendReply(from, response.reply)
      }

      // حفظ في السجل
      this.saveToHistory({
        from,
        message,
        response: response.reply,
        action: response.action,
        timestamp: new Date().toISOString()
      })

      return { success: true, response }

    } catch (error) {
      console.error('❌ Error handling message:', error)

      // محاولة إرسال رسالة خطأ
      try {
        if (webhookData.from) {
          await this.sendReply(webhookData.from, `عذراً، حدث خطأ: ${error.message} ❌`)
        }
      } catch (sendError) {
        console.error('Failed to send error message:', sendError)
      }

      return { success: false, error: error.message }
    }
  }

  /**
   * معالجة الرسالة بالذكاء الاصطناعي
   */
  async processMessage(from, message) {
    try {
      // تحليل الرسالة بالذكاء الاصطناعي
      const intent = await this.parseMessageWithAI(message)

      console.log('🧠 AI Intent:', intent)

      // تنفيذ الأمر بناءً على النية
      let result
      switch (intent.action) {
        case 'add_task':
          result = await this.executeAddTask(intent)
          break

        case 'list_tasks':
          result = await this.executeListTasks(intent)
          break

        case 'update_task':
          result = await this.executeUpdateTask(intent)
          break

        case 'help':
          result = this.getHelpMessage()
          break

        default:
          result = {
            reply: 'عذراً، لم أفهم طلبك. أرسل "مساعدة" لمعرفة الأوامر المتاحة.'
          }
      }

      return {
        ...result,
        action: intent.action
      }

    } catch (error) {
      console.error('Error processing message:', error)
      return {
        reply: `عذراً، حدث خطأ في معالجة الرسالة: ${error.message}`
      }
    }
  }

  /**
   * تحليل الرسالة باستخدام OpenAI
   */
  async parseMessageWithAI(message) {
    // إذا ما في OpenAI key، استخدم pattern matching بسيط
    if (!this.openaiApiKey) {
      return this.parseMessageSimple(message)
    }

    try {
      const prompt = `أنت مساعد ذكي لإدارة المهام في Monday.com عبر واتساب.
حلل الرسالة التالية واستخرج:
1. نوع الأمر (add_task, list_tasks, update_task, help)
2. اسم البورد (إذا موجود)
3. اسم المجموعة/القروب (إذا موجود)
4. اسم الشخص المعين (إذا موجود)
5. نص المهمة/الطلب

الرسالة: "${message}"

أرجع النتيجة بصيغة JSON فقط بدون أي نص إضافي:
{
  "action": "add_task",
  "board": "اسم البورد",
  "group": "اسم المجموعة",
  "assignee": "اسم الشخص",
  "taskName": "نص المهمة"
}`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'أنت مساعد يحلل أوامر إدارة المهام ويرجع JSON فقط.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      // استخراج JSON من الرد
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      // إذا ما قدر يستخرج JSON، استخدم simple parsing
      return this.parseMessageSimple(message)

    } catch (error) {
      console.error('OpenAI parsing failed:', error)
      // Fallback to simple parsing
      return this.parseMessageSimple(message)
    }
  }

  /**
   * تحليل بسيط بدون AI (Pattern Matching)
   */
  parseMessageSimple(message) {
    const lowerMsg = message.toLowerCase()

    // كشف الأوامر
    if (lowerMsg.includes('مساعدة') || lowerMsg.includes('help')) {
      return { action: 'help' }
    }

    if (lowerMsg.includes('اعرض') || lowerMsg.includes('list') || lowerMsg.includes('المهام')) {
      return {
        action: 'list_tasks',
        board: this.extractBoardName(message)
      }
    }

    if (lowerMsg.includes('ضيف') || lowerMsg.includes('أضف') || lowerMsg.includes('صيف') || lowerMsg.includes('add')) {
      const board = this.extractBoardName(message)
      const group = this.extractGroupName(message)
      const assignee = this.extractAssigneeName(message)
      const taskName = this.extractTaskName(message)

      console.log('📝 Extracted info:', { board, group, assignee, taskName })

      return {
        action: 'add_task',
        board,
        group,
        assignee,
        taskName
      }
    }

    // Default: مش فاهم
    return { action: 'unknown' }
  }

  /**
   * استخراج اسم البورد من الرسالة
   */
  extractBoardName(message) {
    const boardPatterns = [
      /في\s+بورد\s+([^\s]+(?:\s+[^\s]+)*?)(?:\s+في\s+(?:قروب|مجموعة)|$|\s+لـ?\s+)/i,
      /بورد\s+([^\s]+(?:\s+[^\s]+)*?)(?:\s+في\s+(?:قروب|مجموعة)|$|\s+لـ?\s+)/i,
      /board\s+([^\s]+(?:\s+[^\s]+)*?)(?:\s+in\s+group|$|\s+for\s+)/i
    ]

    for (const pattern of boardPatterns) {
      const match = message.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }

    return null
  }

  /**
   * استخراج اسم المجموعة
   */
  extractGroupName(message) {
    const groupPatterns = [
      /في\s+(?:قروب|مجموعة|group)\s+([^\s]+(?:\s+[^\s]+)*?)(?:\s+لـ?\s+|$)/i,
      /(?:قروب|مجموعة|group)\s+([^\s]+(?:\s+[^\s]+)*?)(?:\s+لـ?\s+|$)/i
    ]

    for (const pattern of groupPatterns) {
      const match = message.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }

    return null
  }

  /**
   * استخراج اسم الشخص المعين
   */
  extractAssigneeName(message) {
    const assigneePatterns = [
      /لـ?\s+([^\s]+(?:\s+[^\s]+)*)$/i,
      /assign\s+to\s+([^\s]+(?:\s+[^\s]+)*)$/i,
      /for\s+([^\s]+(?:\s+[^\s]+)*)$/i
    ]

    for (const pattern of assigneePatterns) {
      const match = message.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }

    return null
  }

  /**
   * استخراج نص المهمة
   */
  extractTaskName(message) {
    let taskName = message

    // 1. امسح الأمر من البداية
    taskName = taskName.replace(/^(ضيف|أضف|صيف|add)\s+/gi, '')

    // 2. امسح كلمة "مهمة" أو "task"
    taskName = taskName.replace(/^(مهمة|task)\s+/gi, '')

    // 3. امسح معلومات البورد (كل شي من "في بورد" لحد "في قروب" أو "لـ" أو نهاية)
    taskName = taskName.replace(/\s+في\s+بورد\s+.+?(?=\s+في\s+(?:قروب|مجموعة)|$|\s+لـ)/gi, '')

    // 4. امسح معلومات المجموعة (كل شي من "في قروب" لحد "لـ" أو نهاية)
    taskName = taskName.replace(/\s+في\s+(?:قروب|مجموعة|group)\s+.+?(?=\s+لـ|$)/gi, '')

    // 5. امسح معلومات الشخص (كل شي من "لـ" للنهاية)
    taskName = taskName.replace(/\s+لـ?\s+.+$/gi, '')

    // 6. نظف المسافات الزائدة
    taskName = taskName.trim()

    return taskName || 'مهمة جديدة'
  }

  /**
   * تنفيذ أمر إضافة مهمة
   */
  async executeAddTask(intent) {
    try {
      const { board: boardName, group: groupName, assignee: assigneeName, taskName } = intent

      if (!taskName) {
        return {
          reply: '⚠️ يرجى تحديد نص المهمة!'
        }
      }

      // البحث عن البورد أو إنشاء واحد جديد
      let board = boardName ? sundayDataStore.findBoardByName(boardName) : null

      if (!board && boardName) {
        board = sundayDataStore.createBoard(boardName)
      } else if (!board) {
        // استخدم أول بورد أو أنشئ واحد افتراضي
        const boards = sundayDataStore.getBoards()
        board = boards.length > 0 ? boards[0] : sundayDataStore.createBoard('البورد الرئيسي')
      }

      // البحث عن المجموعة أو إنشاء واحدة جديدة
      let group = groupName ? sundayDataStore.findGroupInBoard(board.id, groupName) : null

      if (!group && groupName) {
        group = sundayDataStore.createGroup(board.id, groupName)
      } else if (!group) {
        // استخدم أول مجموعة أو أنشئ واحدة
        if (board.groups.length === 0) {
          group = sundayDataStore.createGroup(board.id, 'مجموعة عامة')
        } else {
          group = board.groups[0]
        }
      }

      // إضافة المهمة
      const newItem = sundayDataStore.addItem(board.id, {
        name: taskName,
        groupId: group.id,
        assignee: assigneeName || null,
        status: 'جديدة'
      })

      return {
        reply: `✅ تم إضافة المهمة بنجاح!

📋 *البورد:* ${board.name}
📁 *المجموعة:* ${group.title}
${assigneeName ? `👤 *معين لـ:* ${assigneeName}` : ''}
✍️ *المهمة:* ${taskName}

🆔 رقم المهمة: ${newItem.id}`
      }

    } catch (error) {
      console.error('Error adding task:', error)
      return {
        reply: `❌ فشل إضافة المهمة: ${error.message}`
      }
    }
  }

  /**
   * تنفيذ أمر عرض المهام
   */
  async executeListTasks(intent) {
    try {
      const { board: boardName } = intent

      let board
      if (boardName) {
        board = sundayDataStore.findBoardByName(boardName)
        if (!board) {
          return {
            reply: `⚠️ لم أجد بورد باسم "${boardName}"`
          }
        }
      } else {
        const boards = sundayDataStore.getBoards()
        if (boards.length === 0) {
          return {
            reply: '⚠️ لا توجد بوردات حالياً!'
          }
        }
        board = boards[0]
      }

      const items = sundayDataStore.getItems(board.id)

      if (items.length === 0) {
        return {
          reply: `📋 *${board.name}*\n\n⚪ لا توجد مهام`
        }
      }

      // تجميع المهام حسب المجموعات
      const groupedItems = {}
      items.forEach(item => {
        const groupId = item.groupId || 'other'
        if (!groupedItems[groupId]) {
          groupedItems[groupId] = []
        }
        groupedItems[groupId].push(item)
      })

      let reply = `📋 *${board.name}*\n\n`

      // عرض المهام حسب المجموعات
      for (const [groupId, groupItems] of Object.entries(groupedItems)) {
        const group = board.groups.find(g => g.id === groupId)
        const groupTitle = group?.title || 'بدون مجموعة'

        reply += `📁 *${groupTitle}*\n`

        groupItems.forEach((item, index) => {
          reply += `${index + 1}. ${item.name}`
          if (item.assignee) {
            reply += ` (${item.assignee})`
          }
          reply += `\n`
        })

        reply += `\n`
      }

      reply += `_إجمالي: ${items.length} مهمة_`

      return { reply }

    } catch (error) {
      console.error('Error listing tasks:', error)
      return {
        reply: `❌ فشل عرض المهام: ${error.message}`
      }
    }
  }

  /**
   * تنفيذ أمر تحديث مهمة
   */
  async executeUpdateTask(intent) {
    return {
      reply: '⚠️ أمر التحديث قيد التطوير'
    }
  }

  /**
   * رسالة المساعدة
   */
  getHelpMessage() {
    return {
      reply: `🤖 *مساعد Sunday Board Pro*

*الأوامر المتاحة:*

📝 *إضافة مهمة:*
"ضيف مهمة في بورد [اسم البورد] في قروب [اسم المجموعة] لـ [اسم الشخص]"

مثال:
"صيف مهمة في بورد قولدن هوست في قروب الإدارة لماجد"

📋 *عرض المهام:*
"اعرض المهام من بورد [اسم البورد]"

❓ *المساعدة:*
"مساعدة"

---
💡 يمكنك الكتابة بشكل طبيعي والبوت سيفهمك!`
    }
  }

  /**
   * إرسال رد عبر واتساب
   */
  async sendReply(to, message) {
    try {
      const response = await ultraMsgService.sendMessage(to, message)
      console.log('✅ Reply sent:', response)
      return response
    } catch (error) {
      console.error('❌ Failed to send reply:', error)
      throw error
    }
  }

  /**
   * حفظ في السجل
   */
  saveToHistory(entry) {
    this.commandHistory.unshift(entry)

    // احتفظ بآخر 100 رسالة فقط
    if (this.commandHistory.length > 100) {
      this.commandHistory = this.commandHistory.slice(0, 100)
    }

    // احفظ في localStorage
    try {
      localStorage.setItem('whatsapp_bot_history', JSON.stringify(this.commandHistory))
    } catch (error) {
      console.error('Error saving history:', error)
    }
  }

  /**
   * جلب السجل
   */
  getHistory() {
    return this.commandHistory
  }

  /**
   * الحصول على الإعدادات
   */
  getSettings() {
    return {
      enabled: this.botEnabled,
      hasOpenAIKey: !!this.openaiApiKey,
      allowedNumbers: this.allowedNumbers
    }
  }
}

// إنشاء instance واحد
const whatsappBot = new WhatsAppBot()

export default whatsappBot
