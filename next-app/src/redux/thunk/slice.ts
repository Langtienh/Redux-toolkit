import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { initalPostList } from "@/constants/blog";
import http from "@/utils/http";

type stateType = {
  postList: Post[];
  editingPost: Post | null;
  loading: boolean;
  currentRequestId: undefined | string;
};
const initialState: stateType = {
  postList: [],
  editingPost: null,
  loading: false,
  currentRequestId: undefined,
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export const getPostList = createAsyncThunk(
  "blog/getPostList",
  async (_, thunkAPI) => {
    const response = await http.get<Post[]>("/posts", {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

export const addPostThunk = createAsyncThunk(
  "blog/addPostThunk",
  async (post: Omit<Post, "id">, thunkAPI) => {
    const response = await http.post<Post>("/posts", post, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

export const deletePostThunk = createAsyncThunk(
  "blog/deletePostThunk",
  async (id: string, thunkAPI) => {
    await http.delete<Post>(`/posts/${id}`, {
      signal: thunkAPI.signal,
    });
    return id;
  }
);

export const updatePostThunk = createAsyncThunk(
  "blog/updatePostThunk",
  async ({ post, postId }: { post: Post; postId: string }, thunkAPI) => {
    const response = await http.put<Post>(`/posts/${postId}`, post, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);
function isPendingAction(action: UnknownAction): action is PendingAction {
  return typeof action.type === "string" && action.type.endsWith("/pending");
}

const blogThunk = createSlice({
  name: "blog",
  initialState,
  reducers: {
    editingPostThunk: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const post = state.postList.find((post) => post.id === postId) || null;
      state.editingPost = post;
    },
    cancelEditPostThunk: (state) => {
      state.editingPost = null;
    },
    backupPostThunk: (state) => {
      state.postList = initalPostList;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload;
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        state.postList.unshift(action.payload);
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        const postId = action.payload;
        const index = state.postList.findIndex((post) => post.id === postId);
        if (index !== -1) state.postList.splice(index, 1);
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        const post = action.payload;
        const postId = post.id;
        const index = state.postList.findIndex((post) => post.id === postId);
        state.postList[index] = post;
        state.editingPost = null;
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action): action is RejectedAction => action.type.endsWith("/rejected"),
        (state, action) => {
          if (
            state.loading &&
            state.currentRequestId === action.meta.requestId
          ) {
            state.loading = false;
          }
        }
      )
      // matcher can just return boolean and the matcher can receive a generic argument
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (
            state.loading &&
            state.currentRequestId === action.meta.requestId
          ) {
            state.loading = false;
          }
        }
      );
  },
});

export const { editingPostThunk, cancelEditPostThunk, backupPostThunk } =
  blogThunk.actions;
const blogThunkReducer = blogThunk.reducer;
export default blogThunkReducer;
