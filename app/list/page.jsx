import { connectDB } from "../../util/database";
import DetailBtn from "components/DetailBtn";
import ListItem from "./ListItem";

export default async function List() {
  let client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  const results = JSON.parse(JSON.stringify(result));
  return (
    <div className="list-bg">
      <ListItem result={results} />
      <div>
        <div>List</div>
        <DetailBtn />
      </div>
    </div>
  );
}

/**
 * `JSON.parse()` 함수는 JSON 형식의 문자열을 JavaScript 객체로 변환합니다. `JSON.stringify()` 함수는 JavaScript 객체를 JSON 형식의 문자열로 변환합니다.

따라서 `JSON.stringify(result)`는 `result` 객체를 JSON 형식의 문자열로 변환하고, `JSON.parse()` 함수를 이용하여 다시 JavaScript 객체로 변환합니다. 
이렇게 하면 객체 내에 있는 모든 속성 값이 문자열로 변환되고, 객체의 prototype 체인에 있는 속성 값이 누락될 가능성도 있습니다. 
그러나 대개는 객체를 복제하고 JSON 형식의 문자열로 다시 파싱하여 생성된 객체를 반환하는 방법으로 객체를 깊은 복사(deep copy)하는 데 사용됩니다. 
이렇게 하면 객체가 안전하게 전달되고 서버와 클라이언트 사이에서 전달되는 데이터의 형식이 통일됩니다.
 */
