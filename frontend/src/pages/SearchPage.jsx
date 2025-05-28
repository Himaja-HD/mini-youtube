import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { videos, filterTags } from '../utils/staticData';
import VideoCard from '../components/VideoCard';

const SearchPage = () => {
  const { query } = useParams(); // param
  const [searchQuery, setSearchQuery] = useState(query || ''); // query state
  const [filteredVideos, setFilteredVideos] = useState([]); // results
  const [activeFilter, setActiveFilter] = useState('All'); // filter

  useEffect(() => {
    handleSearch(searchQuery); // search on change
  }, [searchQuery, activeFilter]); // deps

  const handleSearch = (text) => {
    const q = text.toLowerCase(); // lowercase
    const results = videos.filter( // filter videos
      (video) =>
        (video.title.toLowerCase().includes(q) ||
          video.channel.toLowerCase().includes(q)) &&
        (activeFilter === 'All' || video.category === activeFilter)
    );
    setFilteredVideos(results); // set results
  };

  const handleFilterClick = (tag) => {
    setActiveFilter(tag); // change filter
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 py-6"> {/* container */}
      <h2 className="text-2xl font-semibold mb-4"> {/* heading */}
        Search results for "<span className="text-blue-600">{searchQuery}</span>"
      </h2>

      <div className="flex flex-wrap gap-3 mb-6"> {/* filters */}
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleFilterClick(tag)} // click filter
            className={`px-4 py-1 rounded-full border ${
              activeFilter === tag
                ? 'bg-blue-600 text-white' // active
                : 'bg-white text-gray-700 hover:bg-blue-100' // inactive
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredVideos.length > 0 ? ( // results check
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* grid */}
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} /> // video card
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No videos found for this search.</p> // no results
      )}
    </div>
  );
};

export default SearchPage;
