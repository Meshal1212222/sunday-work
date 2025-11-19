import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get users in organization'
  });
});

router.post('/', authorize('owner', 'admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Invite user'
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Get user by ID'
  });
});

router.put('/:id', authorize('owner', 'admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Update user'
  });
});

router.delete('/:id', authorize('owner', 'admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Delete user'
  });
});

export default router;
