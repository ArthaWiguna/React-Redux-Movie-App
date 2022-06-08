import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async ({ page, limit, search }) => {
    try {
      const response = await axios.get(
        `https://notflixtv.herokuapp.com/api/v1/movies?page=${page}&limit=${limit}&search=${search}`
      );
      // console.log(response.data.data.docs);
      console.log(response, "fetchAsyncMovies");
      return response.data.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchAsyncMoviesGenre = createAsyncThunk(
  "movies/fetchAsyncMoviesGenre",
  async () => {
    try {
      const response = await axios.get(
        `https://notflixtv.herokuapp.com/api/v1/movies/genres`
      );
      console.log(response);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchAsyncMovieSelected = createAsyncThunk(
  "movies/fetchAsyncMovieSelected",
  async ({ page, limit, genre }) => {
    console.log(page, limit, genre);
    try {
      const response = await axios.get(
        `https://notflixtv.herokuapp.com/api/v1/movies?page=${page}&limit=${limit}&genre=${genre}`
      );
      // console.log(pageNumber, genre, "ini selected");
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchAsyncSearchMovie = createAsyncThunk(
  "movies/fetchAsyncSearchMovie",
  async ({ page, limit, search }) => {
    console.log(page, limit, search, "fetchAsyncSearch");
    try {
      const response = await axios.get(
        `https://notflixtv.herokuapp.com/api/v1/movies?page=${page}&limit=${limit}&search=${search}`
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAsyncDetailMovie = createAsyncThunk(
  "movies/fetchAsyncDetailMovie",
  async (id) => {
    try {
      const response = await axios.get(
        `https://notflixtv.herokuapp.com/api/v1/movies/${id}`
      );
      console.log(response, "Detail");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createAsyncReviewsMovie = createAsyncThunk(
  "movies/createAsyncReviewsMovie",
  async (params) => {
    console.log(params);
    try {
      const response = await axios.post(
        `https://notflixtv.herokuapp.com/api/v1/reviews/${params.id}/create`,
        params.data,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response, "create review");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  movies: [],
  movieDetail: [],
  totalPages: 1,
  moviesGenre: [],
  titleSearch: "",
  userReviewsStatus: "",
  page: 1,
  genre: "All",
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSearchMovie: (state, action) => {
      state.titleSearch = action.payload;
      console.log(action.payload, "setsearch");
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      state.status = "success";
      if (
        payload.docs !== undefined &&
        typeof payload.docs !== "undefined" &&
        payload.totalPages !== undefined &&
        typeof payload.totalPages !== "undefined"
      ) {
        state.movies = payload.docs;
        state.totalPages = payload.totalPages;
      }
      state.titleSearch = "";
    },
    [fetchAsyncMovies.rejected]: (state) => {
      state.error = "error";
    },
    [fetchAsyncMoviesGenre.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAsyncMoviesGenre.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.moviesGenre = payload;
    },
    [fetchAsyncMoviesGenre.rejected]: (state) => {
      state.error = "error";
    },
    [fetchAsyncMovieSelected.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAsyncMovieSelected.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.movies = payload.docs;
      state.totalPages = payload.totalPages;
      state.titleSearch = "";
    },
    [fetchAsyncMovieSelected.rejected]: (state) => {
      state.error = "error";
    },
    [fetchAsyncSearchMovie.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAsyncSearchMovie.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.movies = payload.docs;
      state.totalPages = payload.totalPages;
    },
    [fetchAsyncSearchMovie.rejected]: (state) => {
      state.error = "error";
    },
    [fetchAsyncDetailMovie.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAsyncDetailMovie.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.movieDetail = payload;
    },
    [fetchAsyncDetailMovie.rejected]: (state) => {
      state.status = "error";
    },
    [createAsyncReviewsMovie.pending]: (state) => {
      state.status = "loading";
    },
    [createAsyncReviewsMovie.fulfilled]: (state) => {
      state.userReviewsStatus = "success";
    },
    [createAsyncReviewsMovie.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getDetailMovie = (state) => state.movies.movieDetail;
export const getTotalPages = (state) => state.movies.totalPages;
export const getAllMoviesGenre = (state) => state.movies.moviesGenre;
export const getTitleSearch = (state) => state.movies.titleSearch;
export const getCurrentPage = (state) => state.movies.page;
export const getGenre = (state) => state.movies.genre;
export const getStatus = (state) => state.movies.status;
export const getError = (state) => state.movies.error;
export const getUserReviewsStatus = (state) => state.movies.userReviewsStatus;

export const { setSearchMovie, setCurrentPage, setGenre } = movieSlice.actions;
export default movieSlice.reducer;
