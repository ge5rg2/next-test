import { connectDB } from "util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json("Not the right approach");
  } else {
    try {
      const { num } = req.query;
      const db = (await connectDB).db("forum");
      const result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(num) });

      console.log(result);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500);
    }
  }
}
