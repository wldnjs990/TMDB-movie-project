import { useGenreStore } from "../store/genreStore";

export default function MovieInfoBox({
  movieInfo,
}: {
  movieInfo: T_MovieResult;
}) {
  const genreList = useGenreStore((state) => state.genreList);

  return (
    <article className="max-h-[400px]">
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
