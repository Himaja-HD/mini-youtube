import express from 'express';
import {
  createChannel,
  getMyChannel,
  getAllOtherChannels,
  updateChannel,
  deleteChannel,
  subscribeToChannel,
  unsubscribeFromChannel,
  isSubscribedToChannel,
  getChannelByHandle,
  getChannelById,
  getChannelByUserId,
} from '../controllers/channelController.js';

import  protect  from '../middlewares/authMiddleware.js';

const router = express.Router();

// --- PROTECTED ROUTES ---
router.post('/', protect, createChannel);
router.get('/me', protect, getMyChannel);
router.put('/:channelId', protect, updateChannel);
router.delete('/:channelId', protect, deleteChannel);

// --- SUBSCRIPTION ROUTES ---
router.post('/:channelId/subscribe', protect, subscribeToChannel);
router.post('/:channelId/unsubscribe', protect, unsubscribeFromChannel);
router.get('/:channelId/is-subscribed', protect, isSubscribedToChannel);

// --- PUBLIC ROUTES ---
router.get('/', getAllOtherChannels);
router.get('/handle/:handle', getChannelByHandle);
router.get('/id/:id', getChannelById);
router.get('/user/:userId', getChannelByUserId);

export default router;
