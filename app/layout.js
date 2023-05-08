import "./globals.css";
import Link from "next/link";
import LoginBtn from "components/LoginBtn";
import LogoutBtn from "components/LogoutBtn";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);
  let name = "";
  if (session) {
    name = session.user.name;
  }
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Appleforum
          </Link>
          <Link href="/write">Write</Link>
          <Link href="/list">List</Link>
          <Link href="/signin">SignIn</Link>
          <Link href="/register">Register</Link>
          {session ? <LogoutBtn userName={name} /> : <LoginBtn />}
        </div>
        {children}
      </body>
    </html>
  );
}
