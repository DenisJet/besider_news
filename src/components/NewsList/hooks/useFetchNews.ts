import { useEffect } from "react";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { getNews } from "@/store/news.slice";

export const useFetchNews = (year: number, month: number) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      getNews({
        year,
        month,
      }),
    );
  }, [year, month, dispatch]);
};
