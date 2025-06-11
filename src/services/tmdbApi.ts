import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ja-JP',
  },
});

export const tmdbService = {
  // 人気映画の取得
  getPopularMovies: (page = 1) =>
    tmdbApi.get('/movie/popular', { params: { page } }),

  // 上映中映画の取得
  getNowPlayingMovies: (page = 1) =>
    tmdbApi.get('/movie/now_playing', { 
      params: { page, region: 'JP' } 
    }),

  // 映画検索
  searchMovies: (query: string, page = 1) =>
    tmdbApi.get('/search/movie', { params: { query, page } }),

  // 映画詳細の取得
  getMovieDetails: (movieId: number) =>
    tmdbApi.get(`/movie/${movieId}`, {
      params: { append_to_response: 'credits' },
    }),

  // ジャンル一覧の取得
  getGenres: () => tmdbApi.get('/genre/movie/list'),

  // ジャンルで映画を探す
  getMoviesByGenre: (genreId: number, page = 1) =>
    tmdbApi.get('/discover/movie', {
      params: { with_genres: genreId, page },
    }),

  // 画像URLの生成
  getImageUrl: (path: string, size = 'w500') => {
    if (!path) return '/placeholder-movie.png';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};

export default tmdbService;