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
  items: NewsItem[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  items: [],
  status: "idle",
  error: null,
};

export const getNews = createAsyncThunk(
  "news/getNews",
  async ({ year, month }: { year: number; month: number }) => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=vEJwp3nmtqMIO6FDqQwyQdjbTzJcbdAh`,
    );
    return response.data.response.docs;
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
        state.items = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default newsSlice.reducer;
