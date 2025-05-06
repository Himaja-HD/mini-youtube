import Video from '../models/Video.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'

export const searchVideos = asyncHandler(async (req, res) => {
  const { search = "" } = req.query

  const allVideos = await Video.find({ isPublished: true })
    .select("title thumbnailUrl views createdAt")
    .populate("owner", "username avatar")
    .lean()

  const filteredVideos = allVideos.filter(video =>
    video.title.toLowerCase().includes(search.toLowerCase())
  )

  res.status(200).json(new ApiResponse(200, filteredVideos, "Search results"))
})
