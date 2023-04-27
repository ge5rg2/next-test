import { connectDB } from "util/database";
import { ObjectId } from "mongodb";

const Edit = async (props) => {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.uid) });
  return (
    <div>
      <h4>Edit</h4>
      <form className="p-20" action="/api/edit" method="POST">
        <input
          name="title"
          placeholder="Post title"
          defaultValue={result.title}
        />
        <input
          name="content"
          placeholder="Content"
          defaultValue={result.content}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Edit;

/**
 * input요소에 value와 defaultValue 중 뭘 써야 하나?
 * 
controlled Component 방식일 땐 - value 사용
대부분 폼 요소에는 controlled Component 방식 사용 권장함
value값이 state고 handler를 통해 값 수정하는 방식으로
<input value={state} onClick={onClick} />

2. uncontrolled Component 방식일 땐 - defaultValue 사용
uncontrolled Component 방식에서는 DOM이 form data를 처리 하기 때문에 value를 사용해도 값을 바꿀 수가 없다.
그래서 defaultValue를 사용하여 ref.current.value로 값을 제어하게 됨.
 */
