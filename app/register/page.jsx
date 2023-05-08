export default function Register() {
  return (
    <div>
      <form method="POST" action="/api/auth/signup">
        <input name="name" type="text" placeholder="Name" />
        <input name="email" type="text" placeholder="E-mail" />
        <input name="password" type="password" placeholder="PW" />
        <button type="submit">Request</button>
      </form>
    </div>
  );
}
