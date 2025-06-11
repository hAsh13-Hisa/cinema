import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdbService from '../services/tmdbApi';
import type { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const NowPlayingPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        setLoading(true);
        const response = await tmdbService.getNowPlayingMovies(page);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setTotalResults(response.data.total_results);
      } catch (err) {
        setError('上映中映画の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlayingMovies();
  }, [page]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-white mb-2">
          上映中の映画
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          日本全国で上映中の{totalResults}作品
        </p>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            上映中の映画が見つかりませんでした
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 min-[640px]:grid-cols-3 min-[768px]:grid-cols-4 min-[1024px]:grid-cols-5 min-[1280px]:grid-cols-6 min-[1536px]:grid-cols-8 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/now-playing"
            />
          )}
        </>
      )}
    </div>
  );
};

export default NowPlayingPage;