// movie Data 타입
interface T_movieData {
  dates: T_Dates;
  page: number;
  results: T_MovieResult[];
  total_pages: number;
  total_results: number;
}

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

// videos Data 타입
interface T_MovieVideos {
  id: number;
  results: T_videos[];
}

interface T_videos {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

//  장르 Data 타입
interface T_genre {
  id: number;
  name: string;
}
