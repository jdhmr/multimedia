import React, { useContext, useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { HOC } from "./HOC";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, deleteUser } from "../Store/Slices/User";
import { loginContext } from "../App";

const MyProfile = () => {
  const dispatch = useDispatch();
  let posts = useSelector((state: any) => state.post);
  const [loginuser, setLoginuser] = useState<any>({});
  const userId = JSON.parse(localStorage.getItem("loginuserId") as any);
  let userData = JSON.parse(localStorage.getItem("user") as string);
  let findUser = userData.find((x: any) => x.id === userId);
  let followUnfollw = useSelector((state: any) => state.followUnfollw);
  let allUsers = useSelector((state: any) => state.user);
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

  const deletePosts = (delId: any) => {
    if (window.confirm("Are you sure !! you want to delete user")) {
      dispatch(deletePost(delId));
    }
  };

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (
    <>
      <Card style={{ width: "20rem" }} className="mt-5 mx-auto">
        <Card.Body>
          <Card.Title>My profile</Card.Title>
          <Card.Text>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
              <img
                src={loginuser?.profile}
                style={{ width: "60px", borderRadius: "50%" }}
              />
              <div>
                <button
                  type="button"
                  onClick={handleShow1}
                  className="me-1 border border-0"
                  style={{ background: "transparent" }}
                >
                  Following
                </button>
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Following</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {allUsers
                      .map((list: any) => {
                        const follow = followUnfollw.find(
                          (item: any) =>
                            item?.userId === list.id &&
                            item?.rechivId === userId &&
                            item.type === "accept"
                        );
                        if (follow) {
                          return list;
                        }
                      })
                      .map((z: any, i: number) => {
                        return (
                          <div
                            key={i}
                            className="w-100 d-flex justify-content-between align-items-center"
                          >
                            <img
                              src={z?.profile}
                              style={{
                                width: "45px",
                                borderRadius: "50%",
                              }}
                            />
                            {z?.name}
                          </div>
                        );
                      })}
                  </Modal.Body>
                </Modal>

                {
                  followUnfollw.filter(
                    (x: any) => x.rechivId === userId && x.type === "accept"
                  ).length
                }
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleShow2}
                  className="me-1 border border-0"
                  style={{ background: "transparent" }}
                >
                  Followers
                </button>

                <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title>Followers</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {allUsers
                      .map((list: any) => {
                        const follow = followUnfollw.find(
                          (item: any) =>
                            item?.rechivId === list.id &&
                            item?.userId === userId &&
                            item.type === "accept"
                        );
                        if (follow) {
                          return list;
                        }
                      })
                      .map((z: any, i: number) => {
                        return (
                          <div
                            key={i}
                            className="w-100 d-flex justify-content-between align-items-center"
                          >
                            <img
                              src={z?.profile}
                              style={{
                                width: "45px",
                                borderRadius: "50%",
                              }}
                            />
                            {z?.name}
                          </div>
                        );
                      })}
                  </Modal.Body>
                </Modal>

                {
                  followUnfollw.filter(
                    (x: any) => x.userId === userId && x.type === "accept"
                  ).length
                }
              </div>
            </div>
            <hr />
            <p>Name : {loginuser?.obj?.userName}</p>
            <p>Email : {loginuser?.obj?.userEmail}</p>
            <p>Gender : {loginuser?.obj?.gender}</p>
            <p>DOB : {loginuser?.obj?.dob}</p>
            <p>Mobile no. :{loginuser?.obj?.tel}</p>
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

      {posts.map((x: any, i: number) => {
        if (userId === x.userLoninId) {
          return (
            <Card style={{ width: "21rem" }} className="mt-5 mx-auto">
              <Card.Img variant="top" src={x.postimg} />
              <Card.Body>
                <Card.Text>{x.description}</Card.Text>
              </Card.Body>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deletePosts(x.id)}
              >
                Delete post
              </button>
            </Card>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default HOC(MyProfile);
