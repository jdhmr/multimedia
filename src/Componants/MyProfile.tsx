import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { HOC } from "./HOC";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../Store/Slices/User";
import { loginContext } from "../App";

const MyProfile = () => {
  const dispatch = useDispatch();

  const [loginuser, setLoginuser] = useState<any>({});
  const userId = JSON.parse(localStorage.getItem("loginuserId") as any);
  let userData = JSON.parse(localStorage.getItem("user") as string);
  let findUser = userData.find((x: any) => x.id === userId);
  let login = useContext(loginContext);
  
  useEffect(() => {
    if (findUser.obj) {
      setLoginuser(findUser);
    }
  }, []);

  
  const deleteProfile = (userId: any) => {
    if (window.confirm("Are you sure !! you want to delete user")) {
      dispatch(deleteUser(userId));
      localStorage.setItem("isLogin", JSON.stringify(false));
      login.setLogin(false);
      localStorage.removeItem("loginuserId");
      localStorage.removeItem("expireTime");
    }
  };

  return (
    <>
      <Card style={{ width: "18rem" }} className="mt-5 ms-5">
        <Card.Body>
          <Card.Title>Your profile</Card.Title>
          <Card.Text>
            <div className="text-center mb-3">
              <img
                src={loginuser?.obj?.profile}
                style={{ width: "80px", borderRadius: "50%" }}
              />
            </div>
            <p>Name : {loginuser?.obj?.userName}</p>
            <p>Email : {loginuser?.obj?.userEmail}</p>
            <p>Gender : {loginuser?.obj?.gender}</p>
            <p>DOB : {loginuser?.obj?.dob}</p>
            <p>Mobile no. :{loginuser?.obj?.tel}</p>

            <button type="button" className="w-100 mb-2 btn btn-info">
              Edit Profile
            </button>
            <button
              type="button"
              className="w-100 btn btn-danger"
              onClick={() => deleteProfile(userId)}
            >
              Delete Profile
            </button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default HOC(MyProfile);
