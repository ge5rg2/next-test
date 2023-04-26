import { connectDB } from "util/database";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { ID, PW } = req.body;

    // 유효성 검사
    if (!ID || !PW) {
      return res.status(400).json("Invalid id or pw");
    }

    const db = (await connectDB).db("forum");

    // 중복 체크
    const exists = await db.collection("users").findOne({ ID });
    if (exists) {
      return res.status(400).json("ID already exists");
    }

    // 회원가입
    const result = await db.collection("users").insertOne({
      ID,
      PW,
    });
    return res.status(200).json(result);
  } else {
    return res.status(400).json("This is an incorrect approach.");
  }
};

export default handler;
