import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  mentions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  attachments: [{
    name: String,
    url: String,
    size: Number,
    type: String
  }],
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date
}, { timestamps: true });

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide task title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  // Dynamic fields based on board columns
  fields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  // Common fields
  status: {
    type: String,
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dueDate: Date,
  startDate: Date,
  completedAt: Date,
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [String],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  estimatedHours: Number,
  actualHours: Number,
  budget: Number,
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  // Relations
  parentTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  subtasks: [subtaskSchema],
  dependencies: [{
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    type: {
      type: String,
      enum: ['blocks', 'blocked-by', 'related'],
      default: 'related'
    }
  }],
  // Comments & Activity
  comments: [commentSchema],
  watchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  attachments: [{
    name: String,
    url: String,
    size: Number,
    type: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Metadata
  position: {
    type: Number,
    default: 0
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  archivedAt: Date,
  archivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  customId: String, // Organization-specific task ID
  externalLinks: [{
    name: String,
    url: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
taskSchema.index({ board: 1, isArchived: 1, position: 1 });
taskSchema.index({ workspace: 1 });
taskSchema.index({ organization: 1 });
taskSchema.index({ assignees: 1 });
taskSchema.index({ creator: 1 });
taskSchema.index({ status: 1, dueDate: 1 });
taskSchema.index({ tags: 1 });

// Virtual for overdue status
taskSchema.virtual('isOverdue').get(function() {
  return this.dueDate &&
         this.dueDate < new Date() &&
         this.status !== 'completed';
});

// Virtual for subtasks completion
taskSchema.virtual('subtasksProgress').get(function() {
  if (this.subtasks.length === 0) return 0;
  const completed = this.subtasks.filter(st => st.isCompleted).length;
  return Math.round((completed / this.subtasks.length) * 100);
});

// Auto-update board stats when task changes
taskSchema.post('save', async function() {
  const Board = mongoose.model('Board');
  const board = await Board.findById(this.board);
  if (board) {
    await board.updateStats();
  }
});

taskSchema.post('remove', async function() {
  const Board = mongoose.model('Board');
  const board = await Board.findById(this.board);
  if (board) {
    await board.updateStats();
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
