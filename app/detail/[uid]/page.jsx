import { ObjectId } from "mongodb";
import { connectDB } from "util/database";
import Comment from "components/Comment";
import { notFound } from "next/navigation";
/**
 * MongoDB는 서버에서 실행되어야 합니다.
 * React에서 동적으로 데이터에 액세스하려면 Express나 Apollo와 같은 것을 사용하여 API를 설정해야 합니다.
 * 따라서 use client 사용시 dns 관련 error 발생
 */

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.uid) });

  if (result == null) {
    return notFound();
  } else {
    return (
      <div>
        <h4>{result.title}</h4>
        <h4>DES</h4>
        <p>DES2</p>
        <Comment parentData={props} />
        <div></div>
      </div>
    );
  }
  // Add the ability to like posts
}
