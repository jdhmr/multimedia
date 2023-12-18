import React, { FC, useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { loginContext } from "../App";

export const HOC = (Comp: FC) => {
  const Newcomponant = () => {
    let onbordingData = JSON.parse(
      localStorage.getItem("onbordingData") as string
    );
    const userId = JSON.parse(localStorage.getItem("loginuserId") as any);
    let login = useContext(loginContext);

    const [loginuser, setLoginuser] = useState<any>({});
    let userData = JSON.parse(localStorage.getItem("user") as string);
    let findUser = userData.find((x: any) => x.id === userId);

    useEffect(() => {
      if (findUser?.obj) {
        setLoginuser(findUser);
      }
    }, []);

    const logOut = () => {
      localStorage.setItem("isLogin", JSON.stringify(false));
      login.setLogin(false);
      localStorage.removeItem("loginuserId");
      localStorage.removeItem("expireTime");
    };

    return (
      <>
        <div className="d-flex">
          <div className="sidebar">
            <div className="sidebar-menu px-4">
              <NavLink to="/home">
                <div>Home</div>
              </NavLink>
              <NavLink to="/post">
                <div>Post</div>
              </NavLink>
              <NavLink to="/profile">
                <div className="mt-5">My profile</div>
              </NavLink>
            </div>
          </div>
          <div className="header">
            <div className="d-flex py-2 px-2 justify-content-between align-items-center">
              <div className="mb-3">
                <input type="text" placeholder="Search..." />
                <BiSearch size={30} />
              </div>

              <Link to="/profile">
                <p>
                  <span>
                    <img
                      src={loginuser.obj?.profile}
                      className="me-3"
                      style={{ width: "40px", borderRadius: "50%" }}
                    />
                  </span>
                  {loginuser?.obj?.userName}
                </p>
              </Link>

              <button className="btn btn-danger mb-3" onClick={logOut}>
                Logout
              </button>
            </div>
            <div>
              <Comp />
            </div>
          </div>
        </div>
      </>
    );
  };

  return Newcomponant;
};
