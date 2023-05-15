"use client";
import { signOut } from "next-auth/react";

export default function LogoutBtn({ userName }) {
  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };
  return <button onClick={handleLogout}>{userName} Log out</button>;
}
