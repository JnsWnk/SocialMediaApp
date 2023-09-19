import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as api from "../../src/api";

export interface UserState {
  user: {
    _id: String;
    name: String;
    email: String;
    image: String;
  } | null;
  token: String | null;
  loggedIn: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  user: null,
  token: null,
  loggedIn: false,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const loggedIn = (state: RootState) => state.user.loggedIn;
export const userInfo = (state: RootState) => state.user.user;

export default userSlice.reducer;
