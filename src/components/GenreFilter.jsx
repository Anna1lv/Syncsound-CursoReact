import { GENRES } from "../services/api";

const GenreFilter = ({ activeGenre, onGenreChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {GENRES.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreChange(genre.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeGenre === genre.id
              ? "bg-orange-400 text-zinc-950"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;