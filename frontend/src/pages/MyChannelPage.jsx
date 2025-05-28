import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelByUser, updateMyChannel } from "../features/channel/channelThunks";
import ChannelBanner from "../components/ChannelBanner";
import ChannelCard from "../components/ChannelCard";
import VideoCard from "../components/VideoCard";
import { channelTabs } from "../utils/staticData";
import { Link } from "react-router-dom";

const MyChannelPage = () => {
  // redux
  const dispatch = useDispatch();
  const {
    loadingCurrent,         
    currentChannel,
    error,
    updating,
    updateSuccess,
  } = useSelector((state) => state.channels);

  // state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState(channelTabs[0]);

  // fetch channel
  useEffect(() => {
    dispatch(fetchChannelByUser());
  }, [dispatch]);

  // sync form
  useEffect(() => {
    if (currentChannel) {
      setName(currentChannel.name || "");
      setDescription(currentChannel.description || "");
    }
  }, [currentChannel]);

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!currentChannel?._id) {
      console.error("Channel ID missing");
      return;
    }
    dispatch(updateMyChannel({
      id: currentChannel._id,
      name: name.trim(),
      description: description.trim(),
    }));
  };

  // loading
  if (loadingCurrent) {
    return (
      <p className="text-center mt-10 text-xl font-semibold text-slate-600">
        Loading...
      </p>
    );
  }

  // error
  if (error) {
    return (
      <p className="text-red-500 text-center mt-10 text-xl font-semibold">
        {error}
      </p>
    );
  }

  // no channel
  if (!currentChannel) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-slate-600">No channel found.</p>
      </div>
    );
  }

  // main
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-10 ml-24">
      <section>
        {/* banner */}
        <ChannelBanner channel={currentChannel} />

        {/* card */}
        <div className="mt-4">
          <ChannelCard
            id={currentChannel._id}
            avatarUrl={currentChannel.avatar?.url || "/default-avatar.png"}
            name={name}
            channel={currentChannel.handle}
            subscribersCount={currentChannel.subscribersCount}
            description={description}
            setName={setName}
            setDescription={setDescription}
            updating={updating}
            updateSuccess={updateSuccess}
            handleSubmit={handleSubmit}
          />
        </div>

        {/* tabs */}
        <ul className="flex gap-8 mt-6 border-b pb-2">
          {channelTabs.map((tab) => (
            <li
              key={tab}
              className={`text-lg font-semibold cursor-pointer hover:text-blue-600 ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-slate-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        {/* videos tab */}
        {activeTab === "Videos" && (
          <>
            <Link
              to="/upload"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Upload
            </Link>

            {currentChannel.videos?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {currentChannel.videos.map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500 mt-6">
                This channel has no videos yet.
              </div>
            )}
          </>
        )}

        {/* about tab */}
        {activeTab === "About" && (
          <div className="mt-6 text-slate-700">
            <p>{currentChannel.description || "No description provided."}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyChannelPage;
