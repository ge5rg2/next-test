import { connectDB } from "util/database";

const handler = async (req, res) => {
  const { title, content } = req.body;
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").insertOne({
    title,
    content,
  });
  return res.status(200).json(result);
};

export default handler;
