import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  if (!video) return null;

  const {
    _id,
    thumbnail = '/default-thumbnail.jpg',
    title = 'Untitled Video',
    views = 0,
    timestamp = '00:00',
    channel = {},
  } = video;

  const {
    name: channelName = 'unknown channel',
    handle = 'unknown',
    avatar = '',
  } = channel;

  const avatarUrl =
    avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      channelName
    )}`;

  return (
    <Link to={`/videos/${_id}`} className="group block cursor-pointer max-w-sm">
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        {timestamp && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
            {timestamp}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="mt-3 flex gap-3">
        {/* Channel Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={avatarUrl}
            alt={channelName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Text Info */}
        <div className="flex-1">
          <h3 className="text-black dark:text-white text-sm font-semibold leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-gray-400">@{handle}</p>
          <div className="text-xs text-gray-500 flex gap-1 mt-0.5">
            <span>{views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
