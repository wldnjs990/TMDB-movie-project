// 공용? 데이터 타입
interface T_Dates {
  maximum: string;
  minimum: string;
}
interface T_MovieResult {
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

interface T_genre {
  id: number;
  name: string;
}

// nowPlaying 타입
interface T_nowPlaying {
  dates: T_Dates;
  page: number;
  results: T_MovieResult[];
  total_pages: number;
  total_results: number;
}
