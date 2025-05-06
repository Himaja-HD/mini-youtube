import axios from 'axios';

const bunnyStreamEndpoint = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos`;

export const createVideoEntry = async (fileName) => {
  const response = await axios.post(bunnyStreamEndpoint, { title: fileName }, {
    headers: {
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
      'Content-Type': 'application/json',
    },
  });
  return response.data.guid;
};

export { bunnyStreamEndpoint };
