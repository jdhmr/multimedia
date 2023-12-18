import React, { ChangeEvent, useContext, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { loginContext } from "../App";
import { NavLink, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  let login = useContext(loginContext);
  const navigate = useNavigate();
  const [obj, setobj] = useState({
    email: "",
    password: "",
  });

  let [blank, setblank] = useState({});
  let userData = JSON.parse(localStorage.getItem("user") as string);

  const getValue = (e: ChangeEvent<HTMLInputElement>) => {
    setobj({ ...obj, [e.target.name]: e.target.value });
    setblank({ ...blank });
  };

  const loginAccount = () => {
    if (obj.email) {
      let userObj = userData?.find((x: any) => x.email == obj.email);

      if (userObj == undefined) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "Incorrect Email",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      } else if (userObj.password != obj.password) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "Incorrect Password",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      } else {
        localStorage.setItem("loginuserId", JSON.stringify(userObj.id));
        const expireTime: number = Date.now() + 1000 * 60 * 30;
        localStorage.setItem("expireTime", JSON.stringify(expireTime));
        localStorage.setItem("isLogin", JSON.stringify(true));
        navigate("/home/onbord");
        login.setLogin(true);
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "User not found",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    }
  };

  return (
    <>
      <Form className="w-25 mx-auto mt-5 border border-1 p-3 rounded-2 text-center">
        <h2 className="mb-4">Login Page</h2>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={getValue}
              value={obj.email}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 mt-4"
          controlId="formPlaintextPassword"
        >
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="Password"
              placeholder="Enter your password"
              name="password"
              onChange={getValue}
              value={obj.password}
            />
          </Col>
        </Form.Group>

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={loginAccount}
        >
          Login
        </button>
        <NavLink to="/register">
          <button type="button" className="btn btn-primary mt-3 ms-3">
            Go to register
          </button>
        </NavLink>
      </Form>
    </>
  );
};
