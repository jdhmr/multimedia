import React, { Dispatch, createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./Componants/RegisterPage";
import Home from "./Componants/Home";
import { LoginPage } from "./Componants/LoginPage";
import OnbordingPage from "./Componants/OnbordingPage";
import MyProfile from "./Componants/MyProfile";
import Post from "./Componants/Post";
import FollowingTab from "./Componants/FollowingTab";

export let loginContext = createContext<{
  setLogin: Dispatch<any>;
  login: any;
}>({ login: {}, setLogin: () => { } });

function App() {
  const [login, setLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin") as string)
  );
 
  const checkInActivity = () => {
    const expireTime = JSON.parse(localStorage.getItem("expireTime") as string);
    if (expireTime < Date.now()) {
      localStorage.setItem("isLogin", JSON.stringify(false));
      setLogin(false);
      localStorage.removeItem("expireTime");
      localStorage.removeItem("loginuserId");
    }
  };

  useEffect(() => {
    checkInActivity();
  });

  return (
    <>
      <loginContext.Provider value={{ login, setLogin }}>
        <BrowserRouter>
          {login ? (
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />}>
                <Route path="onbord" element={<OnbordingPage />} />
              </Route>
              <Route path="/post" element={<Post />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/follow" element={<FollowingTab />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </BrowserRouter>
      </loginContext.Provider>
    </>
  );
}

export default App;
