import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVideos } from '../features/video/videoThunks';
import VideoCategoryFilter from '../components/VideoCategoryFilter';
import VideoCard from '../components/VideoCard';
import { videos as staticVideos } from '../utils/staticData'; 

const USE_STATIC_DATA = true; // toggle

const HomePage = () => {
  const dispatch = useDispatch();
  // redux state
  const { videos = [], loading, error } = useSelector((state) => state.videos);
  // local state
  const [selectedCategory, setSelectedCategory] = useState('All');

  // fetch data
  useEffect(() => {
    if (!USE_STATIC_DATA) {
      dispatch(fetchAllVideos());
    }
  }, [dispatch]);

  // source data
  const displayedVideos = USE_STATIC_DATA ? staticVideos : videos;

  // filter
  const filteredVideos =
    selectedCategory === 'All'
      ? displayedVideos
      : displayedVideos.filter(
          (v) =>
            (v.category || 'Uncategorized').trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  return (
    <div className="px-4 md:px-8 ml-20 mt-20">
      {/* loading */}
      {loading && !USE_STATIC_DATA ? (
        <div className="text-center text-slate-400 py-10">Loading videos...</div>
      ) : 
      /* error */
      error && !USE_STATIC_DATA ? (
        <div className="text-center text-red-500 py-10">Error: {error}</div>
      ) : (
        <>
          {/* filter */}
          <VideoCategoryFilter
            videos={displayedVideos}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* no videos */}
          {filteredVideos.length === 0 ? (
            <p className="text-center col-span-full mt-6">
              No videos found in this category.
            </p>
          ) : (
            /* video grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 mt-4">
              {filteredVideos.map((video) => (
                <VideoCard key={video._id || video.id} video={video} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
