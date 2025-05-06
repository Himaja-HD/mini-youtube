import express from 'express'
import {
  addComment,
  deleteComment,
  editComment,
  getVideoComments
} from '../controllers/commentController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Public: Get all comments on a video
router.get('/:videoId', getVideoComments)

// Authenticated: Add a comment to a video
router.post('/:videoId', verifyJWT, addComment)

// Authenticated: Edit a comment
router.put('/edit/:commentId', verifyJWT, editComment)

// Authenticated: Delete a comment 
router.delete('/delete/:commentId', verifyJWT, deleteComment)

export default router
