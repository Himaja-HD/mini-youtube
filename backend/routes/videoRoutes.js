import express from 'express';
import {
  createVideo,
  getAllVideos,
  getVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  unlikeVideo,
  searchVideos,
} from '../controllers/videoController.js';

import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllVideos);
router.get('/search', searchVideos);
router.get('/:id', getVideo);

router.post('/', protect, createVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

router.put('/like/:id', protect, likeVideo);
router.put('/unlike/:id', protect, unlikeVideo);

export default router;
