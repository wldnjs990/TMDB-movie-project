import { useParams } from "react-router";
import { axiosInstance } from "../api/axios";
import { moreInfoPageStore } from "../store/moreInfoPageStore";
import { useEffect, useRef, useState } from "react";
import MovieInfoBox from "../components/movieInfo/MovieInfoBox";
import { v4 as uuidv4 } from "uuid";

export default function MoreInfoPage() {
  const { infoType } = useParams();

  // 첫 번째 렌더링 useEffect 스킵용
  const [firstRender, setFirstRender] = useState(true);

  // 불러올 페이지 수
  const pageCount = moreInfoPageStore((state) => state.pageCount);
  const plusPageCount = moreInfoPageStore((state) => state.plusPageCount);
  const resetPageCount = moreInfoPageStore((state) => state.resetPageCount);

  // 영화 정보 리스트
  const movieInfoList = moreInfoPageStore((state) => state.movieInfoList);
  const setMovieInfoList = moreInfoPageStore((state) => state.setMovieInfoList);
  const addMovieInfoList = moreInfoPageStore((state) => state.addMovieInfoList);

  const secRef = useRef<HTMLDivElement>(null);

  // 영화 정보 받아오기(page 설정 가능)
  const getMovieInfo = async (page: number) => {
    try {
      const res: T_movieData = await (
        await axiosInstance.get(`/movie/${infoType}?language=ko&page=${page}`)
      ).data;
      return res.results;
    } catch (error) {
      return [];
    }
  };

  // 페이지 처음 로드시 5페이지 까지 데이터 한번에 받아오기
  const getMovieInfoAll = async () => {
    try {
      const promiseList = [];
      for (let i = 1; i <= pageCount; i++) {
        promiseList.push(getMovieInfo(i));
      }
      const res = await Promise.all(promiseList);
      const allData = res.flatMap((data) => data);
      setMovieInfoList(allData);
    } catch (error) {
      console.log(error);
    }
  };

  // 추가 영화정보 받아오기(pageCount 기준)
  const scrollToGetMovieInfo = async () => {
    const res = await getMovieInfo(pageCount);
    addMovieInfoList(res);
  };

  // 스크롤 페이지 추가
  const addPageNum = async () => {
    const clientH = secRef.current?.clientHeight;
    const nowH = window.innerHeight + window.scrollY - 100;
    if (clientH === nowH) {
      console.log("dd");
      plusPageCount();
    }
  };

  useEffect(() => {
    getMovieInfoAll();
    window.addEventListener("scroll", addPageNum);

    return () => {
      window.removeEventListener("scroll", addPageNum);
      resetPageCount();
    };
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      scrollToGetMovieInfo();
    }
  }, [pageCount]);

  return (
    <section ref={secRef}>
      <h1 className="text-3xl font-bold mb-[20px]">더 보기 페이지입니당</h1>
      <article className="flex flex-wrap gap-[10px]">
        {movieInfoList.map((movieInfo) => {
          return (
            <article
              key={uuidv4()}
              className="w-[calc(100%/5-10px+10px/5)] mb-[10px]"
            >
              <MovieInfoBox movieInfo={movieInfo} />
            </article>
          );
        })}
      </article>
    </section>
  );
}
