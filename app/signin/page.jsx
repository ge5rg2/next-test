export default function SiginIn() {
  return (
    <div>
      <h4>Sign In</h4>
      <form className="p-20" action="/api/signin" method="POST">
        <input name="ID" placeholder="ID" />
        <input name="PW" placeholder="PW" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
