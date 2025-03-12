import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import NewsItem from "../NewsItem/NewsItem";

import { useFetchNews } from "./hooks/useFetchNews";
import { useAutoFetchNews } from "./hooks/useAutoFetchNews";
import { useScrollFetch } from "./hooks/useScrollFetch";

export default function NewsList() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { groupedNews, status, error } = useSelector(
    (state: RootState) => state.news,
  );

  useFetchNews(currentDate.getFullYear(), currentDate.getMonth() + 1);
  useAutoFetchNews();
  useScrollFetch(currentDate, setCurrentDate);

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
