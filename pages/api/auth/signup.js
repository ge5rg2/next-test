import bcrypt from "bcrypt";
import { connectDB } from "util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json("Spaces are not allowed.");
    }
    let db = (await connectDB).db("forum");
    const compareDB = await db
      .collection("user_cred")
      .findOne({ email: email });
    if (compareDB) {
      return res.status(400).json("An account that already exists.");
    }
    const hash = await bcrypt.hash(password, 10);
    password = hash;
    await db.collection("user_cred").insertOne({
      name,
      email,
      password,
      role: "user",
    });
    res.status(200).json("Sucess!");
  } else {
    res.status(400).json("This is an incorrect approach.");
  }
}
