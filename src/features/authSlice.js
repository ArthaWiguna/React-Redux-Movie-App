import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (data) => {
    try {
      const response = await axios.post(
        `http://notflixtv.herokuapp.com/api/v1/users`,
        data
      );
      console.log(response, "register");
      return response.data.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const userLogin = createAsyncThunk("auth/userLogin", async (data) => {
  try {
    const response = await axios.post(
      `http://notflixtv.herokuapp.com/api/v1/users/login`,
      data
    );
    console.log(response, "login");
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
});

export const userEdit = createAsyncThunk("auth/userEdit", async (data) => {
  try {
    const response = await axios.put(
      `http://notflixtv.herokuapp.com/api/v1/users`,
      data,
      {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    console.log(response, "edit");
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
});

const initialState = {
  user:
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : "",
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // login
    [userLogin.pending]: (state) => {
      state.status = "loading";
    },
    [userLogin.fulfilled]: (state, action) => {
      console.log(action.payload, "ini di action login");
      state.status = "succes";
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    [userLogin.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    // register
    [userRegister.pending]: (state) => {
      state.status = "loading";
    },
    [userRegister.fulfilled]: (state, action) => {
      state.status = "succes";
      state.user = action.payload;
    },
    [userRegister.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    // edit profile
    [userEdit.pending]: (state) => {
      state.status = "loading";
    },
    [userEdit.fulfilled]: (state, action) => {
      state.status = "succes";
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [userEdit.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export const getUser = (state) => state.auth.user;

export default authSlice.reducer;
