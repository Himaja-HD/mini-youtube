import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  content: { type: String, required: true, trim: true, maxlength: 500 },
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
