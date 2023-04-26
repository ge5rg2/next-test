import { connectDB } from "../../util/database";
import Detail from "@/basic/detail/[uid]/page";
import Link from "next/link";

export default async function List() {
  let client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  return (
    <div className="list-bg">
      {result.map((el) => {
        return (
          <div className="list-item" key={el._id}>
            <Link href={`/detail/${el._id}`}>
              <h4>{el.title}</h4>
            </Link>
            <p>{el.content}</p>
          </div>
        );
      })}
    </div>
  );
}
