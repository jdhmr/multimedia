import React, { ChangeEvent, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OnbordingPage = () => {
  const userId = JSON.parse(localStorage.getItem("loginuserId") as any);
  let userData = JSON.parse(localStorage.getItem("user") as string);

  const [obj, setobj] = useState({
    userName: "",
    userEmail: "",
    tel: "",
    dob: "",
    gender: "",
    profile: "",
    id: userId,
  });

  let [blank, setblank] = useState({});
  let [errorMsg, seterrorMsg] = useState({
    userName: "",
    userEmail: "",
    tel: "",
    dob: "",
    gender: "",
    profile: "",
  });

  const getValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "file") {
      setobj({ ...obj, [e.target.name]: await toBase64(e.target.files?.[0]) });
    } else {
      setobj({ ...obj, [e.target.name]: e.target.value });
    }

    setblank({ ...blank });
  };

  const navigate = useNavigate();

  const saveData = (obj: any) => {
    const errMsg = {
      userName: "",
      userEmail: "",
      tel: "",
      dob: "",
      gender: "",
      profile: "",
    };

    if (!obj.userName.trim()) {
      errMsg.userName = "User name is required";
    }

    if (!obj.userEmail.trim()) {
      errMsg.userEmail = "User email is required";
    } else if (!/\S+@\S+\.\S+/.test(obj.userEmail)) {
      errMsg.userEmail = "User email is not valid";
    }

    if (!obj.tel.trim()) {
      errMsg.tel = "User name is required";
    } else if (obj.tel <= 0 || !/^[0-9]*$/.test(obj.tel)) {
      errMsg.tel = "Contact no is not valid";
    }

    if (!obj.dob.trim()) {
      errMsg.dob = "DOB is required";
    }

    if (!obj.gender.trim()) {
      errMsg.gender = "Gender is required";
    }

    if (!obj.profile.trim()) {
      errMsg.profile = "Profile is required";
    }

    seterrorMsg(errMsg);

    let len = Object.values(errMsg).filter((x) => x != "");

    if (len.length === 0) {
      localStorage.removeItem("user");
      let newUser = userData.map((x: any) => {
        return x.id === userId ? { ...x, obj } : x;
      });
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/home");
    }
  };

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <>
      <Form className="w-50 mx-auto mt-4 border border-1 p-3 rounded-2 text-center">
        <h2 className="mb-4">Onbording Page</h2>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            User Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="userName"
              onChange={getValue}
              value={obj.userName}
            />
            {errorMsg.userName && <span>{errorMsg.userName}</span>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Email Id
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              name="userEmail"
              onChange={getValue}
              value={obj.userEmail}
            />
            {errorMsg.userEmail && <span>{errorMsg.userEmail}</span>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 mt-4">
          <Form.Label column sm="2">
            Mobile no.
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="tel"
              name="tel"
              onChange={getValue}
              value={obj.tel}
            />
            {errorMsg.tel && <span>{errorMsg.tel}</span>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 mt-4">
          <Form.Label column sm="2">
            BirthDate
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="date"
              name="dob"
              onChange={getValue}
              value={obj.dob}
            />
            {errorMsg.dob && <span>{errorMsg.dob}</span>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 mt-4">
          <Form.Label column sm="2">
            Gender
          </Form.Label>
          <Col sm="3">
            <input
              className="form-check-input  me-2"
              type="radio"
              name="gender"
              value="Male"
              onChange={getValue}
              checked={obj.gender == "Male"}
            />
            Male
          </Col>
          <Col sm="3">
            <input
              className="form-check-input me-2"
              type="radio"
              name="gender"
              value="Female"
              onChange={getValue}
              checked={obj.gender == "Female"}
            />
            Female <br />
            { <span>{errorMsg.gender}</span>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 mt-4">
          <Form.Label column sm="2">
            Profile
          </Form.Label>
          <Col sm="10">
            <Form.Control type="file" name="profile" onChange={getValue} />
            <img
              src={obj.profile}
              className="mt-3 me-5"
              style={{ width: "100px", borderRadius: "50%" }}
            />
            {errorMsg.profile && <span>{errorMsg.profile}</span>}
          </Col>
        </Form.Group>

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={() => saveData(obj)}
        >
          Submit
        </button>
      </Form>
    </>
  );
};

export default OnbordingPage;
