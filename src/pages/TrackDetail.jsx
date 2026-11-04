import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTrackDetails, fetchArtistTopTracks } from "../services/api";
import TrackCard from "../components/TrackCard";
import { ArrowLeft, Pause, Play } from "lucide-react";

const TrackDetail = () => {
  const { id } = useParams();
  const [track, setTrack] = useState(null);
  const [related, setRelated] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const loadTrack = async () => {
      try {
        setLoading(true);
        setError(null);
        setPlaying(false);

        const data = await fetchTrackDetails(id);
        setTrack(data);

        const artistTracks = await fetchArtistTopTracks(data.artist.id);
        setRelated(artistTracks.filter((item) => item.id !== data.id).slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTrack();
  }, [id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  if (loading) {
    return <p className="text-center text-slate-300 pt-32">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-300 pt-32">Erro: {error}</p>;
  }

  const cover =
    track.album?.cover_big ||
    "https://placehold.co/500x500/27272a/71717a?text=SemCapa";
  const duration = track.duration
    ? `${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}`
    : null;
  const percentage = volume * 100;

  return (
    <main className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-slate-300 hover:text-slate-100 mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div>
          <img src={cover} alt={track.title} className="w-48 rounded-xl" />
        </div>

        <div className="sm:flex-1">
          <p className="text-xs text-rose-400 uppercase tracking-widest mb-1">
            {track.album?.title}
          </p>
          <h1 className="text-2xl font-bold text-slate-200 leading-tight">
            {track.title}
          </h1>
          <p className="text-fuchsia-400 text-sm mt-1">{track.artist?.name}</p>

          {duration && (
            <p className="text-slate-400 text-sm mt-2">Duração: {duration}</p>
          )}

          {track.preview ? (
            <div className="mt-5">
              <p className="text-lg text-slate-200">Preview (30 segundos)</p>

              <audio
                ref={audioRef}
                src={track.preview}
                onEnded={() => setPlaying(false)}
                onLoadedMetadata={() => {
                  if (audioRef.current) {
                    audioRef.current.volume = 0.5;
                  }
                }}
              />

              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex items-center justify-center text-slate-200 hover:text-white"
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-28 accent-orange-400"
                />

                <span className="text-sm text-slate-300">{Math.round(percentage)}%</span>
              </div>
            </div>
          ) : (
            <p className="text-slate-300 text-sm mt-6">Preview não disponível.</p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">
            Mais de {track.artist?.name}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {related.map((item) => (
              <TrackCard key={item.id} track={item} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default TrackDetail;