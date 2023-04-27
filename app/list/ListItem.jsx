"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  const onDeleteClick = (uid) => {
    fetch("/api/post/delete", { method: "DELETE", body: uid })
      .then((r) => {
        if (r.status == 200) {
          return window.location.reload();
        } else {
          //서버가 에러코드전송시 실행할코드
        }
      })
      .then((result) => {
        //성공시 실행할코드
      })
      .catch((error) => {
        //인터넷문제 등으로 실패시 실행할코드
        console.log(error);
      });
  };
  return (
    <div>
      {result.map((el) => {
        return (
          <div className="list-item" key={el._id}>
            <Link style={{ textDecoration: "none" }} href={`/detail/${el._id}`}>
              <h4>{el.title}</h4>
            </Link>
            <Link style={{ textDecoration: "none" }} href={`/edit/${el._id}`}>
              <h4>✍️</h4>
            </Link>
            <button
              onClick={() => onDeleteClick(el._id)}
              style={{ background: "none" }}
            >
              🗑️
            </button>
            <p>{el.content}</p>
          </div>
        );
      })}
    </div>
  );
}

/**
 * point 1. 함수형 컴포넌트 최상단에 async 붙이지 않기.
point 2. useEffect 안에 async awiat 을 적용한 함수를 사용한다. 방법은 2가지가 있다.


onDeleteClick(el._id)를 onClick 이벤트 핸들러에 전달하면서 함수가 즉시 호출되기 때문입니다. 
따라서 모든 ListItem이 렌더링될 때마다 해당 함수가 즉시 실행됩니다.

이를 해결하기 위해서는 onClick 이벤트 핸들러에 함수를 전달하는 방법으로 수정해야 합니다. 
즉, onDeleteClick(el._id) 대신에 () => onDeleteClick(el._id)를 전달해야 합니다. 
 */
