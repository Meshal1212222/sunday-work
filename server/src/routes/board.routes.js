import express from 'express';
import { protect, checkLimit } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get boards'
  });
});

router.post('/', checkLimit('boards'), (req, res) => {
  res.json({
    success: true,
    message: 'Create board'
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Get board by ID'
  });
});

router.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Update board'
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Delete board'
  });
});

export default router;
