import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelId: { type: String, required: true, unique: true },
    channelName: { type: String, required: true },
    description: { type: String },
    channelBanner: { type: String },
    collectionId: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Channel = mongoose.model("Channel", channelSchema);
