import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/write">Write</Link>
          <Link href="/list">List</Link>
          <Link href="/signin">SignIn</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
