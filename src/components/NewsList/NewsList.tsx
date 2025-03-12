import { getNews } from "@/store/news.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsItem from "../NewsItem/NewsItem";
import { debounce } from "lodash";

export default function NewsList() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch<AppDispatch>();
  const { groupedNews, status, error } = useSelector(
    (state: RootState) => state.news,
  );

  useEffect(() => {
    dispatch(
      getNews({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      }),
    );
  }, [currentDate, dispatch]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
      }
    }, 1000);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentDate]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentDate = new Date();
  //     dispatch(
  //       getNews({
  //         year: currentDate.getFullYear(),
  //         month: currentDate.getMonth() + 1,
  //       }),
  //     ).then((action) => {
  //       if (getNews.fulfilled.match(action)) {
  //         const newNews = action.payload;

  //         const uniqueNews = newNews.filter(
  //           (newItem: NewsItemInterface) =>
  //             !items.some((existingItem) => existingItem._id === newItem._id),
  //         );
  //         if (uniqueNews.length > 0) {
  //           dispatch({
  //             type: "news/addNews",
  //             payload: uniqueNews,
  //           });
  //         }
  //       }
  //     });
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, [dispatch, items]);

  console.log(groupedNews);

  if (status === "failed") {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="px-[20px] max-w-7xl m-auto flex flex-col justify-center items-center">
      {groupedNews.map((group) => (
        <div key={group.date}>
          <h2 className="text-[18px] font-bold mt-[32px] mb-[16px] text-left">
            News for {group.date}
          </h2>
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-[20px] justify-center">
            {group.items.map((item) => (
              <NewsItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
      <img
        className="py-[50px]"
        src="/src/assets/🦆 icon _loading_.svg"
        alt="loading"
        width={36}
        height={36}
      />
    </div>
  );
}
