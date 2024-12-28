import { useEffect } from "react";
import { axiosInstance } from "./api/axios";
import { useTestStore } from "./store/test";

export default function App() {
  const setTestingData = useTestStore((state) => state.setTestingData);
  const testingData = useTestStore((state) => state.testingData);

  const setTestingResult = useTestStore((state) => state.setTestingResult);
  const testingResult = useTestStore((state) => state.testingResult);

  const getMovie = async () => {
    try {
      const res = await axiosInstance.get(`/movie/now_playing`);
      setTestingData(res.data);
      setTestingResult(res.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <main>
      <h1 className="text-3xl font-bold underline">
        PC와도 연동 + 노트북과도 연동해서 작업 시작
      </h1>
      {testingResult.map((e) => {
        return (
          <article key={e.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
              alt="포스터 이미지"
            />
            <p>{e.original_title}</p>
            <p>{e.original_language}</p>
            <p>{e.genre_ids}</p>
            <p>{e.popularity}</p>
            <p>{e.video}</p>
            <p>{e.overview}</p>
          </article>
        );
      })}
    </main>
  );
}
