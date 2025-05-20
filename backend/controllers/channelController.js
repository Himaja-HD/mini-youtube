import Channel from '../models/channelModel.js';
import User from '../models/userModel.js';
import Video from '../models/videoModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

// Create channel
export const createChannel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, description, handle, banner, avatar } = req.body;

  if (banner && !isValidUrl(banner)) {
    return res.status(400).json({ message: 'Invalid banner URL' });
  }
  if (avatar && !isValidUrl(avatar)) {
    return res.status(400).json({ message: 'Invalid avatar URL' });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(401).json({ message: 'User not found' });

  const existingChannel = await Channel.findOne({ user: userId });
  if (existingChannel) {
    return res.status(400).json({ message: 'User already has a channel' });
  }

  const handleExists = await Channel.findOne({ handle });
  if (handleExists) {
    return res.status(400).json({ message: 'Handle is already taken' });
  }

  const channel = new Channel({ user: userId, name, description, handle, banner, avatar });
  await channel.save();

  user.channel = channel._id;
  await user.save();

  res.status(201).json({ message: 'Channel created successfully', channel });
});

// Get own channel
export const getMyChannel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const channel = await Channel.findOne({ user: userId })
    .populate('user', 'username email')
    .populate('videos', 'name description handle banner avatar');

  if (!channel) return res.status(404).json({ message: 'Channel not found' });
  res.status(200).json(channel);
});

// Get all other channels
export const getAllOtherChannels = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const filter = userId ? { user: { $ne: userId } } : {};
  const channels = await Channel.find(filter).populate('videos', 'name description handle banner avatar');

  res.status(200).json(channels);
});

// Update channel
export const updateChannel = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user._id;
  const updates = req.body;

  if (updates.banner && !isValidUrl(updates.banner)) {
    return res.status(400).json({ message: 'Invalid banner URL' });
  }
  if (updates.avatar && !isValidUrl(updates.avatar)) {
    return res.status(400).json({ message: 'Invalid avatar URL' });
  }

  if (updates.handle) {
    const handleExists = await Channel.findOne({ handle: updates.handle, _id: { $ne: channelId } });
    if (handleExists) {
      return res.status(400).json({ message: 'Handle is already taken' });
    }
  }

  const channel = await Channel.findById(channelId);
  if (!channel) return res.status(404).json({ message: 'Channel not found' });

  if (!channel.user.equals(userId)) {
    return res.status(403).json({ message: 'Unauthorized: Not your channel' });
  }

  Object.assign(channel, updates);
  await channel.save();

  res.status(200).json({ message: 'Channel updated', channel });
});

// Delete channel
export const deleteChannel = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user._id;

  const channel = await Channel.findById(channelId);
  if (!channel) return res.status(404).json({ message: 'Channel not found' });

  if (!channel.user.equals(userId)) {
    return res.status(403).json({ message: 'Unauthorized: Not your channel' });
  }

  await Channel.findByIdAndDelete(channelId);
  await User.findByIdAndUpdate(userId, { channel: null });

  res.status(200).json({ message: 'Channel deleted successfully' });
});

// Subscribe
export const subscribeToChannel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { channelId } = req.params;

  const channel = await Channel.findById(channelId);
  if (!channel) return res.status(404).json({ message: 'Channel not found' });

  if (channel.subscribers.includes(userId)) {
    return res.status(400).json({ message: 'Already subscribed' });
  }

  channel.subscribers.push(userId);
  channel.subscribersCount = channel.subscribers.length;
  await channel.save();

  res.status(200).json({ message: 'Subscribed successfully' });
});

// Unsubscribe
export const unsubscribeFromChannel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { channelId } = req.params;

  const channel = await Channel.findById(channelId);
  if (!channel) return res.status(404).json({ message: 'Channel not found' });

  if (!channel.subscribers.includes(userId)) {
    return res.status(400).json({ message: 'Not subscribed to this channel' });
  }

  channel.subscribers = channel.subscribers.filter(id => id.toString() !== userId.toString());
  channel.subscribersCount = channel.subscribers.length;
  await channel.save();

  res.status(200).json({ message: 'Unsubscribed successfully' });
});
