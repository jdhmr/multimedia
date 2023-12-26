import React, { useEffect, useRef, useState } from "react";
import { HOC } from "./HOC";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptUser,
  deleteAccept,
  followUser,
  unFollowUser,
} from "../Store/Slices/User";
import { v4 } from "uuid";

const FollowingTab = () => {
  const [flength, setflength] = useState<any>(0);
  const userId = JSON.parse(localStorage.getItem("loginuserId") as any);
  let allUsers = useSelector((state: any) => state.user);
  let followUnfollw = useSelector((state: any) => state.followUnfollw);
  const dispatch = useDispatch();
  const followRequest = (rechivId: any) => {
    let follow = followUnfollw?.find(
      (x: any) =>
        x.type === "follow" && x.senderId === userId && x.rechivId === rechivId
    );
    if (!follow) dispatch(followUser({ id: v4(), senderId: userId, rechivId }));
  };

  const unfollowRequest = (rechivId: any) => {
    let follow = followUnfollw?.find(
      (x: any) =>
        x.type === "follow" && x.senderId === userId && x.rechivId === rechivId
    );
    if (follow) dispatch(unFollowUser(follow.id));
  };

  const rejectRequest = () => {
    let follow = followUnfollw?.find(
      (x: any) => x.type === "follow" && x.rechivId === userId
    );
    if (follow) dispatch(unFollowUser(follow.id));
  };

  let hideButton = useRef<any>();
  const acceptRequest = (rechivId: any) => {
    let follow = followUnfollw?.find(
      (x: any) =>
        x.type === "accept" && x.senderId === userId && x.rechivId === rechivId
    );
    if (!follow) dispatch(acceptUser({ id: v4(), rechivId, userId }));

    hideButton.current.style.display = "none";
  };

  const deleteRequest = (rechivId: any) => {
    let follow = followUnfollw?.find(
      (x: any) =>
        x.type === "accept" && x.userId === userId && x.rechivId === rechivId
    );
    if (follow) dispatch(deleteAccept(follow.id));
  };

  const deleteFollow = () => {
    let follow = followUnfollw?.find(
      (x: any) =>
        x.type === "accept" && x.userId === userId 
    );
    if (follow) dispatch(deleteAccept(follow.id));
    console.log(follow);
    
  };

  return (
    <>
      {allUsers.map((x: any, i: number) => {
        if (userId !== x.id) {
          return (
            <>
              <div className="w-100 d-flex  justify-content-between">
                <div className="w-25 d-flex justify-content-between align-items-center border border-2 p-2 rounded-2 ms-4 mb-2">
                  <img
                    src={x?.profile}
                    style={{ width: "45px", borderRadius: "50%" }}
                  />
                  {x.name}
                  {followUnfollw.find(
                    (y: any) =>
                      y.rechivId === x.id &&
                      y.senderId === userId &&
                      y.type === "follow"
                  ) ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => unfollowRequest(x.id)}
                    >
                      Requested
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => followRequest(x.id)}
                    >
                      Follow
                    </button>
                  )}

                  <button
                    className="btn btn-info ms-1"
                    onClick={() => {
                      unfollowRequest(x.id);
                      deleteFollow();
                    }}
                  >
                    Unfollow
                  </button>
                </div>
                <div className="w-25 d-flex justify-content-between align-items-center border border-2 p-2 rounded-2 me-4 mb-2">
                  {followUnfollw
                    .filter(
                      (y: any) =>
                        y.senderId === x.id &&
                        y.rechivId === userId &&
                        y.type == "follow"
                    )
                    .map((z: any, i: number) => {
                      return (
                        <div
                          key={i}
                          className="w-100 d-flex justify-content-between align-items-center"
                        >
                          <img
                            src={x?.profile}
                            style={{ width: "45px", borderRadius: "50%" }}
                          />
                          {x.name}

                          {followUnfollw.find(
                            (y: any) =>
                              y.id &&
                              y.type === "accept" &&
                              y.rechivId === x.id &&
                              y.userId === userId
                          ) ? (
                            <button
                              type="button"
                              className="btn btn-danger me-1"
                              onClick={() => {
                                rejectRequest();
                                deleteRequest(x.id);
                              }}
                            >
                              Unfollow
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-success me-1"
                              onClick={() => acceptRequest(x.id)}
                            >
                              Accept
                            </button>
                          )}

                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => rejectRequest()}
                            ref={hideButton}
                          >
                            reject
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          );
        }
      })}
    </>
  );
};

export default HOC(FollowingTab);
