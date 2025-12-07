#!/usr/bin/env python3
"""إرسال رسالة تفعيل نظام مراقبة Crashes"""

import requests
import os

# إعدادات UltraMsg من البيئة أو القيم الافتراضية
INSTANCE_ID = os.environ.get("ULTRAMSG_INSTANCE_ID", "")
TOKEN = os.environ.get("ULTRAMSG_TOKEN", "")
RECIPIENTS = os.environ.get("CRASH_ALERT_RECIPIENTS", "966532263391,966563652525")

MESSAGE = """✅ *تم تفعيل نظام مراقبة Crashes - Golden Host*

━━━━━━━━━━━━━━━

*كيف يعمل النظام:*
• مراقبة لحظية للتطبيق 24/7
• فحص كل دقيقة للكشف عن أي crash
• تنبيه فوري على هذا الرقم

*متى يجيك تنبيه:*
• أول ما يصير crash جديد في التطبيق
• يوضح الشاشة اللي صار فيها المشكلة
• يوضح المنصة (iOS/Android) والإصدار

━━━━━━━━━━━━━━━

*📱 مثال على التنبيه:*

🚨 *تنبيه Crashes - سري*

🚨 *Crash جديد الآن!*

*🆕 Crashes جديدة:*
🍎 PaymentScreen (1x) v2.1.0
🤖 CheckoutScreen (2x) v2.0.8

الإجمالي: *3* crashes

━━━━━━━━━━━━━━━

⏰ 2025-12-07
_شركة ليفل أب القابضة | Botng_"""


def send_message(phone: str, message: str) -> dict:
    """إرسال رسالة عبر UltraMsg"""
    url = f"https://api.ultramsg.com/{INSTANCE_ID}/messages/chat"
    payload = {
        "token": TOKEN,
        "to": phone,
        "body": message
    }
    response = requests.post(url, data=payload)
    return response.json()


def main():
    if not INSTANCE_ID or not TOKEN:
        print("❌ خطأ: يجب تعيين ULTRAMSG_INSTANCE_ID و ULTRAMSG_TOKEN")
        print("   يمكنك تشغيل هذا على Railway بعد الـ merge")
        return

    recipients = RECIPIENTS.split(",")
    print("جاري إرسال رسالة التفعيل...")

    for recipient in recipients:
        recipient = recipient.strip()
        if recipient:
            print(f"  → إرسال إلى {recipient}...")
            result = send_message(recipient, MESSAGE)
            print(f"    النتيجة: {result}")

    print("\n✅ تم إرسال الرسائل!")


if __name__ == "__main__":
    main()
