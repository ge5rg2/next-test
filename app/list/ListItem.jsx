"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  const onDeleteClick = (uid) => {
    fetch(`/api/delete/${uid}`, { method: "POST" })
      .then((r) => r.json())
      .then((result) => {
        if (result.deletedCount === 1) {
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
              className="list-btn"
              onClick={(e) => {
                fetch(`/api/post/delete?uid=${el._id}`, {
                  method: "GET",
                }).then(() => {
                  e.target.parentElement.style.opacity = 0;
                  setTimeout(() => {
                    e.target.parentElement.style.display = "none";
                  }, 1000);
                });
              }}
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

/어쩌구?a=1&b=2&c=3 
이렇게 URL을 작성하면 서버로 {a:1, b:2, c:3} 이런 데이터가 전송됩니다.

물음표 뒤에 오는 것들을 query string이라고 부릅니다. 
 */
