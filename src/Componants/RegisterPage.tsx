import React, { ChangeEvent, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { addUser } from "../Store/Slices/User";
import uuid4 from "uuid4";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  let userId = uuid4();

  const [obj, setobj] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    id: userId,
  });
  let [blank, setblank] = useState({});

  const getValue = (e: ChangeEvent<HTMLInputElement>) => {
    setobj({ ...obj, [e.target.name]: e.target.value });
    setblank({ ...blank });
  };

  let [errorMsg, seterrorMsg] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const saveData = (obj: any) => {
    const errMsg = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    };

    if (!obj.name.trim()) {
      errMsg.name = "User name is required";
    }

    if (!obj.email.trim()) {
      errMsg.email = "Email is required";
    }else if(!/\S+@\S+\.\S+/.test(obj.email)){
      errMsg.email = "Email is not valid";
    }

    if (!obj.password.trim()) {
      errMsg.password = "Password is required";
    }

    if (obj.password !== obj.cpassword) {
      errMsg.cpassword = "Password not matched";
    }

    seterrorMsg(errMsg);
    let len = Object.values(errMsg).filter((x) => x != "");

    if (len.length === 0) {
      dispatch(addUser(obj));
      navigate("/login");
    }
  };

  return (
    <>
      <Form className="w-50 mx-auto mt-5 border border-1 p-3 rounded-2 text-center">
        <h2 className="mb-4">Register Page</h2>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Full Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="name"
              onChange={getValue}
              value={obj.name}
            />
            {errorMsg.name && <span>{errorMsg.name}</span>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              name="email"
              onChange={getValue}
              value={obj.email}
            />
            {errorMsg.email && <span>{errorMsg.email}</span>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 mt-4">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="Password"
              name="password"
              onChange={getValue}
              value={obj.password}
            />
            {errorMsg.password && <span>{errorMsg.password}</span>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 mt-4">
          <Form.Label column sm="2">
            Confirm Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="Password"
              name="cpassword"
              onChange={getValue}
              value={obj.cpassword}
            />
            {errorMsg.cpassword && <span>{errorMsg.cpassword}</span>}
          </Col>
        </Form.Group>

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={() => saveData(obj)}
        >
          Register Now
        </button>
        <NavLink to="/login">
          <button type="button" className="btn btn-primary mt-3 ms-3">
            Go to login Page
          </button>
        </NavLink>
      </Form>
    </>
  );
};
