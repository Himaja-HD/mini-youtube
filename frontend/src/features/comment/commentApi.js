import instance from '../../app/axios'; 

export const getComments = async (videoId) => {
  const response = await instance.get(`/comments/${videoId}`); // fetch
  return response.data;                                         // return
};

export const postComment = async (videoId, content) => {
  const response = await instance.post(`/comments`, { videoId, content }); // create
  return response.data;                                                   // return
};

export const deleteComment = async (commentId) => {
  const response = await instance.delete(`/comments/${commentId}`); // delete
  return response.data;                                             // return
};

export const editComment = async (commentId, content) => {
  const response = await instance.put(`/comments/${commentId}`, { content }); // update
  return response.data;                                                      // return
};
