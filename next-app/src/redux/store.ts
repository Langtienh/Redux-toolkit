import { configureStore } from "@reduxjs/toolkit";
import blogBuilderReducer from "@/redux/builder/blog.reducer";
import blogSliceReducer from "@/redux/slice/slice";
import blogThunkReducer from "@/redux/thunk/slice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    blogBuilder: blogBuilderReducer,
    blogSlice: blogSliceReducer,
    blogThunk: blogThunkReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// thunk
export const useAppDispatch = () => useDispatch<AppDispatch>();
