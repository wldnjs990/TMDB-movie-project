import { useEffect } from "react";
import { useGenreStore } from "../store/genreStore";
import { axiosInstance } from "../api/axios";
import MovieInfoList from "../components/movieInfo/MovieInfoList";

export default function Main() {
  const setGenreList = useGenreStore((state) => state.setGenreList);

  const getGenre = async () => {
    const res = await axiosInstance.get(`genre/movie/list?language=ko`);
    setGenreList(res.data.genres);
  };
  useEffect(() => {
    getGenre();
  });
  return (
    <>
      <MovieInfoList infoType={"now_playing"} infoTitle={"현재 상영중"} />
      <MovieInfoList infoType={"popular"} infoTitle={"인기작"} />
      <MovieInfoList infoType={"top_rated"} infoTitle={"TOP RATED"} />
      <MovieInfoList infoType={"upcoming"} infoTitle={"상영 예정"} />
    </>
  );
}
