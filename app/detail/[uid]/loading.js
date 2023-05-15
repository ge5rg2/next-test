export default function Loading() {
  return <h4>로딩중임</h4>;
}

/**
 * 컴포넌트 만들고 그 안에 로딩중에 보여줄 UI 넣으면 끝입니다. 

client component 사용가능

 

(참고) 실은 리액트에서의 <Suspense fallback={<h4>로딩중</h4>}> 이거랑 똑같은 역할을 해주는데

Next.js 에선 개발자 편하라고 loading.js 파일에 적으면 자동으로 <Suspense> 로 바꿔줘서 이게 가능한 것입니다.
 */
