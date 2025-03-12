import { groupNewsByDate } from "@/helpers/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface NewsItem {
  abstract: string;
  web_url: string;
  multimedia: [];
  pub_date: string;
  source: string;
  _id: string;
}

interface NewsState {
  groupedNews: { date: string; items: NewsItem[] }[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  groupedNews: [],
  status: "idle",
  error: null,
};

export const getNews = createAsyncThunk(
  "news/getNews",
  async ({ year, month }: { year: number; month: number }) => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=vEJwp3nmtqMIO6FDqQwyQdjbTzJcbdAh`,
    );
    const reversedData = response.data.response.docs.reverse();
    return groupNewsByDate(reversedData);
  },
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.status = "success";

        const uniqueNews = action.payload.filter((newGroup) => {
          const existingGroup = state.groupedNews.find(
            (group) => group.date === newGroup.date,
          );

          if (!existingGroup) return true;

          return newGroup.items.some(
            (newItem) =>
              !existingGroup.items.some(
                (existingItem) => existingItem._id === newItem._id,
              ),
          );
        });

        state.groupedNews = [...state.groupedNews, ...uniqueNews];
      })
      .addCase(getNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default newsSlice.reducer;
