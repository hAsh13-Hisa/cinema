import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tmdbService from '../services/tmdbApi';
import type { Movie, Genre } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getGenreIcon } from '../utils/genreIcons';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [moviesResponse, nowPlayingResponse, genresResponse] = await Promise.all([
          tmdbService.getPopularMovies(),
          tmdbService.getNowPlayingMovies(),
          tmdbService.getGenres(),
        ]);
        setPopularMovies(moviesResponse.data.results);
        setNowPlayingMovies(nowPlayingResponse.data.results);
        setGenres(genresResponse.data.genres);
      } catch (err) {
        setError('データの取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div>
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium text-gray-900 dark:text-white">
            上映中の映画
          </h1>
          <Link 
            to="/now-playing" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-2 min-[640px]:grid-cols-3 min-[768px]:grid-cols-4 min-[1024px]:grid-cols-5 min-[1280px]:grid-cols-6 min-[1536px]:grid-cols-8 gap-4">
          {nowPlayingMovies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
            人気の映画
          </h2>
        </div>
        <div className="grid grid-cols-2 min-[640px]:grid-cols-3 min-[768px]:grid-cols-4 min-[1024px]:grid-cols-5 min-[1280px]:grid-cols-6 min-[1536px]:grid-cols-8 gap-4">
          {popularMovies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
          ジャンルで探す
        </h2>
        <div className="grid gap-4" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))'}}>
          {/* Responsive grid: auto-adjusting columns */}
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/search?genre=${genre.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center hover:shadow-lg hover:scale-105 transition-all"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">{getGenreIcon(genre.id)}</span>
                <span className="text-gray-900 dark:text-white text-sm">
                  {genre.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;