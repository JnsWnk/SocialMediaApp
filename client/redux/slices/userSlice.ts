import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserState {
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    imageId: string;
    likedPosts: string[];
    friends: string[];
  } | null;
  token: string | null;
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
    updateLikes: (state, action) => {
      if (state.user) state.user.likedPosts = action.payload.likedPosts;
    },
  },
});

export const { login, logout, updateLikes } = userSlice.actions;
export const loggedIn = (state: RootState) => state.user.loggedIn;
export const userInfo = (state: RootState) => state.user.user;
export const tokenInfo = (state: RootState) => state.user.token;

export default userSlice.reducer;
