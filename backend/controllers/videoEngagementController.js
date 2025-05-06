import Video from '../models/Video.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import ApiError from '../utils/ApiError.js'

export const toggleLike = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const { videoId } = req.params

  const video = await Video.findOne({ videoId })
  if (!video) throw new ApiError(404, 'Video not found')

  const hasLiked = video.likes.includes(userId)
  const hasDisliked = video.dislikes.includes(userId)

  if (hasLiked) {
    video.likes.pull(userId)
  } else {
    video.likes.push(userId)
    if (hasDisliked) video.dislikes.pull(userId)
  }

  await video.save()
  res.status(200).json({ message: 'Like toggled', likes: video.likes.length })
})


export const toggleDislike = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const { videoId } = req.params

  const video = await Video.findOne({ videoId })
  if (!video) throw new ApiError(404, 'Video not found')

  const hasDisliked = video.dislikes.includes(userId)
  const hasLiked = video.likes.includes(userId)

  if (hasDisliked) {
    video.dislikes.pull(userId)
  } else {
    video.dislikes.push(userId)
    if (hasLiked) video.likes.pull(userId)
  }

  await video.save()
  res.status(200).json({ message: 'Dislike toggled', dislikes: video.dislikes.length })
})


export const incrementViewCount = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  const video = await Video.findOneAndUpdate(
    { videoId, viewsEnabled: true },
    { $inc: { views: 1 } },
    { new: true }
  )

  if (!video) throw new ApiError(404, 'Video not found or views disabled')

  res.status(200).json({ message: 'View incremented', views: video.views })
})
