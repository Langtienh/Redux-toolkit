import { createAction, createReducer } from "@reduxjs/toolkit";
import { initalPostList } from "@/constants/blog";

type stateType = {
  postList: Post[];
  editingPost: Post | null;
};
const initialState: stateType = {
  postList: initalPostList,
  editingPost: null,
};

const addPost = createAction<Post>("blog/addPost");
const deletePost = createAction<string>("blog/deletePost");
const editingPost = createAction<string>("blog/editingPost");
const cancelEditPost = createAction("blog/cancelEditPost");
const updatePost = createAction<Post>("blog/updatePost");
const backupPost = createAction("blog/backupPost");
export {
  addPost,
  deletePost,
  editingPost,
  cancelEditPost,
  updatePost,
  backupPost,
};

const blogBuilderReducer = createReducer(initialState, (builder) => {
  builder.addCase(addPost, (state, action) => {
    const post = action.payload;
    state.postList.unshift(post);
  });
  builder.addCase(deletePost, (state, action) => {
    const postId = action.payload;
    const index = state.postList.findIndex((post) => post.id === postId);
    if (index !== -1) state.postList.splice(index, 1);
  });
  builder.addCase(editingPost, (state, action) => {
    const postId = action.payload;
    const post = state.postList.find((post) => post.id === postId) || null;
    state.editingPost = post;
  });
  builder.addCase(cancelEditPost, (state) => {
    state.editingPost = null;
  });
  builder.addCase(updatePost, (state, action) => {
    const post = action.payload;
    const postId = post.id;
    const index = state.postList.findIndex((post) => post.id === postId);
    state.postList[index] = post;
    state.editingPost = null;
  });
  builder.addCase(backupPost, (state) => {
    state.postList = initalPostList;
  });
});
export default blogBuilderReducer;
