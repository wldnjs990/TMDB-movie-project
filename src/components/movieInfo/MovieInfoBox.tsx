import { useEffect } from "react";
import { useGenreStore } from "../../store/genreStore";
import { useMovieInfoModalStore } from "../../store/movieInfoBoxStore";

export default function MovieInfoBox({
  movieInfo,
  hover = false,
  genre = false,
}: {
  movieInfo: T_MovieResult;
  hover?: boolean;
  genre?: boolean;
}) {
  const genreList = useGenreStore((state) => state.genreList);

  const setMovieInfoModalOpen = useMovieInfoModalStore(
    (state) => state.setMovieInfoModalOpen
  );
  const setShowingMovieInfo = useMovieInfoModalStore(
    (state) => state.setShowingMovieInfo
  );
  const setMovieInfoModalClose = useMovieInfoModalStore(
    (state) => state.setMovieInfoModalClose
  );

  useEffect(() => {
    return () => {
      setMovieInfoModalClose();
    };
  });

  return (
    <article
      className={`w-full max-h-[400px] cursor-pointer relative hover:z-50`}
    >
      <article
        className={`w-full h-full rounded-lg duration-300 ease-in-out ${
          hover && "group hover:scale-125 hover:bg-[#141414]"
        }`}
        onClick={() => {
          setMovieInfoModalOpen();
          setShowingMovieInfo(movieInfo);
        }}
      >
        <article className="w-full">
          <img
            src={`https://image.tmdb.org/t/p/w300${movieInfo.poster_path}`}
            alt="포스터 이미지"
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </article>
        <article className={`p-[10px]`}>
          <p className="mb-[5px]">{movieInfo.title}</p>
          {genre && (
            <article className="flex gap-[5px] flex-wrap">
              {movieInfo.genre_ids.map((id) => (
                <span
                  key={id}
                  className={`px-[5px] py-[3px] border border-white rounded-lg text-[13px]`}
                >
                  {genreList.filter((genre) => id === genre.id)[0]?.name}
                </span>
              ))}
            </article>
          )}
        </article>
      </article>
    </article>
  );
}
