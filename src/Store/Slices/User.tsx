import { createSlice } from "@reduxjs/toolkit";

const Users = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("user") || "[]"),
  reducers: {
    addUser(state: string[], action) {
      state.push(action.payload);
      localStorage.setItem("user", JSON.stringify(state));
    },
    deleteUser(state, action) {
      let deleteData = state.filter((x: any) => x.id != action.payload);
      state = deleteData;
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

const UsersPost = createSlice({
  name: "post",
  initialState: JSON.parse(localStorage.getItem("post") || "[]"),
  reducers: {
    addPost(state: string[], action) {
      state.push(action.payload);
      localStorage.setItem("post", JSON.stringify(state));
    },
    deletePost(state, action) {
      let deleteData = state.filter((x: any) => x.id != action.payload);
      state = deleteData;
      localStorage.setItem("post", JSON.stringify(state));
    },
  },
});

const likeComment = createSlice({
  name: "likeComment",
  initialState: JSON.parse(localStorage.getItem("like") || "[]"),
  reducers: {
    addLike(state: any, action) {
      const { ...likeData } = action.payload;
      state = [...state, { ...likeData, type: "like" }];
      localStorage.setItem("like", JSON.stringify(state));
      return state;
    },
    deleteLike(state: any, action) {
      const likeId = action.payload;
      state = state.filter((x: any) => x.id !== likeId);
      localStorage.setItem("like", JSON.stringify(state));
      return state;
    },
    addComment(state: any, action) {
      const { ...comentData } = action.payload;
      state = [...state, { ...comentData, type: "coment" }];
      localStorage.setItem("like", JSON.stringify(state));
      return state;
    },
    deleteComment(state: any, action) {
      const commentId = action.payload;
      state = state.filter((x: any) => x.id !== commentId);
      localStorage.setItem("like", JSON.stringify(state));
      return state;
    },
  },
});

const followUnfollw = createSlice({
  name: "followUnfollws",
  initialState: JSON.parse(localStorage.getItem("follow") || "[]"),
  reducers: {
    followUser(state: any, action) {
      const { ...followData } = action.payload;
      state = [...state, { ...followData, type: "follow" }];
      localStorage.setItem("follow", JSON.stringify(state));
      return state;
    },
    unFollowUser(state: any, action) {
      const followId = action.payload;
      state = state.filter((x: any) => x.id !== followId);
      localStorage.setItem("follow", JSON.stringify(state));
      return state;
    },
    acceptUser(state: any, action) {
      const { ...followData } = action.payload;
      state = [...state, { ...followData, type: "accept" }];
      localStorage.setItem("follow", JSON.stringify(state));
      return state;
    },
    deleteAccept(state: any, action) {
      const followId = action.payload;
      state = state.filter((x: any) => x.id !== followId);
      localStorage.setItem("follow", JSON.stringify(state));
      return state;
    }
  },
});

export const { addUser, deleteUser } = Users.actions;
export const { addPost, deletePost } = UsersPost.actions;
export const { addLike, deleteLike, addComment, deleteComment } =
  likeComment.actions;
export const { followUser, unFollowUser,acceptUser,deleteAccept } = followUnfollw.actions;
export { Users, UsersPost, likeComment, followUnfollw };
