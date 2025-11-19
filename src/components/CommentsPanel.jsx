import React, { useState } from 'react'
import { X, AtSign, Paperclip, Smile } from 'lucide-react'
import Avatar from './Avatar'
import './CommentsPanel.css'

export default function CommentsPanel({ onClose }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Mohammed Ali',
      time: '2 hours ago',
      text: 'This looks great! When can we review?',
      avatar: 'MA'
    },
    {
      id: 2,
      author: 'Sarah Ahmed',
      time: '1 hour ago',
      text: 'I agree! Let me know when you are ready.',
      avatar: 'SA'
    }
  ])

  const handleSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: 'You',
        time: 'Just now',
        text: comment,
        avatar: 'Y'
      }
      setComments([...comments, newComment])
      setComment('')
    }
  }

  return (
    <div className="comments-panel">
      {/* Header */}
      <div className="comments-header">
        <h2>💬 Comments</h2>
        <button onClick={onClose} className="close-btn">
          <X size={20} />
        </button>
      </div>

      {/* Comments List */}
      <div className="comments-list">
        {comments.map(c => (
          <div key={c.id} className="comment-item">
            <Avatar name={c.author} size={36} />
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-author">{c.author}</span>
                <span className="comment-time">{c.time}</span>
              </div>
              <div className="comment-text">{c.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="comments-input-area">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="comment-textarea"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <div className="comment-actions">
          <div className="comment-tools">
            <button className="tool-btn" title="Mention someone">
              <AtSign size={16} />
            </button>
            <button className="tool-btn" title="Attach file">
              <Paperclip size={16} />
            </button>
            <button className="tool-btn" title="Add emoji">
              <Smile size={16} />
            </button>
          </div>
          <button
            className="send-btn"
            onClick={handleSubmit}
            disabled={!comment.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
