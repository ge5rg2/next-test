import { getServerSession } from "next-auth";
import { connectDB } from "util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(400).json("Available after login");
    } else {
      try {
        const { uid } = req.query;
        const db = (await connectDB).db("forum");
        let result = await db
          .collection("comment")
          .find({ parent: new ObjectId(uid) })
          .toArray();
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500);
      }
    }
  } else {
    return res.status(400).json("This is an incorrect approach.");
  }
}
