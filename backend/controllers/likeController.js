import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Like from '../models/like.model.js';
import Video from '../models/video.model.js';

export const toggleLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, 'Video not found');

  const existingLike = await Like.findOne({ user: userId, video: videoId, isLike: true });

  if (existingLike) {
    await existingLike.deleteOne();
    video.likesCount = Math.max(video.likesCount - 1, 0);
    await video.save();
    return res.status(200).json({ liked: false, likes: video.likesCount });
  }

  // Remove existing dislike if any
  const existingDislike = await Like.findOne({ user: userId, video: videoId, isLike: false });
  if (existingDislike) {
    await existingDislike.deleteOne();
    video.dislikesCount = Math.max(video.dislikesCount - 1, 0);
  }

  await Like.create({ user: userId, video: videoId, isLike: true });
  video.likesCount++;
  await video.save();

  res.status(200).json({ liked: true, likes: video.likesCount });
});

/**
 * Toggle dislike for a video
 */
export const toggleDislike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, 'Video not found');

  const existingDislike = await Like.findOne({ user: userId, video: videoId, isLike: false });

  if (existingDislike) {
    await existingDislike.deleteOne();
    video.dislikesCount = Math.max(video.dislikesCount - 1, 0);
    await video.save();
    return res.status(200).json({ disliked: false, dislikes: video.dislikesCount });
  }

  // Remove existing like if any
  const existingLike = await Like.findOne({ user: userId, video: videoId, isLike: true });
  if (existingLike) {
    await existingLike.deleteOne();
    video.likesCount = Math.max(video.likesCount - 1, 0);
  }

  await Like.create({ user: userId, video: videoId, isLike: false });
  video.dislikesCount++;
  await video.save();

  res.status(200).json({ disliked: true, dislikes: video.dislikesCount });
});
