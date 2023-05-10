"use client";

import { useEffect, useState } from "react";

export default function Comment({ parentData }) {
  let [comment, setComment] = useState("");

  // client side에서 server 의 data를 가져오고 싶다면 다음과 같이 useEffect에서 ajax
  useEffect(() => {
    fetch();
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
    </div>
  );
}
