import Video from '../models/Video.js'
import Tag from '../models/Tag.js'
import fs from 'fs'
import axios from 'axios'

const BUNNY_API_KEY = process.env.BUNNY_API_KEY
const BUNNY_LIBRARY_ID = process.env.BUNNY_LIBRARY_ID
const HOST_URL = process.env.HOST_URL

const extractHashtags = (text, limit) =>
  (text.match(/#[\w]+/g) || []).map(ht => ht.slice(1)).slice(0, limit || undefined)

export const createVideo = async (req, res) => {
  const thumbnail = req.file
  const { visibility, videoId, tags, title, description, comments, view } = req.body
  const tagsArray = JSON.parse(tags)

  try {
    if (thumbnail) {
      const partsArray = thumbnail.path.split('\\')
      const thumbnailUrl = `${HOST_URL}/${partsArray[1]}/${partsArray[2]}`
      await axios.post(
        `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos/${videoId}/thumbnail?thumbnailUrl=${thumbnailUrl}`,
        null,
        { headers: { accept: 'application/json', AccessKey: BUNNY_API_KEY } }
      )
      fs.unlink(thumbnail.path, () => {})
    }

    let video = await Video.findOneAndUpdate(
      { videoId },
      {
        isDraft: false,
        privacySettings: visibility,
        title,
        description,
        commentsStatus: comments === 'on',
        viewsEnabled: view === 'on'
      },
      { upsert: true, new: true }
    )

    await Tag.updateMany({ videos: video._id }, { $pull: { videos: video._id } })

    const hashTags = extractHashtags(description)
    const updatedTags = await Promise.all(tagsArray.map(async name => {
      let tag = await Tag.findOne({ name }) || new Tag({ name })
      tag.videos.push(video._id)
      await tag.save()
      return tag
    }))

    const updatedHashTags = await Promise.all(hashTags.map(async name => {
      let tag = await Tag.findOne({ name }) || new Tag({ name })
      tag.videos.push(video._id)
      await tag.save()
      return tag
    }))

    if (!video.uploadDate && visibility === 'public') {
      video.uploadDate = new Date()
    }

    video.tags = updatedTags.map(t => t._id)
    video.hashTags = updatedHashTags.map(t => t._id)
    await video.save()

    res.status(200).json({ message: 'Video created/updated' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create/update video' })
  }
}
