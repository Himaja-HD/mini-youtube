import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo } from '../features/upload/uploadThunks';
import { resetUploadState } from '../features/upload/uploadSlice';

const UploadPage = () => {
  const dispatch = useDispatch(); // Dispatch
  const { loading, error, uploaded } = useSelector((state) => state.upload); // State

  const [title, setTitle] = useState('');       // Title
  const [videoFile, setVideoFile] = useState(null); // File

  const handleSubmit = (e) => {
    e.preventDefault();            // Prevent
    if (!title || !videoFile) return; // Validate

    const formData = new FormData(); // FormData
    formData.append('title', title);  // AppendTitle
    formData.append('video', videoFile); // AppendFile

    dispatch(uploadVideo(formData));   // DispatchUpload
  };

  const handleReset = () => {
    dispatch(resetUploadState()); // ResetState
    setTitle('');                 // ClearTitle
    setVideoFile(null);           // ClearFile
  };

  return (
    <div className="p-4 max-w-xl mx-auto"> {/* Container */}
      <h1 className="text-xl font-bold mb-4">Upload Video</h1> {/* Header */}

      <form onSubmit={handleSubmit} className="space-y-4"> {/* Form */}
        <input
          type="text"                       // TitleInput
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // ChangeTitle
          className="w-full p-2 border rounded"
        />
        <input
          type="file"                       // FileInput
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])} // ChangeFile
          className="w-full"
        />
        <button
          type="submit"                    // SubmitBtn
          disabled={loading}               // Disabled
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Uploading...' : 'Upload'} {/* BtnLabel */}
        </button>

        {uploaded && (
          <div className="mt-4 bg-green-100 p-2 rounded text-green-800"> {/* Success */}
            Uploaded Successfully: {uploaded.title || uploaded._id}
            <button
              onClick={handleReset}        // ResetBtn
              className="ml-4 text-sm text-blue-500 underline"
            >
              Upload Another
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-100 p-2 rounded text-red-800"> {/* Error */}
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadPage;
