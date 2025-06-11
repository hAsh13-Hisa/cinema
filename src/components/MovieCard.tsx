import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';
import tmdbService from '../services/tmdbApi';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group max-w-[300px] mx-auto"
    >
      <div className="aspect-[2/3] relative">
        <img
          src={tmdbService.getImageUrl(movie.poster_path || '', 'w342')}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white px-1.5 py-0.5 rounded text-xs">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;