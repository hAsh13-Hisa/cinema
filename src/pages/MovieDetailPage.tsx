import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbService from '../services/tmdbApi';
import type { MovieDetails } from '../types/movie';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await tmdbService.getMovieDetails(parseInt(id));
        setMovie(response.data);
      } catch (err) {
        setError('映画情報の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!movie) return null;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-row gap-6 p-6">
          <div className="flex-shrink-0 w-[340px] flex items-center justify-center" style={{padding: '20px'}}>
            <img
              src={tmdbService.getImageUrl(movie.poster_path || '', 'w500')}
              alt={movie.title}
              className="max-w-[300px] h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-medium text-gray-900 dark:text-white mb-4">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-4">
                "{movie.tagline}"
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">公開日</p>
                <p className="text-gray-900 dark:text-white">
                  {new Date(movie.release_date).toLocaleDateString('ja-JP')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">上映時間</p>
                <p className="text-gray-900 dark:text-white">
                  {movie.runtime}分
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">評価</p>
                <p className="text-gray-900 dark:text-white">
                  ⭐ {movie.vote_average.toFixed(1)}/10
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">投票数</p>
                <p className="text-gray-900 dark:text-white">
                  {movie.vote_count.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              あらすじ
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {movie.overview || '概要がありません'}
            </p>
          </div>

          {movie.credits.cast.length > 0 && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                キャスト
              </h2>
              <div className="grid grid-cols-2 min-[640px]:grid-cols-3 min-[768px]:grid-cols-4 min-[1024px]:grid-cols-5 gap-6">
                {movie.credits.cast.slice(0, 10).map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center text-center">
                    <p className="font-bold text-gray-900 dark:text-white text-sm mb-2 line-clamp-1">
                      {actor.character}
                    </p>
                    {actor.profile_path ? (
                      <div className="rounded-full overflow-hidden flex-shrink-0" style={{width: '100px', height: '100px'}}>
                        <img
                          src={tmdbService.getImageUrl(actor.profile_path, 'w185')}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0" style={{width: '100px', height: '100px'}}>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          No Image
                        </span>
                      </div>
                    )}
                    <p className="text-gray-900 dark:text-white text-sm mt-2 line-clamp-1">
                      {actor.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;