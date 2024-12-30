import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import MovieInfoBox from "./MovieInfoBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";
import { more_go_array_icon } from "../../assets/images";

export default function MovieInfoList({
  infoType,
  infoTitle,
}: {
  infoType: string;
  infoTitle: string;
}) {
  const [movieResult, setMovieResult] = useState<T_MovieResult[]>([]);

  const getMovie = async () => {
    try {
      const res = await axiosInstance.get(`/movie/${infoType}?language=ko`);
      setMovieResult(res.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <section className="mb-[50px]">
      <h1 className="text-3xl font-bold mb-[20px]">{infoTitle}</h1>
      <Swiper spaceBetween={10} slidesPerView={8} className="h-[400px]">
        {movieResult.map((movieInfo) => {
          return (
            <SwiperSlide key={movieInfo.id}>
              <MovieInfoBox movieInfo={movieInfo} />
            </SwiperSlide>
          );
        })}
        <SwiperSlide>
          <article className="flex flex-col gap-[10px] items-center justify-center h-full">
            <Link
              to={`/MoreInfoPage/${infoType}`}
              className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-white"
            >
              <img src={more_go_array_icon} alt="더 보기 이미지" />
            </Link>
            <p className="font-bold">더 보기</p>
          </article>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
