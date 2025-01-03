import { useState } from "react";
import { useMovieInfoModalStore } from "../../../store/movieInfoBoxStore";
import { close_icon, trailer_play_icon } from "../../../assets/images";

export default function MovieInfoModalTop() {
  const showingMovieInfo = useMovieInfoModalStore(
    (state) => state.showingMovieInfo
  );

  const trailerKey = useMovieInfoModalStore((state) => state.trailerKey);

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  return (
    <article className="relative before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-t from-[#181818] to-transition">
      <img
        src={`https://image.tmdb.org/t/p/original/${showingMovieInfo.backdrop_path}`}
        alt="백드랍 이미지"
        className="rounded-t-lg"
      />
      <h2 className="absolute bottom-[50px] left-[50px] text-[50px] font-extrabold">
        {showingMovieInfo.title}
      </h2>
      {trailerKey !== "" && (
        <button
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100px] h-[100px]"
          onClick={() => setIsTrailerOpen(true)}
        >
          <img
            src={trailer_play_icon}
            alt="트레일러 재생 버튼 아이콘"
            className="w-full h-full object-cover opacity-80 bg-black bg-opacity-70 rounded-full hover:opacity-100 hover:bg-opacity-50"
          />
        </button>
      )}

      {isTrailerOpen && (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
            width={"100%"}
            height={"100%"}
            sandbox="allow-same-origin allow-scripts allow-presentation"
            className="absolute top-0 left-0 z-10"
            allowFullScreen
          ></iframe>
          <button
            className="p-[15px] rounded-full bg-black absolute top-[10px] right-[10px] z-10"
            onClick={() => setIsTrailerOpen(false)}
          >
            <img src={close_icon} alt="닫기 아이콘" />
          </button>
        </>
      )}
    </article>
  );
}
