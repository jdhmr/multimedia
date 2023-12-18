import React from "react";
import { HOC } from "./HOC";
import { Outlet } from "react-router-dom";

const Home = () => {
  const userId = JSON.parse(localStorage.getItem("loginuserId") as any);
  let userData = JSON.parse(localStorage.getItem("user") as string);
  let findUser = userData.find((x: any) => x.id === userId);

  return (
    <>
      {userId != findUser?.obj?.id && <Outlet />}
    </>
  );
};

export default HOC(Home);
