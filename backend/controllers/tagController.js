import Tag from '../models/Tag.js'
import Video from '../models/Video.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'

const getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find().select('name').sort({ name: 1 })
  res.status(200).json({ tags })
})

const getVideosByTag = asyncHandler(async (req, res) => {
  const { tagName } = req.params
  const tag = await Tag.findOne({ name: tagName }).populate({
    path: 'videos',
    match: { isPublished: true },
    select: 'title thumbnailUrl views createdAt'
  })

  if (!tag) throw new ApiError(404, 'Tag not found')

  res.status(200).json({ videos: tag.videos })
})

export { getAllTags, getVideosByTag }
