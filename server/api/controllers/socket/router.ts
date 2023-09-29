
import express from 'express';
import { handleConnection } from '../../services/socketService';

const router = express.Router();

// API endpoint for initializing the chat
router.post('/start-chat', (req, res) => {
  // Handle the chat connection
  handleConnection(req.body.socket);

  // Return a success response
  res.status(200).json({ message: 'Chat connection initiated successfully' });
});

export default router;