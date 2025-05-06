import express from 'express';
import { toggleLike, toggleDislike } from '../controllers/likeController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:videoId/like', verifyJWT, toggleLike);
router.post('/:videoId/dislike', verifyJWT, toggleDislike);

export default router;
