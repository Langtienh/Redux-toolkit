import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { initalPostList } from "@/constants/blog";

type stateType = {
  postList: Post[];
  editingPost: Post | null;
};
const initialState: stateType = {
  postList: initalPostList,
  editingPost: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addPostSlice: {
      reducer: (state, action: PayloadAction<Post>) => {
        const post = action.payload;
        state.postList.unshift(post);
      },
      prepare: (post: Omit<Post, "id">) => ({
        payload: {
          ...post,
          id: nanoid(),
        },
      }),
    },
    deletePostSlice: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const index = state.postList.findIndex((post) => post.id === postId);
      if (index !== -1) state.postList.splice(index, 1);
    },
    editingPostSlice: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const post = state.postList.find((post) => post.id === postId) || null;
      state.editingPost = post;
    },
    cancelEditPostSlice: (state) => {
      state.editingPost = null;
    },
    updatePostSlice: (state, action: PayloadAction<Post>) => {
      const post = action.payload;
      const postId = post.id;
      const index = state.postList.findIndex((post) => post.id === postId);
      state.postList[index] = post;
      state.editingPost = null;
    },
    backupPostSlice: (state) => {
      state.postList = initalPostList;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => {
          console.log("check >> ", action.type, action.type.includes("blog"));
          // console.log(action.type.startwith("blog"));
          return action.type.includes("cancel");
        },
        (state) => {}
      )
      .addDefaultCase((_, action) => {});
  },
});

export const {
  addPostSlice,
  deletePostSlice,
  editingPostSlice,
  cancelEditPostSlice,
  updatePostSlice,
  backupPostSlice,
} = blogSlice.actions;

const blogSliceReducer = blogSlice.reducer;
export default blogSliceReducer;
