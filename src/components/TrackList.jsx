import TrackCard from "./TrackCard";

const TrackList = ({ tracks }) => {
  if (tracks.length === 0) {
    return (
      <p className="text-center text-slate-300 py-20">
        Nenhuma música encontrada.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  );
};

export default TrackList;