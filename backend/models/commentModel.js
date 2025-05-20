import { model, Schema } from 'mongoose';

const commentSchema = new Schema({
  content: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  video: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
}, { timestamps: true });

export default model('Comment', commentSchema);
