import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as api from "../../src/api";
import { Post } from "@/components/PostForm";

export interface PostsState {
  value: Array<any>;
  status: "idle" | "loading" | "failed";
}

const initialState: PostsState = {
  value: [],
  status: "idle",
};

export const fetchPosts = createAsyncThunk("posts/getAll", async () => {
  const response = await api.fetchPosts();
  return response.data;
});

export const createPost = createAsyncThunk(
  "posts/create",
  async (post: Post) => {
    const response = await api.createPost(post);
    return response.data;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clear: (state) => {
      state.value = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(createPost.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clear } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.value;

export default postsSlice.reducer;
