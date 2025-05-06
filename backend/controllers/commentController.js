import Comment from '../models/Comment.js'
import Video from '../models/Video.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import ApiError from '../utils/ApiError.js'


const addComment = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const { videoId } = req.params
  const { content } = req.body

  const video = await Video.findOne({ videoId })
  if (!video) throw new ApiError(404, 'Video not found')
  if (!video.commentsStatus) throw new ApiError(403, 'Comments are disabled on this video')

  const comment = await Comment.create({ user: userId, video: video._id, content })
  video.comments.push(comment._id)
  await video.save()

  res.status(201).json({ message: 'Comment added', comment })
})


const deleteComment = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const { commentId } = req.params

  const comment = await Comment.findById(commentId)
  if (!comment) throw new ApiError(404, 'Comment not found')
  if (!comment.user.equals(userId)) throw new ApiError(403, 'You are not authorized to delete this comment')

  await Video.findByIdAndUpdate(comment.video, { $pull: { comments: comment._id } })
  await comment.deleteOne()

  res.status(200).json({ message: 'Comment deleted' })
})


const editComment = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const { commentId } = req.params
  const { content } = req.body

  const comment = await Comment.findById(commentId)
  if (!comment) throw new ApiError(404, 'Comment not found')
  if (!comment.user.equals(userId)) throw new ApiError(403, 'You are not authorized to edit this comment')

  comment.content = content
  comment.edited = true
  await comment.save()

  res.status(200).json({ message: 'Comment updated', comment })
})


const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  const video = await Video.findOne({ videoId }).populate({
    path: 'comments',
    populate: { path: 'user', select: 'username avatar' },
    options: { sort: { createdAt: -1 } }
  })

  if (!video) throw new ApiError(404, 'Video not found')

  res.status(200).json({ comments: video.comments })
})

export {
  addComment,
  deleteComment,
  editComment,
  getVideoComments
}
