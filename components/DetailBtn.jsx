"use client";

import { useState } from "react";

export default function DetailBtn(prop) {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const onClick = async () => {
    if (toggle) {
      return setToggle((pre) => !pre);
    }
    try {
      const response = await fetch("/api/list");
      const data = await response.json();
      console.log(data);
      setData(data);
      setToggle(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={onClick}>모든 정보</button>
      {toggle
        ? data.map((el) => {
            return (
              <>
                <div>{el.title}</div>
                <div>{el.content}</div>
              </>
            );
          })
        : ""}
    </>
  );
}
