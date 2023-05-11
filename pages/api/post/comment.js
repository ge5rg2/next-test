import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method == "POST") {
    if (!session) {
      return res.status(400).json("Available after login");
    } else {
      const { comment, parent } = req.body;
      const { email, name } = session.user;
      if (!comment) {
        return res.status(400).json("Spaces are not allowed.");
      } else {
        const db = (await connectDB).db("forum");
        const result = await db.collection("comment").insertOne({
          comment,
          parent: new ObjectId(parent),
          email,
          name,
          like: [email],
        });
        let resultComment = await db
          .collection("comment")
          .find({ parent: new ObjectId(parent) })
          .toArray();
        return res.status(200).json(resultComment);
      }
    }
  } else if (req.method == "PUT") {
    const { _id } = req.body;
    const { email } = session.user;
    const db = (await connectDB).db("forum");
    const result = await db
      .collection("comment")
      .findOne({ _id: new ObjectId(_id) });
    if (result) {
      if (email == result.email) {
        return res.status(400).json("You already liked this comment");
      } else {
      }
    }
    return;
  } else {
    return res.status(400).json("This is an incorrect approach.");
  }
}

// PUT 일 경우 추가
