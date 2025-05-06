import express from 'express'
import { getVideosByTag, getAllTags } from '../controllers/tagController.js'

const router = express.Router()

// Public - Get all tags
router.get('/', getAllTags)

// Public - Get videos by tag
router.get('/:tagName/videos', getVideosByTag)

export default router
