import express from 'express';
import {
  createChannel,
  getMyChannel,
  getAllOtherChannels,
  updateChannel,
  deleteChannel,
  subscribeToChannel,
  unsubscribeFromChannel,
} from '../controllers/channelController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createChannel);
router.get('/me', getMyChannel);
router.get('/explore', getAllOtherChannels);
router.put('/:channelId', protect, updateChannel);
router.delete('/:channelId', protect, deleteChannel);
router.post('/:channelId/subscribe', protect, subscribeToChannel);
router.post('/:channelId/unsubscribe', protect, unsubscribeFromChannel);

export default router;
