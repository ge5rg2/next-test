"use client";
import { signOut } from "next-auth/react";

export default function LogoutBtn({ userName }) {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      {userName} Log out
    </button>
  );
}
