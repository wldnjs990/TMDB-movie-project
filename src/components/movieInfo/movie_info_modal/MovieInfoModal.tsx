import { useEffect, useRef, useState } from "react";
import { useMovieInfoModalStore } from "../../../store/movieInfoBoxStore";
import { close_icon, trailer_play_icon } from "../../../assets/images";
import { axiosInstance } from "../../../api/axios";
import MovieInfoModalTop from "./MovieInfoModalTop";
import { useGenreStore } from "../../../store/genreStore";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function MovieInfoModal() {
  const contentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState("");

  const [firstRender, setFirstRender] = useState(false);

  const getTrailer = async () => {
    const res = await axiosInstance.get(`/movie/${showingMovieInfo.id}/videos`);
    const data: T_MovieVideos = res.data;
    setVideos(data.results);
    const trailer: T_videos = data.results.filter(
      (video) => video.type === "Trailer"
    )[0];
    if (trailer !== undefined) {
      setTrailerKey(trailer.key);
    } else {
      setTrailerKey("");
    }
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
      return e.snippet.thumbnails.medium?.url;
    });
    setThumbnails(thumbnails);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "19px";
    getTrailer();
    console.log(showingMovieInfo);

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
  useEffect(() => {
    console.log(videoId);
    if (firstRender) {
      setIsVideoModalOpen(true);
    } else {
      setFirstRender(true);
    }
  }, [videoId]);
  return (
    <article className="w-full h-screen fixed top-0 left-0 overflow-y-scroll z-50">
      <article
        className="flex justify-center min-h-screen bg-black mx-[30px] bg-opacity-70"
        ref={contentRef}
        onClick={(e) => {
          if (e.target === contentRef.current) {
            setMovieInfoModalClose();
          }
        }}
      >
        {/* 컨텐츠 */}
        <article className="relative w-full max-w-[1200px] my-[30px] rounded-lg bg-[#181818]">
          <button
            className="p-[15px] rounded-full bg-black absolute top-[10px] right-[10px] z-10"
            onClick={setMovieInfoModalClose}
          >
            <img src={close_icon} alt="닫기 아이콘" />
          </button>
          <MovieInfoModalTop />
          <article className="px-[50px] py-[20px] flex flex-col gap-[10px]">
            <p>
              <strong className="text-[20px]">장르 : </strong>
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
              <strong className="text-[20px]">개봉일 : </strong>
              <span>{showingMovieInfo.release_date}</span>
            </p>
            <p>
              <strong className="text-[20px]">오버뷰 : </strong>
              <span>{showingMovieInfo.overview || "줄거리가 없습니다."}</span>
            </p>
            <section className="mt-[20px]">
              <strong className="text-[20px]">트레일러 & 관련영상</strong>
              {videos !== undefined && (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={4}
                  className="mt-[20px]"
                >
                  {videos?.map((video, i) => {
                    return (
                      <SwiperSlide
                        key={uuidv4()}
                        onClick={() => {
                          setVideoId(video.key);
                        }}
                        className="relative"
                      >
                        {thumbnails && (
                          <article className="cursor-pointer">
                            <img
                              src={thumbnails[i]}
                              alt="유튜브 썸네일"
                              className="w-full h-full object-cover"
                            />
                          </article>
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
              {videos === undefined ||
                (videos.length === 0 && <article>없어유</article>)}
            </section>
          </article>
        </article>
      </article>
      {isVideoModalOpen && (
        <>
          <article
            className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-70 z-50"
            onClick={(e) => {
              if (e.target !== iframeRef.current) setIsVideoModalOpen(false);
            }}
          >
            <article className="w-[80%] h-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                width={"100%"}
                height={"100%"}
                sandbox="allow-same-origin allow-scripts allow-presentation"
                allowFullScreen
                ref={iframeRef}
              ></iframe>
              <button
                className="p-[15px] rounded-full bg-black absolute top-[10px] right-[10px] z-10"
                onClick={() => setIsVideoModalOpen(false)}
              >
                <img src={close_icon} alt="닫기 아이콘" />
              </button>
            </article>
          </article>
        </>
      )}
    </article>
  );
}
