import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile, clearStatus } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error, success } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false); // mode
  const [formData, setFormData] = useState({         // form
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(fetchUserProfile());                     // load
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setFormData({                                   // fill
        username: userInfo.username || '',
        email: userInfo.email || '',
        password: '',
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      toast.success('Profile updated successfully');  // success
      setIsEditing(false);                             // reset mode
      dispatch(clearStatus());                         // clear
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);                              // error
      dispatch(clearStatus());                         // clear
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({                           // update form
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();                                // prevent
    const dataToUpdate = {                             // prepare
      username: formData.username,
      email: formData.email,
    };
    if (formData.password.trim()) {                    // optional
      dataToUpdate.password = formData.password;
    }
    dispatch(updateUserProfile(dataToUpdate));         // submit
  };

  if (loading && !userInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-slate-600">Loading profile...</p> {/* loading */}
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">Failed to load profile.</p> {/* no data */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-24 bg-white text-slate-700">
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-slate-700">Profile</h1>

        {loading && <p className="text-slate-600 mb-4">Processing...</p>} {/* processing */}

        {!isEditing ? (                                      // view mode
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="h-32 w-32 rounded-full overflow-hidden border border-slate-300">
                <img
                  src={
                    userInfo.avatar
                      ? userInfo.avatar                       // avatar
                      : `https://api.dicebear.com/7.x/initials/svg?seed=${userInfo.username || 'default'}`
                  }
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <p>
                <span className="font-semibold">Name:</span> {userInfo.username} {/* username */}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {userInfo.email}   {/* email */}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}             // edit toggle
              className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (                                              // edit mode
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-slate-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}                     // input change
                className="w-full p-2 rounded-lg border border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}                     // input change
                className="w-full p-2 rounded-lg border border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-700">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}                     // input change
                className="w-full p-2 rounded-lg border border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
                disabled={loading}                           // disable while loading
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);                       // cancel edit
                  setFormData({                              // reset form
                    username: userInfo.username || '',
                    email: userInfo.email || '',
                    password: '',
                  });
                }}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
