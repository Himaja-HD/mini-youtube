import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user); 

  if (!user) {
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Please log in</h1>
          <p className="text-center">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Username:</span>
            <span>{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
