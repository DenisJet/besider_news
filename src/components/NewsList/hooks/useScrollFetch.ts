import { useEffect } from "react";
import { debounce } from "lodash";

export const useScrollFetch = (
  currentDate: Date,
  setCurrentDate: (date: Date) => void,
) => {
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
      }
    }, 3000);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentDate, setCurrentDate]);

  return currentDate;
};
