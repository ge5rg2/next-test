import { connectDB } from "util/database";

const handler = async (req, res) => {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  return res.status(200).json(result);
};

export default handler;
