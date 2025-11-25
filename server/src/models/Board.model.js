import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'text', 'status', 'person', 'date', 'timeline',
      'numbers', 'rating', 'progress', 'tags', 'priority',
      'files', 'link', 'location', 'email', 'phone',
      'checkbox', 'dropdown', 'formula', 'duration'
    ]
  },
  width: {
    type: Number,
    default: 150
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: true
  },
  settings: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { _id: false });

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide board name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  columns: [columnSchema],
  view: {
    type: {
      type: String,
      enum: ['table', 'kanban', 'calendar', 'timeline', 'chart'],
      default: 'table'
    },
    groupBy: String,
    sortBy: {
      field: String,
      order: {
        type: String,
        enum: ['asc', 'desc'],
        default: 'asc'
      }
    },
    filters: [{
      field: String,
      operator: String,
      value: mongoose.Schema.Types.Mixed
    }]
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['admin', 'member', 'viewer'],
      default: 'member'
    }
  }],
  settings: {
    allowComments: { type: Boolean, default: true },
    allowAttachments: { type: Boolean, default: true },
    allowSubtasks: { type: Boolean, default: true },
    allowDuplicates: { type: Boolean, default: false },
    showRowNumbers: { type: Boolean, default: true },
    enableAutomations: { type: Boolean, default: false }
  },
  automations: [{
    name: String,
    trigger: {
      type: String,
      event: String,
      conditions: mongoose.Schema.Types.Mixed
    },
    actions: [{
      type: String,
      params: mongoose.Schema.Types.Mixed
    }],
    isActive: { type: Boolean, default: true }
  }],
  isTemplate: {
    type: Boolean,
    default: false
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
  stats: {
    totalTasks: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    activeTasks: { type: Number, default: 0 },
    overdueTasks: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
boardSchema.index({ workspace: 1, isArchived: 1 });
boardSchema.index({ organization: 1 });
boardSchema.index({ owner: 1 });
boardSchema.index({ 'members.user': 1 });

// Virtual for tasks
boardSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'board'
});

// Update stats
boardSchema.methods.updateStats = async function() {
  const Task = mongoose.model('Task');

  const stats = await Task.aggregate([
    { $match: { board: this._id } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        completed: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        active: {
          $sum: { $cond: [{ $in: ['$status', ['active', 'in-progress']] }, 1, 0] }
        },
        overdue: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $ne: ['$status', 'completed'] },
                  { $lt: ['$dueDate', new Date()] }
                ]
              },
              1,
              0
            ]
          }
        }
      }
    }
  ]);

  if (stats.length > 0) {
    this.stats = {
      totalTasks: stats[0].total,
      completedTasks: stats[0].completed,
      activeTasks: stats[0].active,
      overdueTasks: stats[0].overdue
    };
    await this.save();
  }
};

const Board = mongoose.model('Board', boardSchema);

export default Board;
