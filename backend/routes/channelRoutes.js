import express from "express";
import {
  createChannel,
  getChannel,
  updateChannel,
  deleteChannel,
  subscribeChannel,
  unsubscribeChannel,
} from "../controllers/channelController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js"; 

const router = express.Router();

// @route   POST /api/channels
// @desc    Create new channel (with banner image)
// @access  Private
router.post("/", protect, upload.single("channelBanner"), createChannel);

// @route   GET /api/channels/:channelId
// @desc    Get a single channel by channelId
// @access  Public
router.get("/:channelId", getChannel);

// @route   PUT /api/channels
// @desc    Update current user's channel
// @access  Private
router.put("/:channelId", protect, upload.single("channelBanner"), updateChannel);

// @route   DELETE /api/channels
// @desc    Delete current user's channel
// @access  Private
router.delete("/:channelId", protect, deleteChannel);

// @route   POST /api/channels/:channelId/subscribe
// @desc    Subscribe to a channel
// @access  Private
router.post("/:channelId/subscribe", protect, subscribeChannel);

// @route   POST /api/channels/:channelId/unsubscribe
// @desc    Unsubscribe from a channel
// @access  Private
router.post("/:channelId/unsubscribe", protect, unsubscribeChannel);

export default router;
