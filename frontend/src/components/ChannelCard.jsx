import React, { useState } from "react"; // Import
import { FiEdit3 } from "react-icons/fi"; // Icon
import instance from "../app/axios"; // Axios

const ChannelCard = ({
  avatarUrl,
  channel,
  id,
  subscribersCount,
  name,
  description,
  setName,
  setDescription,
}) => {
  const [isEditing, setIsEditing] = useState(false); // State
  const [updating, setUpdating] = useState(false); // State
  const [updateSuccess, setUpdateSuccess] = useState(false); // State

  console.log("ChannelCard received id:", id); // Debug

  const handleToggleEdit = () => {
    setIsEditing(!isEditing); // Toggle
    setUpdateSuccess(false); // Reset
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent
    if (!id) {
      console.error("Channel ID is missing, cannot update"); // Error
      return;
    }
    try {
      setUpdating(true); // Start
      await instance.put(`/channels/${id}`, { name, description }); // Request
      setUpdateSuccess(true); // Success
      setIsEditing(false); // Close
    } catch (err) {
      console.error("Failed to update channel", err); // Catch
    } finally {
      setUpdating(false); // End
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 border border-gray-200 rounded-xl shadow-sm bg-white"> {/* Card */}
      {/* Avatar */}
      <div className="flex-shrink-0"> {/* ImageBox */}
        <img
          src={avatarUrl || "/default-avatar.png"} // Avatar
          alt="Channel avatar"
          className="w-32 h-32 rounded-full object-cover border"
        />
      </div>

      {/* Info */}
      <div className="flex-1 space-y-3"> {/* Info */}
        <div className="flex items-start justify-between"> {/* Header */}
          {isEditing ? (
            <div className="w-full space-y-2"> {/* Inputs */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} // Name
                className="text-2xl font-semibold text-gray-800 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <p className="text-sm text-gray-500">@{channel}</p>
              <p className="text-sm text-gray-600">
                {subscribersCount ?? 0} subscribers
              </p>
            </div>
          ) : (
            <div> {/* Static */}
              <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
              <p className="text-sm text-gray-500">@{channel}</p>
              <p className="text-sm text-gray-600">
                {subscribersCount ?? 0} subscribers
              </p>
            </div>
          )}

          {/* Edit */}
          <button
            onClick={handleToggleEdit}
            className="text-blue-600 hover:text-blue-800 transition ml-4 mt-1"
            title={isEditing ? "Cancel" : "Edit Channel Info"}
          >
            <FiEdit3 size={20} />
          </button>
        </div>

        {/* Description */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4"> {/* Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Desc
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className={`px-4 py-2 rounded-md text-white ${
                updating
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {updating ? "Updating..." : "Update Channel"}
            </button>

            {updateSuccess && (
              <p className="text-green-600 text-sm font-medium">
                Channel updated successfully!
              </p>
            )}
          </form>
        ) : (
          <div> {/* View */}
            <h3 className="text-sm font-medium text-gray-700">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {description || "No description provided."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelCard; // Export
