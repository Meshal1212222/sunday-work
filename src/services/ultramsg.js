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
   * @param {string} phoneNumber - رقم الهاتف (مثال: 966501234567)
   * @param {string} message - نص الرسالة
   */
  async sendMessage(phoneNumber, message) {
    try {
      // تأكد من صيغة الرقم الصحيحة (مع كود الدولة بدون +)
      let formattedPhone = phoneNumber.replace(/[^0-9]/g, '')

      // Add @c.us suffix if not present (required by Ultra MSG)
      if (!formattedPhone.includes('@')) {
        formattedPhone = `${formattedPhone}@c.us`
      }

      const url = `${this.apiUrl}/messages/chat`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          token: this.token,
          to: formattedPhone,
          body: message,
          priority: '10', // أعلى أولوية
        }),
      })

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
