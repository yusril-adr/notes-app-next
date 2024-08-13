import { configureStore } from "@reduxjs/toolkit";

import alertMessageReducer from "./alertMessage";
// import authUserReducer from './authUser';
// import isPreloadReducer from './isPreload';
// import threadsReducer from './threads';
// import threadDetailReducer from './threadDetail';
// import leaderboardsReducer from './leaderboards';

const store = configureStore({
  reducer: {
    alertMessage: alertMessageReducer,
    // authUser: authUserReducer,
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

export default store;
