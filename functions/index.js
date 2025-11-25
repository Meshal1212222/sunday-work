/**
 * Firebase Cloud Functions - WhatsApp Webhook Handler
 * يستقبل رسائل واتساب من Ultra MSG ويضيفها للبوردات
 * مع حماية - فقط الأرقام المسموح بها يمكنها إضافة مهام
 */

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.database()

// إعدادات Ultra MSG
const ULTRAMSG_TOKEN = 'YOUR_ULTRAMSG_TOKEN' // غيّرها
const ULTRAMSG_INSTANCE = 'YOUR_INSTANCE_ID' // غيّرها

/**
 * التحقق من صلاحية الرقم
 * يتحقق من Firebase إذا الرقم مسموح له
 */
async function isPhoneAllowed(phoneNumber) {
  try {
    // تنظيف الرقم
    const cleanPhone = phoneNumber.replace('@c.us', '').replace(/\D/g, '')

    // البحث في قائمة الأرقام المسموحة
    const allowedRef = db.ref('allowed_phones')
    const snapshot = await allowedRef.once('value')

    if (!snapshot.exists()) {
      // إذا لم توجد قائمة، نسمح لأول رقم يرسل (المدير)
      // ونضيفه تلقائياً للقائمة
      await allowedRef.child(cleanPhone).set({
        phone: cleanPhone,
        name: 'المدير',
        role: 'admin',
        addedAt: new Date().toISOString()
      })
      console.log('✅ First phone added as admin:', cleanPhone)
      return true
    }

    const allowedPhones = snapshot.val()

    // التحقق من الرقم
    for (const key in allowedPhones) {
      const allowed = allowedPhones[key]
      if (allowed.phone === cleanPhone || cleanPhone.includes(allowed.phone) || allowed.phone.includes(cleanPhone)) {
        return true
      }
    }

    return false
  } catch (error) {
    console.error('Error checking phone:', error)
    return false
  }
}

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
        // ⚠️ التحقق من صلاحية الرقم قبل المعالجة
        const allowed = await isPhoneAllowed(from)

        if (!allowed) {
          console.log('🚫 Unauthorized phone:', from)
          await sendWhatsAppReply(from, '🚫 عذراً، رقمك غير مصرح له باستخدام هذه الخدمة.\nتواصل مع المدير لإضافة رقمك.')
          return res.status(200).json({ success: false, reason: 'unauthorized' })
        }

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

  // أمر إضافة رقم جديد (للمدير فقط)
  if (lowerMsg.includes('اضف رقم') || lowerMsg.includes('أضف رقم')) {
    return await addAllowedPhone(from, message)
  }

  // كشف أمر إضافة مهمة
  if (lowerMsg.includes('ضيف') || lowerMsg.includes('أضف') || lowerMsg.includes('صيف') || lowerMsg.includes('add')) {
    return await addTaskFromWhatsApp(from, message, senderName)
  }

  // كشف أمر عرض المهام
  if (lowerMsg.includes('اعرض') || lowerMsg.includes('المهام') || lowerMsg.includes('list')) {
    return await listTasks()
  }

  // عرض البوردات
  if (lowerMsg.includes('البوردات') || lowerMsg.includes('boards')) {
    return await listBoards()
  }

  // مساعدة
  if (lowerMsg.includes('مساعدة') || lowerMsg.includes('help')) {
    return {
      reply: `🤖 *مساعد Sunday*

*إضافة مهمة:*
ضيف مهمة [وصف المهمة]
ضيف مهمة [الوصف] لـ [اسم الشخص]

*عرض المهام:*
اعرض المهام

*عرض البوردات:*
البوردات

*مثال:*
ضيف مهمة مراجعة التصميم لماجد`
    }
  }

  return {
    reply: 'مرحباً! أرسل "مساعدة" لمعرفة الأوامر المتاحة 👋'
  }
}

/**
 * إضافة رقم مسموح جديد (للمدير)
 */
