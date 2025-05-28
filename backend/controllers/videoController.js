import mongoose from 'mongoose';
import Video from '../models/videoModel.js';
import Channel from '../models/channelModel.js';

// Create a new video
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnail, category } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    const userId = req.user._id;
    const channel = await Channel.findOne({ user: new mongoose.Types.ObjectId(userId) });

    if (!channel) {
      return res.status(400).json({ message: 'Please create a channel before adding videos' });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnail,
      category,
      channel: channel._id,
    });

    channel.videos.push(video._id);
    await channel.save();

    res.status(201).json(video);
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('channel', 'name handle avatar')
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching videos' });
  }
};

// Get single video by ID (with channel and comments)
export const getVideo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }

    const video = await Video.findById(id)
      .populate('channel', 'name handle avatar')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username avatar' },
      });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.views += 1;       // Increment views count
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching video' });
  }
};

// Update video (owner only)
export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }

    const video = await Video.findById(id).populate('channel');
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.channel.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Forbidden: Not your video' });
    }

    const { title, description, category } = req.body;

    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;

    const updated = await video.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating video' });
  }
};

// Delete video (owner only)
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }

    const video = await Video.findById(id).populate('channel');
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.channel.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Forbidden: Not your video' });
    }

    await Channel.findByIdAndUpdate(video.channel._id, {
      $pull: { videos: video._id },
    });

    await video.deleteOne();
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting video' });
  }
};

// Like video (toggle)
export const likeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const likedIndex = video.likes.indexOf(userId);
    const unlikedIndex = video.unlikes.indexOf(userId);

    if (likedIndex !== -1) {
      video.likes.splice(likedIndex, 1); // Remove like
    } else {
      video.likes.push(userId);          // Add like
      if (unlikedIndex !== -1) {
        video.unlikes.splice(unlikedIndex, 1); // Remove unlike if exists
      }
    }

    await video.save();
    res.status(200).json({
      message: 'Like status updated',
      likes: video.likes.length,
      unlikes: video.unlikes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating like status' });
  }
};

// Unlike video (toggle)
export const unlikeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const likedIndex = video.likes.indexOf(userId);
    const unlikedIndex = video.unlikes.indexOf(userId);

    if (unlikedIndex !== -1) {
      video.unlikes.splice(unlikedIndex, 1); // Remove unlike
    } else {
      video.unlikes.push(userId);             // Add unlike
      if (likedIndex !== -1) {
        video.likes.splice(likedIndex, 1);   // Remove like if exists
      }
    }

    await video.save();
    res.status(200).json({
      message: 'Unlike status updated',
      likes: video.likes.length,
      unlikes: video.unlikes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating unlike status' });
  }
};

// Search videos by title or description
export const searchVideos = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const videos = await Video.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    }).populate('channel', 'name handle avatar');

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error searching videos' });
  }
};
