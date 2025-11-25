/**
 * Firebase Cloud Functions - WhatsApp Webhook Handler
 * يستقبل رسائل واتساب من Ultra MSG ويضيفها للبوردات
 */

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.database()

// إعدادات Ultra MSG
const ULTRAMSG_TOKEN = 'YOUR_ULTRAMSG_TOKEN' // غيّرها
const ULTRAMSG_INSTANCE = 'YOUR_INSTANCE_ID' // غيّرها

/**
 * Webhook endpoint لاستقبال رسائل واتساب
 * URL: https://YOUR_PROJECT.cloudfunctions.net/whatsappWebhook
 */
exports.whatsappWebhook = functions.https.onRequest(async (req, res) => {
  // السماح بـ CORS
  res.set('Access-Control-Allow-Origin', '*')

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).send('')
  }

  try {
    const webhookData = req.body
    console.log('📩 Received webhook:', JSON.stringify(webhookData))

    // التحقق من نوع الرسالة
    if (webhookData.event_type === 'message_received' || webhookData.data?.body) {
      const messageData = webhookData.data || webhookData
      const from = messageData.from || messageData.sender
      const body = messageData.body || messageData.message
      const senderName = messageData.pushName || messageData.notifyName || 'مستخدم'

      if (body && from) {
        // معالجة الرسالة
        const result = await processWhatsAppMessage(from, body, senderName)

        // إرسال رد
        if (result.reply) {
          await sendWhatsAppReply(from, result.reply)
        }

        return res.status(200).json({ success: true, result })
      }
    }

    return res.status(200).json({ success: true, message: 'Webhook received' })

  } catch (error) {
    console.error('❌ Webhook error:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
})

/**
 * معالجة رسالة واتساب
 */
async function processWhatsAppMessage(from, message, senderName) {
  const lowerMsg = message.toLowerCase()

  // كشف أمر إضافة مهمة
  if (lowerMsg.includes('ضيف') || lowerMsg.includes('أضف') || lowerMsg.includes('صيف') || lowerMsg.includes('add')) {
    return await addTaskFromWhatsApp(from, message, senderName)
  }

  // كشف أمر عرض المهام
  if (lowerMsg.includes('اعرض') || lowerMsg.includes('المهام') || lowerMsg.includes('list')) {
    return await listTasks()
  }

  // مساعدة
  if (lowerMsg.includes('مساعدة') || lowerMsg.includes('help')) {
    return {
      reply: `🤖 *مساعد Sunday*

*إضافة مهمة:*
ضيف مهمة [وصف المهمة]

*عرض المهام:*
اعرض المهام

*مثال:*
ضيف مهمة مراجعة التصميم لماجد`
    }
  }

  return {
    reply: 'مرحباً! أرسل "مساعدة" لمعرفة الأوامر المتاحة 👋'
  }
}

/**
 * إضافة مهمة من واتساب
 */
async function addTaskFromWhatsApp(from, message, senderName) {
  try {
    // استخراج اسم المهمة
    let taskName = message
      .replace(/^(ضيف|أضف|صيف|add)\s*/gi, '')
      .replace(/^(مهمة|task)\s*/gi, '')
      .replace(/\s+لـ?\s+\S+$/gi, '') // إزالة "لـ شخص"
      .trim()

    if (!taskName) {
      taskName = 'مهمة جديدة'
    }

    // استخراج الشخص المعين
    const assigneeMatch = message.match(/لـ?\s+(\S+)$/i)
    const assignee = assigneeMatch ? assigneeMatch[1] : null

    // إنشاء المهمة
    const newTask = {
      id: `item_${Date.now()}`,
      name: taskName,
      assignee: assignee,
      status: 'جديدة',
      createdBy: {
        name: senderName,
        phone: from.replace('@c.us', '')
      },
      source: 'whatsapp',
      created_at: new Date().toISOString(),
      state: 'active'
    }

    // حفظ في Firebase
    const tasksRef = db.ref('whatsapp_tasks')
    await tasksRef.push(newTask)

    // أيضاً حفظ في البورد الرئيسي إذا موجود
    const boardsSnapshot = await db.ref('boards').limitToFirst(1).once('value')
    if (boardsSnapshot.exists()) {
      const boards = boardsSnapshot.val()
      const firstBoardId = Object.keys(boards)[0]

      // إضافة للبورد
      const boardItemsRef = db.ref(`sunday_data/items/${firstBoardId}`)
      await boardItemsRef.push(newTask)
    }

    console.log('✅ Task added:', newTask)

    return {
      reply: `✅ تم إضافة المهمة!

✍️ *المهمة:* ${taskName}
${assignee ? `👤 *معين لـ:* ${assignee}` : ''}
📱 *أضافها:* ${senderName}
🆔 *رقم:* ${newTask.id}`
    }

  } catch (error) {
    console.error('❌ Error adding task:', error)
    return {
      reply: `❌ فشل إضافة المهمة: ${error.message}`
    }
  }
}

/**
 * عرض المهام
 */
async function listTasks() {
  try {
    const tasksSnapshot = await db.ref('whatsapp_tasks').limitToLast(10).once('value')

    if (!tasksSnapshot.exists()) {
      return { reply: '📋 لا توجد مهام حالياً' }
    }

    const tasks = tasksSnapshot.val()
    let reply = '📋 *آخر المهام:*\n\n'

    Object.values(tasks).reverse().forEach((task, index) => {
      reply += `${index + 1}. ${task.name}`
      if (task.assignee) reply += ` (${task.assignee})`
      reply += `\n`
    })

    return { reply }

  } catch (error) {
    return { reply: `❌ خطأ: ${error.message}` }
  }
}

/**
 * إرسال رد واتساب عبر Ultra MSG
 */
async function sendWhatsAppReply(to, message) {
  try {
    const fetch = require('node-fetch')

    const response = await fetch(`https://api.ultramsg.com/${ULTRAMSG_INSTANCE}/messages/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: ULTRAMSG_TOKEN,
        to: to,
        body: message
      })
    })

    const result = await response.json()
    console.log('📤 Reply sent:', result)
    return result

  } catch (error) {
    console.error('❌ Failed to send reply:', error)
    throw error
  }
}
