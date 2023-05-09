import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);
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
        });
        return res.status(200).json(result);
      }
    }
  } else {
    return res.status(400).json("This is an incorrect approach.");
  }
}
