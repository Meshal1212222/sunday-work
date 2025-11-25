import { useState, useEffect, useRef } from 'react'
import { ref, push, onValue, serverTimestamp } from 'firebase/database'
import { database } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import {
  MessageCircle,
  Send,
  X,
  Paperclip,
  Smile,
  Image,
  MoreVertical,
  Reply,
  ChevronDown
} from 'lucide-react'
import './BoardChat.css'

export default function BoardChat({ boardId, boardName }) {
  const { userData } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // تحميل الرسائل من Firebase
  useEffect(() => {
    if (!boardId) return

    const chatRef = ref(database, `boardChats/${boardId}/messages`)

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const messagesList = Object.entries(data).map(([id, msg]) => ({
          id,
          ...msg
        })).sort((a, b) => a.timestamp - b.timestamp)

        setMessages(messagesList)

        // عدد الرسائل غير المقروءة
        if (!isOpen) {
          const lastRead = localStorage.getItem(`chat-${boardId}-lastRead`) || 0
          const unread = messagesList.filter(m => m.timestamp > lastRead).length
          setUnreadCount(unread)
        }
      }
    })

    return () => unsubscribe()
  }, [boardId, isOpen])

  // التمرير للأسفل عند وصول رسالة جديدة
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      localStorage.setItem(`chat-${boardId}-lastRead`, Date.now())
      setUnreadCount(0)
    }
  }, [messages, isOpen, boardId])

  // إرسال رسالة
  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !boardId) return

    setIsLoading(true)
    try {
      const chatRef = ref(database, `boardChats/${boardId}/messages`)
      await push(chatRef, {
        text: newMessage.trim(),
        sender: {
          id: userData?.uid || 'anonymous',
          name: userData?.displayName || 'مستخدم',
          avatar: userData?.photoURL || null
        },
        timestamp: Date.now(),
        type: 'text'
      })
      setNewMessage('')
      inputRef.current?.focus()
    } catch (error) {
      console.error('Error sending message:', error)
    }
    setIsLoading(false)
  }

  // تنسيق الوقت
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date

    // اليوم
    if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
      return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }
    // أمس
    if (diff < 48 * 60 * 60 * 1000) {
      return 'أمس ' + date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }
    // أقدم
    return date.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })
  }

  // الحصول على الحرف الأول للأفاتار
  const getInitials = (name) => {
    if (!name) return '؟'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <>
      {/* زر فتح الدردشة */}
      <button
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown size={24} />
        ) : (
          <>
            <MessageCircle size={24} />
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </>
        )}
      </button>

      {/* نافذة الدردشة */}
      {isOpen && (
        <div className="board-chat">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-title">
              <MessageCircle size={20} />
              <div>
                <h3>دردشة البورد</h3>
                <span className="chat-board-name">{boardName}</span>
              </div>
            </div>
            <button className="close-chat" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="no-messages">
                <MessageCircle size={48} />
                <p>لا توجد رسائل بعد</p>
                <span>ابدأ المحادثة مع فريقك!</span>
              </div>
            ) : (
              messages.map((message, index) => {
                const isOwn = message.sender?.id === userData?.uid
                const showAvatar = index === 0 ||
                  messages[index - 1]?.sender?.id !== message.sender?.id

                return (
                  <div
                    key={message.id}
                    className={`message ${isOwn ? 'own' : ''} ${showAvatar ? 'with-avatar' : ''}`}
                  >
                    {!isOwn && showAvatar && (
                      <div className="message-avatar">
                        {message.sender?.avatar ? (
                          <img src={message.sender.avatar} alt={message.sender.name} />
                        ) : (
                          <span>{getInitials(message.sender?.name)}</span>
                        )}
                      </div>
                    )}
                    <div className="message-content">
                      {!isOwn && showAvatar && (
                        <span className="sender-name">{message.sender?.name}</span>
                      )}
                      <div className="message-bubble">
                        <p>{message.text}</p>
                        <span className="message-time">{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chat-input" onSubmit={sendMessage}>
            <button type="button" className="input-action">
              <Paperclip size={20} />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="اكتب رسالة..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isLoading}
            />
            <button type="button" className="input-action">
              <Smile size={20} />
            </button>
            <button
              type="submit"
              className="send-btn"
              disabled={!newMessage.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
