import React, { ChangeEvent, useState } from "react";
import { HOC } from "./HOC";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form } from "react-bootstrap";
import { AiFillHeart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import {
  addComment,
  addLike,
  deleteComment,
  deleteLike,
} from "../Store/Slices/User";
import { v4 } from "uuid";

const Home = () => {
  const userId = JSON.parse(localStorage.getItem("loginuserId") as any);
  let userData = JSON.parse(localStorage.getItem("user") as string);
  let findUser = userData.find((x: any) => x.id === userId);
  let posts = useSelector((state: any) => state.post);
  let likeComment = useSelector((state: any) => state.likeComment);

  const dispatch = useDispatch();

  const likePost = (postId: any) => {
    let like = likeComment.find(
      (x: any) =>
        x.type === "like" && x.userId === userId && x.postId === postId
    );

    if (like) dispatch(deleteLike(like.id));
    else dispatch(addLike({ id: v4(), postId, userId }));
  };

  const comentPost = (postId: any) => {
    let comment = likeComment?.find(
      (x: any) =>
        x.type === "coment" && x.userId === userId && x.postId === postId
    );

    if (comment) dispatch(deleteComment(comment.id));
    else dispatch(addComment({ id: v4(), postId, userId }));
  };

  return (
    <>
      {findUser?.obj
        ? posts.map((x: any, i: number) => {
            return (
              <Card style={{ width: "21rem" }} key={i} className="mb-3 mx-auto">
                <Card.Title>
                  <div className="d-flex align-items-center mt-2 ms-2">
                    <img
                      src={x?.userImg}
                      style={{ width: "35px", borderRadius: "50%" }}
                    />
                    <p className="m-0 ms-3">{x?.userName}</p>
                  </div>
                  <p className="m-0 mt-2 text-center card-p">{x.description}</p>
                </Card.Title>
                <Card.Img variant="top" src={x.postimg} />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {likeComment.find((y: any) => y.postId === x.id) ? (
                        <AiFillHeart
                          size={30}
                          onClick={() => likePost(x?.id)}
                        />
                      ) : (
                        <CiHeart size={30} onClick={() => likePost(x?.id)} />
                      )}
                    </div>

                    <div className="ms-2">
                      {likeComment.filter((y: any) => y.postId === x.id).length}
                    </div>

                    <Form className="ms-5">
                      <input
                        type="text"
                        placeholder="comment"
                        className="w-75"
                        name="comment"
                      />
                    </Form>
                  </div>

                  {likeComment
                    .filter((z: any) => z.postId === x.id)
                    .map((z: any, i: any) => {
                      return (
                        <p className="m-0" key={i}>
                          {z?.comentobj?.comment}
                        </p>
                      );
                    })}
                </Card.Body>
              </Card>
            );
          })
        : userId != findUser?.obj?.id && <Outlet />}
    </>
  );
};

export default HOC(Home);
