import { ObjectId } from "mongodb";
import { connectDB } from "util/database";

const handler = async (req, res) => {
  const url = req.headers.referer;
  const uid = url.split("/").pop();
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json("No whitespace allowed");
    }

    // Check for duplicates
    const currentData = await db
      .collection("post")
      .findOne({ _id: new ObjectId(uid) });
    if (currentData.title == title && currentData.content == content) {
      return res.status(400).json("No change");
    }

    // update
    const result = await db.collection("post").updateOne(
      { _id: new ObjectId(uid) }, // `Conditions for finding documents to update`
      { $set: { title, content } } // Specify the fields and values to update
    );
    return res.status(200).json(result);
  } else {
    return res.status(400).json("This is an incorrect approach.");
  }
};

export default handler;

/**
 * $set 연산자는 기존 값을 바꿔줍니다. 만약에 없으면 추가해줌
$unset 연산자는 기존에 있던 키값을 제거해줍니다. 
$inc 연산자는 기존 값이 숫자면 거기에 숫자를 더하거나 뺄 때 사용합니다. 
 */
