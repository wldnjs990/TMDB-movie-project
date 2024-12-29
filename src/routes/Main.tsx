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
    <main className="bg-black text-white flex flex-col gap-[20px]">
      <section className="w-[80%] mx-auto py-[50px] px-[50px]">
        <MovieInfoList infoParams={"now_playing"} infoTitle={"현재 상영중"} />
        <MovieInfoList infoParams={"popular"} infoTitle={"인기작"} />
        <MovieInfoList infoParams={"top_rated"} infoTitle={"TOP RATED"} />
        <MovieInfoList infoParams={"upcoming"} infoTitle={"상영 예정"} />
      </section>
    </main>
  );
}
