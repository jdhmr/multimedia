import { configureStore } from "@reduxjs/toolkit";
import { Users, UsersPost, followUnfollw, likeComment } from "./Slices/User";

const store = configureStore({
  reducer: {
    user: Users.reducer,
    post: UsersPost.reducer,
    likeComment: likeComment.reducer,
    followUnfollw: followUnfollw.reducer
  },
});

export default store;
