import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/plans', (req, res) => {
  res.json({
    success: true,
    data: {
      plans: [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          interval: 'forever',
          features: {
            users: 5,
            workspaces: 3,
            boards: 10,
            tasks: 100,
            storage: 1024,
            customFields: false,
            automations: false,
            integrations: false,
            advancedReports: false,
            prioritySupport: false
          }
        },
        {
          id: 'basic',
          name: 'Basic',
          price: 99,
          interval: 'month',
          features: {
            users: 20,
            workspaces: 10,
            boards: 50,
            tasks: 1000,
            storage: 10240,
            customFields: true,
            automations: false,
            integrations: false,
            advancedReports: false,
            prioritySupport: false
          }
        },
        {
          id: 'professional',
          name: 'Professional',
          price: 299,
          interval: 'month',
          features: {
            users: 100,
            workspaces: -1,
            boards: -1,
            tasks: -1,
            storage: 102400,
            customFields: true,
            automations: true,
            integrations: true,
            advancedReports: true,
            prioritySupport: false
          }
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 999,
          interval: 'month',
          features: {
            users: -1,
            workspaces: -1,
            boards: -1,
            tasks: -1,
            storage: -1,
            customFields: true,
            automations: true,
            integrations: true,
            advancedReports: true,
            prioritySupport: true,
            whiteLabel: true,
            api: true
          }
        }
      ]
    }
  });
});

router.get('/current', (req, res) => {
  res.json({
    success: true,
    data: {
      subscription: req.user.organization.subscription,
      usage: req.user.organization.usage
    }
  });
});

router.post('/upgrade', authorize('owner'), (req, res) => {
  res.json({
    success: true,
    message: 'Upgrade subscription (Stripe integration needed)'
  });
});

router.post('/cancel', authorize('owner'), (req, res) => {
  res.json({
    success: true,
    message: 'Cancel subscription'
  });
});

export default router;
