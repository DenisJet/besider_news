import { useEffect } from "react";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { getNews } from "@/store/news.slice";

export const useAutoFetchNews = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      dispatch(
        getNews({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
        }),
      );
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);
};
