import { connectDB } from "util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json("Not the right approach");
  } else {
    let session = await getServerSession(req, res, authOptions);
    if (session) {
      console.log(session);
      try {
        const { uid } = req.query;
        const db = (await connectDB).db("forum");
        const dbmore = await db
          .collection("post")
          .findOne({ _id: new ObjectId(uid) });
        if (session.user.role == "admin") {
          const result = await db
            .collection("post")
            .deleteOne({ _id: new ObjectId(uid) });
          return res.status(200).send(result);
        } else if (dbmore.author !== session.user.email) {
          res.status(400).json("Not the right approach");
        } else {
          const result = await db
            .collection("post")
            .deleteOne({ _id: new ObjectId(uid) });
          return res.status(200).send(result);
        }
      } catch (error) {
        return res.status(500);
      }
    } else {
      return res
        .status(400)
        .json("You don't have permission to delete the post.");
    }
  }
}
