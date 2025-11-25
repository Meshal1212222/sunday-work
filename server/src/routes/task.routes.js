import express from 'express';
import { protect, checkLimit } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get tasks'
  });
});

router.post('/', checkLimit('tasks'), (req, res) => {
  res.json({
    success: true,
    message: 'Create task'
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Get task by ID'
  });
});

router.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Update task'
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Delete task'
  });
});

export default router;
