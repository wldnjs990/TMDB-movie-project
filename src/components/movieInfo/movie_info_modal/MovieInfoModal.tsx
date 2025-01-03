import { useEffect, useRef, useState } from "react";
import { useMovieInfoModalStore } from "../../../store/movieInfoBoxStore";
import { close_icon } from "../../../assets/images";
import { axiosInstance } from "../../../api/axios";
import MovieInfoModalTop from "./MovieInfoModalTop";
import { useGenreStore } from "../../../store/genreStore";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function MovieInfoModal() {
  const contentRef = useRef<HTMLDivElement>(null);

  const setMovieInfoModalClose = useMovieInfoModalStore(
    (state) => state.setMovieInfoModalClose
  );
  const showingMovieInfo = useMovieInfoModalStore(
    (state) => state.showingMovieInfo
  );

  const setTrailerKey = useMovieInfoModalStore((state) => state.setTrailerKey);

  const genreList = useGenreStore((state) => state.genreList);

  const [videos, setVideos] = useState<T_videos[]>();

  const [thumbnails, setThumbnails] = useState();

  const getTrailer = async () => {
    const res = await axiosInstance.get(`/movie/${showingMovieInfo.id}/videos`);
    const data: T_MovieVideos = res.data;
    setVideos(data.results);
    const trailer: T_videos = data.results.filter(
      (video) => video.type === "Trailer"
    )[0];
    setTrailerKey(trailer.key);
  };

  const getThumnail = async () => {
    const videoKeys = videos?.map((e) => e.key);
    const getData = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoKeys}&key=${
        import.meta.env.VITE_YOUTUBE_KEY
      }`
    );
    const thumbnails = getData.data.items.map((e: any) => {
      // 임시 any타입 부여
      return e.snippet.thumbnails.standard.url;
    });
    setThumbnails(thumbnails);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "19px";
    getTrailer();

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);
  useEffect(() => {
    if (videos !== undefined) {
      getThumnail();
    }
  }, [videos]);
  return (
    <article className="w-full h-screen fixed top-0 left-0 overflow-y-scroll z-50">
      <article
        className="flex justify-center min-h-screen bg-black bg-opacity-70"
        ref={contentRef}
        onClick={(e) => {
          if (e.target === contentRef.current) {
            setMovieInfoModalClose();
          }
        }}
      >
        {/* 컨텐츠 */}
        <article className="relative w-full max-w-[1200px] m-[30px] rounded-lg bg-[#181818]">
          <button
            className="p-[15px] rounded-full bg-black absolute top-[10px] right-[10px] z-10"
            onClick={setMovieInfoModalClose}
          >
            <img src={close_icon} alt="닫기 아이콘" />
          </button>
          <MovieInfoModalTop />
          <article className="px-[50px] py-[20px] flex flex-col gap-[10px]">
            <p>
              <span className="text-[20px] font-bold">장르 : </span>
              {showingMovieInfo.genre_ids.map((id) => (
                <span
                  key={id}
                  className="px-[10px] py-[5px] border border-white rounded-lg mr-[10px]"
                >
                  {genreList.filter((genre) => id === genre.id)[0]?.name}
                </span>
              ))}
            </p>
            <p>
              <span className="text-[20px] font-bold">개봉일 : </span>
              <span>{showingMovieInfo.release_date}</span>
            </p>
            <p>
              <span className="text-[20px] font-bold">오버뷰 : </span>
              <span>{showingMovieInfo.overview || "줄거리가 없습니다."}</span>
            </p>
            <Swiper spaceBetween={10} slidesPerView={4}>
              {videos?.map((video, i) => {
                return (
                  <SwiperSlide key={uuidv4()}>
                    {thumbnails && (
                      <img
                        src={thumbnails[i]}
                        alt="유튜브 썸네일"
                        className="w-[300px]"
                      />
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </article>
        </article>
      </article>
    </article>
  );
}
