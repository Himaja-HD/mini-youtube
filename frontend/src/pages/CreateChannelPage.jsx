import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../features/channel/channelThunks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateChannelPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [error, setError] = useState("");

  // loading
  const { loading } = useSelector((state) => state.channels);

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate
    if (!name.trim() || !handle.trim()) {
      setError("Name and handle are required.");
      toast.error("Name and handle are required.");
      return;
    }

    // data
    const channelData = {
      name: name.trim(),
      handle: handle.trim(),
      description: description.trim(),
      banner: bannerUrl.trim(),
      logo: logoUrl.trim(),
    };

    // dispatch
    dispatch(createChannel(channelData))
      .unwrap()
      .then(() => {
        toast.success("Channel created successfully!");
        setError("");
        navigate("/channels/me"); // redirect
      })
      .catch((err) => {
        const message = err?.message || err || "Failed to create channel";
        setError(message);
        toast.error(message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Create Channel</h1>

      {/* error */}
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* name */}
        <input
          className="w-full p-2 border rounded"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* handle */}
        <input
          className="w-full p-2 border rounded"
          placeholder="Channel Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        {/* description */}
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* banner */}
        <input
          className="w-full p-2 border rounded"
          placeholder="Banner Image URL (optional)"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
        />
        {/* logo */}
        <input
          className="w-full p-2 border rounded"
          placeholder="Logo Image URL (optional)"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
        />

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </form>

      {/* toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateChannelPage;
