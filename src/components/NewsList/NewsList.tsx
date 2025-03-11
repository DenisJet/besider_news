import { getNews } from "@/store/news.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsItem from "../NewsItem/NewsItem";

export default function NewsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    const currentDate = new Date();
    dispatch(
      getNews({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      }),
    );
  }, [dispatch]);

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

  const groupNewsByDate = (newsItems: typeof items) => {
    return newsItems.reduce((acc, item) => {
      const date = new Date(item.pub_date).toLocaleDateString("en-CA");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {} as Record<string, typeof items>);
  };

  const reversedItems = items.slice().reverse();
  const groupedNews = groupNewsByDate(reversedItems);
  console.log(groupedNews);

  if (status === "loading") {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="px-[20px] max-w-7xl m-auto">
      {Object.entries(groupedNews).map(([date, newsItems]) => (
        <div key={date}>
          <h2 className="text-[18px] font-bold mt-[10px] mb-0 text-left">
            News for {date}
          </h2>
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-[20px] justify-center">
            {newsItems.map((item) => (
              <NewsItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
