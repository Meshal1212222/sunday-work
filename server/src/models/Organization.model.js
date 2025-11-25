import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide organization name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  logo: {
    type: String,
    default: null
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  industry: {
    type: String,
    enum: [
      'technology',
      'healthcare',
      'finance',
      'education',
      'retail',
      'manufacturing',
      'services',
      'other'
    ]
  },
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    default: '1-10'
  },
  country: String,
  city: String,
  address: String,
  phone: String,
  website: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member', 'guest'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'professional', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'trial', 'cancelled', 'expired'],
      default: 'trial'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    trialEndsAt: {
      type: Date,
      default: () => new Date(+new Date() + 14*24*60*60*1000) // 14 days trial
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    limits: {
      users: { type: Number, default: 5 },
      workspaces: { type: Number, default: 3 },
      boards: { type: Number, default: 10 },
      tasks: { type: Number, default: 100 },
      storage: { type: Number, default: 1024 } // MB
    },
    features: {
      customFields: { type: Boolean, default: false },
      automations: { type: Boolean, default: false },
      integrations: { type: Boolean, default: false },
      advancedReports: { type: Boolean, default: false },
      prioritySupport: { type: Boolean, default: false },
      whiteLabel: { type: Boolean, default: false },
      api: { type: Boolean, default: false }
    }
  },
  usage: {
    users: { type: Number, default: 1 },
    workspaces: { type: Number, default: 0 },
    boards: { type: Number, default: 0 },
    tasks: { type: Number, default: 0 },
    storage: { type: Number, default: 0 }
  },
  settings: {
    allowPublicBoards: { type: Boolean, default: false },
    allowGuestAccess: { type: Boolean, default: true },
    requireEmailVerification: { type: Boolean, default: true },
    twoFactorAuth: { type: Boolean, default: false },
    ipWhitelist: [String],
    workingDays: {
      type: [Number],
      default: [1, 2, 3, 4, 5] // Monday to Friday
    },
    workingHours: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' }
    },
    defaultLanguage: {
      type: String,
      default: 'ar',
      enum: ['ar', 'en']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
organizationSchema.index({ slug: 1 });
organizationSchema.index({ owner: 1 });
organizationSchema.index({ 'subscription.status': 1 });

// Virtual for checking if subscription is active
organizationSchema.virtual('isSubscriptionActive').get(function() {
  return this.subscription.status === 'active' || this.subscription.status === 'trial';
});

// Virtual for checking if trial is expired
organizationSchema.virtual('isTrialExpired').get(function() {
  return this.subscription.status === 'trial' &&
         this.subscription.trialEndsAt < new Date();
});

// Check if organization has reached limit
organizationSchema.methods.hasReachedLimit = function(resource) {
  const limit = this.subscription.limits[resource];
  const usage = this.usage[resource];
  return usage >= limit;
};

// Check if organization has feature
organizationSchema.methods.hasFeature = function(feature) {
  return this.subscription.features[feature] === true;
};

// Generate unique slug
organizationSchema.pre('save', async function(next) {
  if (this.isNew && !this.slug) {
    const baseSlug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let slug = baseSlug;
    let counter = 1;

    while (await mongoose.models.Organization.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;