async function addAllowedPhone(from, message) {
  try {
    // استخراج الرقم من الرسالة
    const phoneMatch = message.match(/(\d{10,15})/)
    if (!phoneMatch) {
      return { reply: '❌ أرسل الأمر بهذه الصيغة:\nأضف رقم 966501234567' }
    }

    const newPhone = phoneMatch[1]

    // استخراج اسم (اختياري)
    const nameMatch = message.match(/باسم\s+(\S+)/)
    const name = nameMatch ? nameMatch[1] : 'عضو جديد'

    // إضافة الرقم
    await db.ref(`allowed_phones/${newPhone}`).set({
      phone: newPhone,
      name: name,
      role: 'member',
      addedBy: from.replace('@c.us', ''),
      addedAt: new Date().toISOString()
    })

    return {
      reply: `✅ تم إضافة الرقم!
📱 *الرقم:* ${newPhone}
👤 *الاسم:* ${name}
الآن يقدر يستخدم خدمات Sunday`
    }

  } catch (error) {
    return { reply: `❌ خطأ: ${error.message}` }
  }
}

/**
 * عرض البوردات المتاحة
 */
async function listBoards() {
  try {
    const boardsSnapshot = await db.ref('boards').once('value')

    if (!boardsSnapshot.exists()) {
      return { reply: '📋 لا توجد بوردات حالياً' }
    }

    const boards = boardsSnapshot.val()
    let reply = '📋 *البوردات المتاحة:*\n\n'

    Object.values(boards).forEach((board, index) => {
      reply += `${index + 1}. ${board.name || board.id}\n`
    })

    reply += '\n💡 لإضافة مهمة لبورد معين:\nضيف [المهمة] في [اسم البورد]'

    return { reply }

  } catch (error) {
    return { reply: `❌ خطأ: ${error.message}` }
  }
}

/**
 * إضافة مهمة من واتساب
 */
async function addTaskFromWhatsApp(from, message, senderName) {
  try {
    // استخراج اسم البورد (إذا محدد)
    const boardMatch = message.match(/في\s+(.+?)(?:\s+لـ|$)/i)
    let targetBoardId = null
    let targetBoardName = null

    // استخراج اسم المهمة
    let taskName = message
      .replace(/^(ضيف|أضف|صيف|add)\s*/gi, '')
      .replace(/^(مهمة|task)\s*/gi, '')
      .replace(/\s+في\s+.+$/gi, '') // إزالة "في بورد"
      .replace(/\s+لـ?\s+\S+$/gi, '') // إزالة "لـ شخص"
      .trim()

    if (!taskName) {
      taskName = 'مهمة جديدة'
    }

    // استخراج الشخص المعين
    const assigneeMatch = message.match(/لـ?\s+(\S+)$/i)
    const assignee = assigneeMatch ? assigneeMatch[1] : null

    // البحث عن البورد المحدد أو استخدام الأول
    const boardsSnapshot = await db.ref('boards').once('value')

    if (boardsSnapshot.exists()) {
      const boards = boardsSnapshot.val()

      if (boardMatch) {
        // البحث عن البورد بالاسم
        const searchName = boardMatch[1].toLowerCase().trim()
        for (const [id, board] of Object.entries(boards)) {
          if (board.name && board.name.toLowerCase().includes(searchName)) {
            targetBoardId = id
            targetBoardName = board.name
            break
          }
        }
      }

      // إذا لم يوجد، استخدم الأول
      if (!targetBoardId) {
        targetBoardId = Object.keys(boards)[0]
        targetBoardName = boards[targetBoardId].name || 'البورد الرئيسي'
      }
    }

    // إنشاء المهمة
    const newTask = {
      id: `item_${Date.now()}`,
      name: taskName,
      boardId: targetBoardId,
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

    // حفظ في Firebase - في المسار الصحيح
    if (targetBoardId) {
      // حفظ في البورد المحدد
      await db.ref(`sunday_data/items/${targetBoardId}`).push(newTask)
    }

    // أيضاً حفظ في قائمة المهام العامة للواتساب
    await db.ref('whatsapp_tasks').push(newTask)

    console.log('✅ Task added:', newTask)

    return {
      reply: `✅ تم إضافة المهمة!

📋 *البورد:* ${targetBoardName || 'غير محدد'}
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
