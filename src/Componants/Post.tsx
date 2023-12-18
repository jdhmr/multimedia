import React, { useEffect, useState } from "react";
import uuid4 from "uuid4";
import {
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost } from "../Store/Slices/User";

const Post = () => {
  let state = useSelector((state: any) => state.post);
  const userId = JSON.parse(localStorage.getItem("loginuserId") as any);
  const dispatch = useDispatch();
  let postId = uuid4();
  const [postobj, setpostobj] = useState({
    postimg: "",
    description: "",
    id: postId,
    userLoninId: userId,
  });

  const getValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "file") {
      console.log(e.target.files?.[0]);

      setpostobj({
        ...postobj,
        [e.target.name]: await toBase64(e.target.files?.[0]),
      });
    } else {
      setpostobj({ ...postobj, [e.target.name]: e.target.value });
    }
    // setblank({
    //   postimg: "",
    //   description: "",
    //   id: postId,
    //   userLoninId: "",
    // });
  };

  const saveData = (postobj: {}) => {   
    console.log(postobj);
    dispatch(addPost(postobj));
    setpostobj({
      postimg: "",
      description: "",
      id: postId,
      userLoninId: userId,
    });
  };

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="ms-3" variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="w-100 mx-auto mt-4 border border-1 p-3 rounded-2 text-center">
            <Form.Group as={Row} className="mb-3 mt-4">
              <Form.Label column sm="2">
                Choose post
              </Form.Label>
              <Col sm="10">
                <Form.Control type="file" name="postimg" onChange={getValue} />
                <img
                  src={postobj.postimg}
                  className="mt-3 me-5"
                  style={{ width: "100px" }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 d-flex">
              <Form.Label column sm="2">
                Add Description
              </Form.Label>
              <FloatingLabel label="">
                <Form.Control
                  as="textarea"
                  name="description"
                  value={postobj.description}
                  onChange={getValue}
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              saveData(postobj);
            }}
          >
            Submit Post
          </Button>
        </Modal.Footer>
      </Modal>

      {state.map((x: any, i: number) => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={x.postimg} />
            <Card.Body>
              <Card.Text>{x.description}</Card.Text>
            </Card.Body>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deletePost(postobj.id)}
            >
              Delete post
            </button>
          </Card>
        );
      })}
    </>
  );
};

export default Post;
