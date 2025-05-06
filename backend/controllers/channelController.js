import axios from "axios";
import {Channel} from "../models/channelModel.js";
import {Subscription} from "../models/subscriptionModel.js";
import imageKit from "../config/imageKit.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import generateID  from "../utils/generateID.js";

// Create a new channel
export const createChannel = asyncHandler(async (req, res) => {
  const user = req.user;

  if (await Channel.findOne({ owner: user._id })) {
    throw new ApiError(400, "User already has a channel");
  }

  const uid = generateID(user._id.toString());

  let bannerUrl = "";
  if (req.file) {
    const uploaded = await imageKit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });
    bannerUrl = uploaded.url;
  }

  const { data } = await axios.post(
    `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/collections`,
    { name: uid },
    {
      headers: { AccessKey: process.env.BUNNY_API_KEY },
    }
  );

  const channel = await Channel.create({
    channelId: uid,
    channelName: req.body.channelName,
    description: req.body.description,
    owner: user._id,
    channelBanner: bannerUrl,
    collectionId: data.guid,
  });

  res.status(201).json({ success: true, message: "Channel created", channel });
});

// Get channel by channelId
export const getChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findOne({ channelId: req.params.channelId }).populate("owner", "username email");

  if (!channel) throw new ApiError(404, "Channel not found");

  res.status(200).json({ success: true, channel });
});

// Update channel
export const updateChannel = asyncHandler(async (req, res) => {
  const user = req.user;
  const channel = await Channel.findOne({ owner: user._id });

  if (!channel) throw new ApiError(404, "Channel not found");

  if (req.file) {
    const uploaded = await imageKit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });
    channel.channelBanner = uploaded.url;
  }

  channel.channelName = req.body.channelName || channel.channelName;
  channel.description = req.body.description || channel.description;
  await channel.save();

  res.status(200).json({ success: true, message: "Channel updated", channel });
});

// Delete channel
export const deleteChannel = asyncHandler(async (req, res) => {
  const user = req.user;
  const channel = await Channel.findOneAndDelete({ owner: user._id });

  if (!channel) throw new ApiError(404, "Channel not found");

  await Subscription.deleteMany({ channel: channel._id });

  res.status(200).json({ success: true, message: "Channel deleted" });
});

// Subscribe to a channel
export const subscribeChannel = asyncHandler(async (req, res) => {
  const user = req.user;
  const channel = await Channel.findOne({ channelId: req.params.channelId });

  if (!channel) throw new ApiError(404, "Channel not found");

  const existing = await Subscription.findOne({ subscriber: user._id, channel: channel._id });
  if (existing) throw new ApiError(400, "Already subscribed");

  const subscription = await Subscription.create({ subscriber: user._id, channel: channel._id });
  channel.subscribers.push(user._id);
  await channel.save();

  res.status(200).json({ success: true, message: "Subscribed", subscription });
});

// Unsubscribe from a channel
export const unsubscribeChannel = asyncHandler(async (req, res) => {
  const user = req.user;
  const channel = await Channel.findOne({ channelId: req.params.channelId });

  if (!channel) throw new ApiError(404, "Channel not found");

  const subscription = await Subscription.findOneAndDelete({ subscriber: user._id, channel: channel._id });
  if (!subscription) throw new ApiError(400, "Not subscribed");

  channel.subscribers.pull(user._id);
  await channel.save();

  res.status(200).json({ success: true, message: "Unsubscribed" });
});
