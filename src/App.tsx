import { useEffect } from "react";
import { axiosInstance } from "./api/axios";

export default function App() {
  const getMovie = async () => {
    const res = await axiosInstance.get(`/movie/now_playing`);
    console.log(res);
  };

  useEffect(() => {
    console.log(import.meta.env.VITE_TMDB_KEY);
    getMovie();
  }, []);
  return (
    <h1 className="text-3xl font-bold underline">
      PC와도 연동 + 노트북과도 연동해서 작업 시작
    </h1>
  );
}
