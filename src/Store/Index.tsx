import { configureStore } from "@reduxjs/toolkit";
// import { OnbordingData, Users } from "./Slices/User";
import { Users, UsersPost } from "./Slices/User";
 
 const store = configureStore({
    reducer : {
        user : Users.reducer,
        post : UsersPost.reducer
    }
 });

 export default store;