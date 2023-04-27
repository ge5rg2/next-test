import { connectDB } from "util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(400).json("Not the right approach");
  } else {
    const uid = req.body;
    const db = (await connectDB).db("forum");
    const result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(uid) });
    console.log(result);
    return res.status(200).end();
  }
}
