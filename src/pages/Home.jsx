import { useEffect, useState } from "react";
import TrackList from "../components/TrackList";
import GenreFilter from "../components/GenreFilter";
import {
  fetchTopTracks,
  fetchTracksByGenre,
  searchTracks,
} from "../services/api";

const getTracksByGenre = (genreId) =>
  genreId === 0 ? fetchTopTracks() : fetchTracksByGenre(genreId);

const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadByGenre = async (genreId) => {
    try {
      const data = await getTracksByGenre(genreId);
      setTracks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim()) return;

    let isCurrentRequest = true;

    const loadTracks = async () => {
      try {
        const data = await getTracksByGenre(activeGenre);
        if (isCurrentRequest) {
          setTracks(data);
        }
      } catch (err) {
        if (isCurrentRequest) {
          setError(err.message);
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    loadTracks();

    return () => {
      isCurrentRequest = false;
    };
  }, [activeGenre, search]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setLoading(true);
      setError(null);
      loadByGenre(activeGenre);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchTracks(search);
      setTracks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (genreId) => {
    if (genreId !== activeGenre || search.trim()) {
      setLoading(true);
    }
    setError(null);
    setActiveGenre(genreId);
    setSearch("");
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    if (!value.trim()) {
      setLoading(true);
      setError(null);
    } else {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Buscar músicas ou artistas..."
          className="flex-1 bg-slate-800 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-400"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-300 text-slate-950 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          Buscar
        </button>
      </form>

      <div className="mb-6">
        <GenreFilter
          activeGenre={activeGenre}
          onGenreChange={handleGenreChange}
        />
      </div>

      {loading && (
        <p className="text-center text-slate-300 py-20">
          Carregando músicas...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 py-20">
          Ocorreu um erro ao carregar as músicas: {error}
        </p>
      )}

      {!loading && !error && <TrackList tracks={tracks} />}
    </main>
  );
};

export default Home;
