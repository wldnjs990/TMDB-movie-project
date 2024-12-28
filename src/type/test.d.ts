// nowPlaying 데이터 타입
interface T_nowPlayingDates {
  maximum: string;
  minimum: string;
}
interface T_nowPlayingMovieResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface T_nowPlaying {
  dates: T_nowPlayingDates;
  page: number;
  results: T_nowPlayingMovieResult[];
  total_pages: number;
  total_results: number;
}
