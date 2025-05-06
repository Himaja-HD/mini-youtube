import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
}, { timestamps: true })

export default mongoose.model('Tag', tagSchema)