import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo, resetUploadState } from "../features/video/uploadSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadPage = () => {
  const dispatch = useDispatch(); // Dispatch
  const navigate = useNavigate(); // Navigate

  const { video, loading, error } = useSelector((state) => state.upload); // UploadState

  const [formData, setFormData] = useState({
    title: "",       // Title
    thumbnail: "",   // Thumbnail
    videoUrl: "",    // VideoURL
    category: "",    // Category
    description: "", // Description
  });

  useEffect(() => {
    if (video?._id) {
      toast.success("Video uploaded successfully!"); // SuccessToast
      navigate(`/video/${video._id}`);              // Redirect
      dispatch(resetUploadState());                  // ResetState
    }
  }, [video, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;       // InputChange
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();           // PreventDefault
    dispatch(uploadVideo(formData)); // DispatchUpload
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6"> {/* Container */}
      <form
        onSubmit={handleSubmit}                    // Submit
        className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Upload Video</h2> {/* Title */}

        <input
          name="title"                             // TitleInput
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          name="thumbnail"                         // ThumbnailInput
          placeholder="Thumbnail URL"
          value={formData.thumbnail}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="videoUrl"                          // VideoUrlInput
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          name="category"                          // CategoryInput
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="description"                       // DescriptionInput
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"                           // SubmitButton
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit Video"} {/* ButtonLabel */}
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>} {/* Error */}
      </form>

      <ToastContainer position="top-right" autoClose={3000} /> {/* Toast */}
    </div>
  );
};

export default UploadPage;
