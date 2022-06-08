import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movieSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer,
  },
});
