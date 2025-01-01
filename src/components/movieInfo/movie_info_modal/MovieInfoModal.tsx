import { useEffect, useRef, useState } from "react";
import { useMovieInfoModalStore } from "../../../store/movieInfoBoxStore";
import { close_icon, trailer_play_icon } from "../../../assets/images";
import { axiosInstance } from "../../../api/axios";
import MovieInfoModalTop from "./MovieInfoModalTop";
import { useGenreStore } from "../../../store/genreStore";

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

  const getTrailer = async () => {
    const res = await axiosInstance.get(`/movie/${showingMovieInfo.id}/videos`);
    const data: T_MovieVideos = res.data;
    const trailer: T_videos = data.results.filter(
      (video) => video.type === "Trailer"
    )[0];
    setTrailerKey(trailer.key);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "21px";
    console.log(genreList);
    getTrailer();

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);
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
        <article className="relative w-full max-w-[1200px] mx-[30px] mt-[30px] mb-[10px] rounded-lg bg-[#181818]">
          <button
            className="p-[15px] rounded-full bg-black absolute top-[10px] right-[10px] z-10"
            onClick={setMovieInfoModalClose}
          >
            <img src={close_icon} alt="닫기 아이콘" />
          </button>
          <MovieInfoModalTop />
          <article className="px-[50px] py-[20px]">
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
          </article>
        </article>
      </article>
    </article>
  );
}
