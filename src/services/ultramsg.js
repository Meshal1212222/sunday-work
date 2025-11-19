/**
 * Ultra MSG WhatsApp API Integration
 * خدمة الربط مع Ultra MSG لإرسال رسائل واتساب
 */

class UltraMsgService {
  constructor() {
    // ضع هنا بياناتك من Ultra MSG
    this.apiUrl = '' // مثال: https://api.ultramsg.com/instance12345
    this.instanceId = '' // Instance ID
    this.token = '' // Token
  }

  /**
   * تهيئة الخدمة ببيانات Ultra MSG
   */
  configure(apiUrl, instanceId, token) {
    this.apiUrl = apiUrl
    this.instanceId = instanceId
    this.token = token
  }

  /**
   * إرسال رسالة واتساب
   * @param {string} phoneNumber - رقم الهاتف (مثال: 966501234567) أو Group ID (مثال: 966501234567-1234567890@g.us)
   * @param {string} message - نص الرسالة
   */
  async sendMessage(phoneNumber, message) {
    try {
      console.log('📞 Ultra MSG - Starting send...')
      console.log('API URL:', this.apiUrl)
      console.log('Instance ID:', this.instanceId)
      console.log('Token:', this.token ? '✅ Token exists' : '❌ No token')
      console.log('Phone/Group (original):', phoneNumber)

      let formattedRecipient = phoneNumber

      // Check if it's a group ID (contains @g.us) or regular number
      if (phoneNumber.includes('@g.us')) {
        // It's already a group ID, keep as is
        console.log('📱 Detected Group ID')
        formattedRecipient = phoneNumber
      } else if (phoneNumber.includes('@c.us')) {
        // Already formatted as chat ID, keep as is
        console.log('📱 Detected Chat ID')
        formattedRecipient = phoneNumber
      } else {
        // It's a regular phone number, format it
        console.log('📱 Detected Phone Number')
        formattedRecipient = phoneNumber.replace(/[^0-9]/g, '')
        formattedRecipient = `${formattedRecipient}@c.us`
      }

      console.log('Recipient (formatted):', formattedRecipient)

      const url = `${this.apiUrl}/messages/chat`
      console.log('Full URL:', url)

      const requestBody = {
        token: this.token,
        to: formattedRecipient,
        body: message,
        priority: '10'
      }
      console.log('Request body:', requestBody)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(requestBody),
      })

      console.log('Response status:', response.status)
      console.log('Response OK:', response.ok)

      const data = await response.json()

      // Log the response for debugging
      console.log('Ultra MSG Response:', data)

