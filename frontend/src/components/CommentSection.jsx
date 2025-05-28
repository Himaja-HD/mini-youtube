import React, { useEffect, useState, useRef } from 'react'; // Imports
import { useDispatch, useSelector } from 'react-redux'; // Redux
import {
  fetchComments,
  createComment,
  deleteComment,
  updateComment,
} from '../features/comment/commentThunks'; // Thunks
import { toast } from 'react-toastify'; // Toast
import {
  FaTrashAlt,
  FaEdit,
  FaPaperPlane,
  FaCheck,
  FaTimes,
} from 'react-icons/fa'; // Icons
import { BsThreeDotsVertical } from 'react-icons/bs'; // Icon

const CommentSection = ({ videoId }) => {
  const dispatch = useDispatch(); // Dispatch
  const { comments, loading } = useSelector((state) => state.comments); // State

  const [content, setContent] = useState(''); // Input
  const [editingId, setEditingId] = useState(null); // EditID
  const [editContent, setEditContent] = useState(''); // EditText
  const [menuOpenId, setMenuOpenId] = useState(null); // Menu

  const menuRef = useRef(); // Ref

  useEffect(() => {
    if (videoId) dispatch(fetchComments(videoId)); // Fetch
  }, [dispatch, videoId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null); // CloseMenu
      }
    };
    document.addEventListener('click', handleClickOutside); // Listen
    return () => document.removeEventListener('click', handleClickOutside); // Cleanup
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault(); // Prevent
    if (!content.trim()) return; // Guard
    try {
      await dispatch(createComment({ videoId, content })).unwrap(); // Create
      setContent(''); // Clear
      toast.success('Comment added'); // Success
    } catch (err) {
      toast.error(err); // Error
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteComment(id)).unwrap(); // Delete
      toast.success('Comment deleted'); // Success
    } catch (err) {
      toast.error(err); // Error
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault(); // Prevent
    if (!editContent.trim()) return; // Guard
    try {
      await dispatch(updateComment({ commentId: editingId, content: editContent })).unwrap(); // Update
      setEditingId(null); // ClearEdit
      toast.success('Comment updated'); // Success
    } catch (err) {
      toast.error(err); // Error
    }
  };

  if (loading) return <p>Loading comments...</p>; // Loading

  return (
    <div className="space-y-4"> {/* Wrapper */}
      {/* Add Comment */}
      <form onSubmit={handleAddComment} className="flex gap-2"> {/* Form */}
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)} // InputChange
          placeholder="Add a comment..."
          className="border p-2 flex-1 rounded text-black"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-full flex items-center gap-2"> {/* Submit */}
          <FaPaperPlane />
        </button>
      </form>

      {/* Show Comments */}
      {comments.length === 0 ? ( // Empty
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => {
          const isEditing = editingId === comment._id; // Editing
          const isMenuOpen = menuOpenId === comment._id; // MenuOpen

          return (
            <div key={comment._id} className="border p-2 rounded shadow-sm relative"> {/* Comment */}
              <p className="text-sm text-gray-600">{new Date(comment.createdAt).toLocaleString()}</p> {/* Date */}

              {isEditing ? ( // EditMode
                <form onSubmit={handleEdit} className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)} // EditChange
                    className="border p-1 rounded flex-1"
                  />
                  <button type="submit" className="text-green-600" title="Save"> {/* Save */}
                    <FaCheck />
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} className="text-gray-500" title="Cancel"> {/* Cancel */}
                    <FaTimes />
                  </button>
                </form>
              ) : (
                <div className="flex justify-between items-center mt-1"> {/* ViewMode */}
                  <p>{comment.content}</p>

                  <div className="relative" ref={menuRef}> {/* Menu */}
                    <button
                      onClick={() => setMenuOpenId(isMenuOpen ? null : comment._id)} // Toggle
                      className="text-gray-500 hover:text-black"
                      title="Options"
                    >
                      <BsThreeDotsVertical />
                    </button>

                    {isMenuOpen && ( // Dropdown
                      <div className="absolute right-0 z-10 mt-2 w-24 bg-white border rounded shadow-md text-sm">
                        <button
                          onClick={() => {
                            setEditingId(comment._id); // SetEdit
                            setEditContent(comment.content); // SetContent
                            setMenuOpenId(null); // Close
                          }}
                          className="w-full text-left px-3 py-1 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(comment._id); // Remove
                            setMenuOpenId(null); // Close
                          }}
                          className="w-full text-left px-3 py-1 hover:bg-gray-100 text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default CommentSection; // Export
