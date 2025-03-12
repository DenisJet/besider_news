import { NewsItem } from "@/store/news.slice";

export const groupNewsByDate = (newsItems: NewsItem[]) => {
  const grouped = newsItems.reduce((acc, item) => {
    const date = new Date(item.pub_date).toLocaleDateString("en-CA");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, NewsItem[]>);

  return Object.entries(grouped).map(([date, items]) => ({
    date,
    items,
  }));
};
