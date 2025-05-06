import express from "express";
import {
  createChannel,
  getChannel,
  updateChannel,
  deleteChannel,
  toggleChannelSubscription
} from "../controllers/channelController.js";
import upload from "../middleware/multerMiddleware.js";
import verifyJWT from "../middleware/authMiddleware.js";

const router = express.Router();

// Channel 
router.post("/", verifyJWT, upload.single("banner"), createChannel);
router.put("/", verifyJWT, upload.single("banner"), updateChannel);
router.delete("/", verifyJWT, deleteChannel);


router.get("/:channelId", getChannel);

// Subscriptions 
router.post("/:channelId/subscribe", verifyJWT, toggleChannelSubscription);


export default router;
