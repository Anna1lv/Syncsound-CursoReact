import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const TrackCard = ({ track }) => {
  const cover =
    track.album?.cover_medium ||
    "https://placehold.co/250x250/27272a/71717a?text=Sem+Capa";

  const duration = track.duration
    ? `${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}`
    : null;

  return (
    <Link
      to={`/track/${track.id}`}
      className="group block bg-slate-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-orange-400 transition-all duration-200"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={cover}
          alt={track.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/50 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play size={32} />
        </div>
        {duration && (
          <span className="absolute bottom-2 right-2 bg-slate-950/70 text-slate-300 text-xs px-2 py-0.5 rounded-full">
            {duration}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-slate-200 line-clamp-1">
          {track.title}
        </h3>
        <p className="text-xs text-rose-400 mt-0.5 line-clamp-1">
          {track.artist?.name}
        </p>
        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
          {track.album?.title}
        </p>
      </div>
    </Link>
  );
};

export default TrackCard;