      if (data.sent === 'true' || data.sent === true) {
        return {
          success: true,
          message: 'تم إرسال الرسالة بنجاح ✅',
          data: data
        }
      } else {
        // Show detailed error from Ultra MSG
        const errorMessage = data.error || data.message || 'خطأ غير معروف'
        return {
          success: false,
          message: `فشل إرسال الرسالة: ${errorMessage}`,
          data: data
        }
      }
    } catch (error) {
      console.error('Ultra MSG Error:', error)
      return {
        success: false,
        message: 'خطأ في الاتصال بـ Ultra MSG',
        error: error.message
      }
    }
  }

  /**
   * الحصول على قائمة المجموعات المتاحة
   */
  async getGroups() {
    try {
      const url = `${this.apiUrl}/chats/groups?token=${this.token}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()
      console.log('📱 Groups list:', data)

      if (Array.isArray(data)) {
        return {
          success: true,
          groups: data.map(group => ({
            id: group.id,
            name: group.name || group.subject,
            participantsCount: group.participants?.length || 0
          }))
        }
      } else {
        return {
          success: false,
          message: 'فشل جلب قائمة المجموعات',
          groups: []
        }
      }
    } catch (error) {
      console.error('Error fetching groups:', error)
      return {
        success: false,
        message: 'خطأ في جلب المجموعات',
        error: error.message,
        groups: []
      }
    }
  }

  /**
   * إرسال رسالة لمجموعة واتساب
   * @param {string} groupId - معرف المجموعة (مثال: 966501234567-1234567890@g.us)
   * @param {string} message - نص الرسالة
   */
  async sendGroupMessage(groupId, message) {
    console.log('📱 Sending to WhatsApp Group:', groupId)
    return await this.sendMessage(groupId, message)
  }

  /**
   * الانضمام لمجموعة عبر رابط الدعوة
   * @param {string} inviteLink - رابط الدعوة (مثال: https://chat.whatsapp.com/XXXXXX)
   */
  async joinGroupByInviteLink(inviteLink) {
    try {
      // Extract invite code from URL
      let inviteCode = inviteLink
      if (inviteLink.includes('chat.whatsapp.com/')) {
        inviteCode = inviteLink.split('chat.whatsapp.com/')[1]
      }

      console.log('🔗 Joining group with invite code:', inviteCode)

      const url = `${this.apiUrl}/group/join`
      const requestBody = {
        token: this.token,
        inviteCode: inviteCode
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(requestBody),
      })

      const data = await response.json()
      console.log('Join Group Response:', data)

      return {
        success: data.status === 'success' || data.joined === true,
        message: data.status === 'success' ? 'تم الانضمام للمجموعة بنجاح' : 'فشل الانضمام للمجموعة',
        groupId: data.chatId || null,
        data: data
      }
    } catch (error) {
      console.error('Error joining group:', error)
      return {
        success: false,
        message: 'خطأ في الانضمام للمجموعة',
        error: error.message
      }
    }
  }

  /**
   * إرسال رسالة لمجموعة باستخدام رابط الدعوة
   * @param {string} inviteLink - رابط الدعوة (مثال: https://chat.whatsapp.com/XXXXXX)
   * @param {string} message - نص الرسالة
   */
  async sendMessageByInviteLink(inviteLink, message) {
    try {
      console.log('🚀 Attempting to send message via invite link...')

      // First, try to join the group (in case not already a member)
      const joinResult = await this.joinGroupByInviteLink(inviteLink)

      if (joinResult.groupId) {
        console.log('✅ Group joined, sending message to:', joinResult.groupId)
        // Now send the message using the group ID
        return await this.sendMessage(joinResult.groupId, message)
      } else {
        // If join failed, try to get group ID from groups list
        console.log('⚠️ Join returned no groupId, fetching groups list...')
        const groupsResult = await this.getGroups()

        if (groupsResult.success && groupsResult.groups.length > 0) {
          // Try to find a group that might match (this is a fallback)
          console.log('📋 Found groups:', groupsResult.groups.length)
          // For now, we'll need the user to manually select
          return {
            success: false,
            message: 'تم الانضمام للمجموعة، لكن يرجى استخدام "مجموعات واتساب" لاختيار المجموعة وإرسال الرسالة',
            groups: groupsResult.groups
          }
        }

        return {
          success: false,
          message: 'فشل الحصول على معرف المجموعة. يرجى التأكد من الانضمام للمجموعة أولاً.',
          data: joinResult.data
        }
      }
    } catch (error) {
      console.error('Error sending message by invite link:', error)
      return {
        success: false,
        message: 'خطأ في إرسال الرسالة عبر رابط الدعوة',
        error: error.message
      }
    }
  }

  /**
   * إرسال تنبيه تحديث تاسك
   * @param {object} task - بيانات التاسك
   * @param {string} assigneeName - اسم الموظف المسؤول
   * @param {string} assigneePhone - رقم واتساب الموظف
   * @param {string} requesterName - اسم من طلب التحديث
   */
  async sendTaskUpdateNotification(task, assigneeName, assigneePhone, requesterName) {
    // تنسيق الرسالة حسب المثال المطلوب
    const message = `هلا وغلا يا ${assigneeName} 😃✨
${requesterName} يطلب منك تحديث عن ✅✨،

المهمة الرئيسية: ${task.title || 'غير محدد'}
القسم: ${task.department || 'غير محدد'}
الحالة: ${task.status || 'غير محدد'}
متابعة الجودة: ${task.qualityCheck || 'غير محدد'}
التاريخ: ${task.dueDate || 'غير محدد'}

ياليت تطلع عليها 👀`

    return await this.sendMessage(assigneePhone, message)
  }

  /**
   * إرسال تنبيه مهمة جديدة
   */
  async sendNewTaskNotification(task, assigneeName, assigneePhone, creatorName) {
    const message = `🎯 مهمة جديدة - ${assigneeName}!

تم تعيين مهمة جديدة لك من قبل: ${creatorName}

📌 المهمة: ${task.title || 'غير محدد'}
📂 القسم: ${task.department || 'غير محدد'}
⏰ التاريخ: ${task.dueDate || 'غير محدد'}
🎨 الأولوية: ${task.priority || 'عادية'}

${task.description ? `📝 التفاصيل:\n${task.description}` : ''}

بالتوفيق! 💪✨`

    return await this.sendMessage(assigneePhone, message)
  }

  /**
   * إرسال تنبيه تغيير الحالة
   */
  async sendStatusChangeNotification(task, assigneeName, assigneePhone, newStatus, changedBy) {
    const statusEmoji = {
      'جديدة': '🆕',
      'قيد التنفيذ': '⚙️',
      'منتهية': '✅',
      'متأخرة': '⚠️',
      'معلقة': '⏸️'
    }

    const emoji = statusEmoji[newStatus] || '📌'

    const message = `${emoji} تحديث حالة المهمة

مرحباً ${assigneeName}،

تم تغيير حالة مهمتك من قبل: ${changedBy}

📌 المهمة: ${task.title}
🔄 الحالة الجديدة: ${newStatus}
📂 القسم: ${task.department || 'غير محدد'}

تابع العمل! 🚀`

    return await this.sendMessage(assigneePhone, message)
  }

  /**
   * إرسال تذكير بمهمة قريبة الانتهاء
   */
  async sendDeadlineReminder(task, assigneeName, assigneePhone, daysLeft) {
    const urgencyEmoji = daysLeft <= 1 ? '🚨' : daysLeft <= 3 ? '⚠️' : '⏰'

    const message = `${urgencyEmoji} تذكير: مهمة قريبة الانتهاء!

مرحباً ${assigneeName}،

📌 المهمة: ${task.title}
⏰ المتبقي: ${daysLeft} ${daysLeft === 1 ? 'يوم' : 'أيام'}
📂 القسم: ${task.department || 'غير محدد'}
🎨 الحالة: ${task.status || 'غير محدد'}

${daysLeft <= 1 ? 'تحتاج متابعة عاجلة! 🔥' : 'لا تنسى المتابعة 👀'}

بالتوفيق! 💪`

    return await this.sendMessage(assigneePhone, message)
  }

  /**
   * إرسال تنبيه ملف جديد (نسخة من Zapier)
   */
  async sendNewFileNotification(task, assigneeName, assigneePhone, fileUrl, uploadedBy, group) {
    const message = `مرحباً،
تم إضافة ملف جديد للمهمة من قِبل ${uploadedBy}:

اسم المهمة: ${task.title || 'غير محدد'}
القسم: ${task.department || 'غير محدد'}
المجموعة: ${group || 'غير محدد'}
الملف: ${fileUrl}

يرجى الاطلاع عليه في أقرب وقت.`

    return await this.sendMessage(assigneePhone, message)
  }

  /**
   * إرسال تنبيه تجاوز تاريخ التسليم
   */
  async sendOverdueTaskNotification(task, assigneeName, assigneePhone, daysOverdue) {
    const message = `🚨 تنبيه عاجل يا ${assigneeName}!

المهمة تجاوزت تاريخ التسليم:

📋 المهمة: ${task.title || 'غير محدد'}
📂 القسم: ${task.department || 'غير محدد'}
⏰ متأخرة بـ: ${daysOverdue} ${daysOverdue === 1 ? 'يوم' : 'أيام'}
🎨 الحالة: ${task.status || 'غير محدد'}

⚠️ يرجى المتابعة فوراً!
التأخير يؤثر على سير العمل.`

    return await this.sendMessage(assigneePhone, message)
  }

  /**
   * اختبار الاتصال
   */
  async testConnection() {
    try {
      // إرسال رسالة اختبار بسيطة
      const testMessage = '✅ اختبار اتصال Ultra MSG - Sunday Board Pro'

      // يمكنك وضع رقمك هنا للاختبار
      const testPhone = '966500000000' // غير هذا لرقمك

      return await this.sendMessage(testPhone, testMessage)
    } catch (error) {
      return {
        success: false,
        message: 'فشل اختبار الاتصال',
        error: error.message
      }
    }
  }
}

// إنشاء instance واحد للاستخدام في كل التطبيق
const ultraMsgService = new UltraMsgService()

export default ultraMsgService
