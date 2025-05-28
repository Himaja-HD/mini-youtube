import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Profile = () => {
  const user = useSelector((state) => state.auth.user); // user
  const [isEditing, setIsEditing] = useState(false); // edit
  const [formData, setFormData] = useState({ // form
    username: user?.username || '',
    email: user?.email || '',
    password: '',
  });
  const [logoFile, setLogoFile] = useState(null); // image
  const [imgError, setImgError] = useState(false); // error
  const [statusMsg, setStatusMsg] = useState({ success: '', error: '' }); // status
  const [loading, setLoading] = useState(false); // loading

  if (!user) { // auth
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow text-black">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  const handleChange = (e) => { // input
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => { // file
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setImgError(false);
      setStatusMsg({ success: '', error: '' });
    }
  };

  const handleSave = async () => { // upload
    if (!logoFile) {
      setStatusMsg({ success: '', error: 'Select an image to upload.' });
      return;
    }
    setLoading(true);
    setStatusMsg({ success: '', error: '' });
    try {
      const imageForm = new FormData();
      imageForm.append('image', logoFile);

      const res = await axios.post('/api/users/profile-image', imageForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data?.imageUrl) {
        setStatusMsg({ success: 'Profile image updated!', error: '' });
        setLogoFile(null);
      } else {
        setStatusMsg({ success: '', error: 'Image upload failed.' });
      }
    } catch {
      setStatusMsg({ success: '', error: 'Error uploading image.' });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => { // save
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ success: '', error: '' });

    try {
      const updateData = {
        username: formData.username,
        email: formData.email,
      };
      if (formData.password.trim() !== '') {
        updateData.password = formData.password;
      }

      const res = await axios.put('/api/users/profile', updateData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setStatusMsg({ success: 'Profile updated!', error: '' });
        setIsEditing(false);
      } else {
        setStatusMsg({ success: '', error: 'Failed to update profile.' });
      }
    } catch {
      setStatusMsg({ success: '', error: 'Failed to update profile.' });
    }

    setLoading(false);
  };

  const previewUrl = logoFile ? URL.createObjectURL(logoFile) : null; // preview

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded shadow-md p-6 text-black">
        {!isEditing ? ( // view
          <>
            <div className="flex justify-center mb-4">
              {previewUrl && !imgError ? (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  onError={() => setImgError(true)}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <p className="mb-1">
              <strong>Name:</strong> {user.username}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>

            <div className="mt-6">
              <label className="block mb-1 text-sm font-medium">Change Profile Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} /> {/* file input */}
              {logoFile && (
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  {loading ? 'Saving...' : 'Save Image'}
                </button>
              )}
              {statusMsg.success && (
                <p className="text-green-600 mt-2 text-sm">{statusMsg.success}</p> // success
              )}
              {statusMsg.error && (
                <p className="text-red-600 mt-2 text-sm">{statusMsg.error}</p> // error
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}> {/* form */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Name</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-50"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">New Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-50"
                placeholder="Set new password"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
            {statusMsg.success && <p className="text-green-600 mt-2 text-sm">{statusMsg.success}</p>}
            {statusMsg.error && <p className="text-red-600 mt-2 text-sm">{statusMsg.error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
