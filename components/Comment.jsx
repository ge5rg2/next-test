"use client";

import { useEffect, useState } from "react";

export default function Comment({ parentData }) {
  let [comment, setComment] = useState("");
  let [comments, setComments] = useState([]);

  // client side에서 server 의 data를 가져오고 싶다면 다음과 같이 useEffect에서 ajax
  useEffect(() => {
    fetch(`/api/comments?uid=${parentData.params.uid}`)
      .then((r) => r.json())
      .then((result) => setComments(result));
  }, []);

  return (
    <div id="comment">
      <div>Comment List</div>
      <input onChange={(e) => setComment(e.target.value)} />
      <button
        style={{ cursor: "pointer" }}
        onClick={() => {
          fetch("/api/post/comment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              comment: comment,
              parent: parentData.params.uid,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.acknowledged) {
                alert("Successful creation");
                return setComment("");
              }
              // 성공시 실행할 코드
            })
            .catch((error) => {
              console.error(error);
              // 실패시 실행할 코드
            });
        }}
      >
        Forwarding comments
      </button>
      <div>
        {comments.length > 0
          ? comments.map((el, index) => {
              <div key={index}>{el.email}</div>;
            })
          : "No comment"}
      </div>
      <div>
        {comments.length > 0
          ? comments.map((el, index) => <div key={index}>{el.comment}</div>)
          : "No comment"}
      </div>
    </div>
  );
}

/**
 * <div>
        {comments.length > 0
          ? comments.map((el, index) => {
              <div key={index}>{el.email}</div>;
            })
          : "No comment"}
      </div>
      {}로 dom을 씌우면 작동안됨  JSX 요소가 맵 함수 콜백 내에서 올바르게 반환되도록 합니다.
      <div>
        {comments.length > 0
          ? comments.map((el, index) => <div key={index}>{el.comment}</div>)
          : "No comment"}
      </div>
 */
