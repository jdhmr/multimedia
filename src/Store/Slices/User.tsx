import { createSlice } from "@reduxjs/toolkit";

const Users = createSlice({
  name: "user",
  initialState: [],
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
  initialState: [],
  reducers: {
    addPost(state: string[], action) {
      state.push(action.payload);
      localStorage.setItem("post", JSON.stringify(state));
    },
    deletePost(state, action) {
      // state.splice(action.payload, 1);
      let deleteData = state.filter((x: any) => x.id != action.payload);
      state = deleteData;
      localStorage.setItem("post", JSON.stringify(state));
    },
  },
});

export const { addUser, deleteUser } = Users.actions;
export const { addPost, deletePost } = UsersPost.actions;
export { Users, UsersPost };
