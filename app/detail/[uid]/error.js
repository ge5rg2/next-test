"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h4>오 이런 에러남</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        다시시도
      </button>
    </div>
  );
}

/**
 * 1. 여긴 항상 client component만 넣을 수 있음 

2. error라는 props 출력해보면 에러내용 알려줌 

3. reset이라는 props를 ( ) 붙여서 실행하면 해당 페이지를 다시 로드해줍니다. 
 */
