import { useEffect } from "react";
import { useGenreStore } from "../../store/genreStore";
import { useMovieInfoModalStore } from "../../store/movieInfoBoxStore";

export default function MovieInfoBox({
  movieInfo,
}: {
  movieInfo: T_MovieResult;
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
      className="w-full max-h-[400px] cursor-pointer"
      onClick={() => {
        setMovieInfoModalOpen();
        setShowingMovieInfo(movieInfo);
      }}
    >
      <article className="w-full h-[70%]">
        <img
          src={`https://image.tmdb.org/t/p/w300${movieInfo.poster_path}`}
          alt="포스터 이미지"
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </article>
      <p>{movieInfo.title}</p>
      <p>
        {movieInfo.genre_ids.map((id) => (
          <span key={id}>
            {genreList.filter((genre) => id === genre.id)[0]?.name}
          </span>
        ))}
      </p>
      <p>{movieInfo.popularity}</p>
      <p>{movieInfo.video}</p>
    </article>
  );
}
