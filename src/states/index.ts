import {
  configureStore,
  // createAsyncThunk
} from "@reduxjs/toolkit";

import authUserReducer from "./auth";
// import isPreloadReducer from './isPreload';
// import threadsReducer from './threads';
// import threadDetailReducer from './threadDetail';
// import leaderboardsReducer from './leaderboards';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    // isPreload: isPreloadReducer,
    // threads: threadsReducer,
    // threadDetail: threadDetailReducer,
    // leaderboards: leaderboardsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState;
//   dispatch: AppDispatch;
//   rejectValue: string | Error | unknown;
// }>();

export default store;
