import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import MovieInfoBox from "../MovieInfoBox";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MovieInfoList({
  infoParams,
  infoTitle,
}: {
  infoParams: string;
  infoTitle: string;
}) {
  const [movieData, setMovieData] = useState();
  const [movieResult, setMovieResult] = useState<T_MovieResult[]>([]);

  const getMovie = async () => {
    try {
      const res = await axiosInstance.get(`/movie/${infoParams}?language=ko`);
      setMovieData(res.data);
      setMovieResult(res.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <section className="mb-[50px]">
      <h1 className="text-3xl font-bold mb-[20px]">{infoTitle}</h1>
      <Swiper spaceBetween={10} slidesPerView={8}>
        {movieResult.map((movieInfo) => {
          return (
            <SwiperSlide key={movieInfo.id}>
              <MovieInfoBox movieInfo={movieInfo} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
