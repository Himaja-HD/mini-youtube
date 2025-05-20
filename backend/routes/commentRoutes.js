import express from 'express';
import {
  createComment,
  getVideoComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';

import protect from '../middlewares/authMiddleware.js';

const commentRouter = express.Router();

// Create comment route (auth required)
commentRouter.post('/', protect, createComment);

// Get comments for a video (public route)
commentRouter.get('/:videoId', getVideoComments);

// Update comment (auth required)
commentRouter.put('/:id', protect, updateComment);

// Delete comment (auth required)
commentRouter.delete('/:id', protect, deleteComment);

export default commentRouter;
