import { connectDB } from "util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let session = await getServerSession(req, res, authOptions);
    if (session) {
      req.body.author = session.user.email;
    } else {
      return res.status(400).json("Available after signing in.");
    }
    const { title, content, author } = req.body;
    if (title == "" || content == "") {
      return res.status(200).redirect(302, "/write");
    }
    const db = (await connectDB).db("forum");
    const result = await db.collection("post").insertOne({
      title,
      content,
      author,
    });
    console.log(
      "The user has entered information ->" +
        "title " +
        title +
        " " +
        "content " +
        content +
        " " +
        "author " +
        author
    );
    return res.status(200).redirect(302, "/list");
  } else {
    return res.status(400).json("This is an incorrect approach.");
  }
  /**
   * DB가 다운되거나 인터넷이 뭔가 끊기거나 그런 경우 DB에서 에러가 발생할 수 있습니다.
    그런 경우도 체크하고 싶으면 try, catch를 사용합시다.
    try, catch 문법은 try { } 안에 있던 코드가 에러나면 catch { } 안에 있는 코드를 대신 실행해줍니다.
   */
};

export default handler;
