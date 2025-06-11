import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdbService from '../services/tmdbApi';
import type { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const genreId = searchParams.get('genre');
  const page = parseInt(searchParams.get('page') || '1');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let response;
        
        if (query) {
          response = await tmdbService.searchMovies(query, page);
        } else if (genreId) {
          response = await tmdbService.getMoviesByGenre(parseInt(genreId), page);
        } else {
          setError('検索条件が指定されていません');
          return;
        }

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setTotalResults(response.data.total_results);
      } catch (err) {
        setError('検索中にエラーが発生しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, genreId, page]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {query ? `"${query}" の検索結果` : 'ジャンル別検索結果'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {totalResults}件の映画が見つかりました
        </p>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            検索結果が見つかりませんでした
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
              baseUrl={`/search?${query ? `query=${query}` : `genre=${genreId}`}`}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;