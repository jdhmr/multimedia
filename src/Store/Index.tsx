import { configureStore } from "@reduxjs/toolkit";
import { Users, UsersPost, likeComment } from "./Slices/User";

const store = configureStore({
  reducer: {
    user: Users.reducer,
    post: UsersPost.reducer,
    likeComment: likeComment.reducer,
  },
});

export default store;
