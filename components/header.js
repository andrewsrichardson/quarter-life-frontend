import Link from "next/link";
import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";
import React, { useContext } from "react";
import { SITE_NAME } from "@/lib/constants";

export default function Header() {
  const { user, setUser } = useContext(AppContext);
  return (
    <header className="flex justify-between container mx-auto p-5 pl-52">
      <h1 className="">
        <Link href="/">
          <a className="hover:underline">{SITE_NAME}</a>
        </Link>
        .
      </h1>
      <div className="flex">
        <Link href="/questions">
          <a className="nav-link hover:underline border-r-2 pr-10">Talk</a>
        </Link>
        {user ? (
          <div className="flex">
            <h2 className="nav-link">{user.username}</h2>
            <Link href="/">
              <a
                className="nav-link hover:underline"
                onClick={() => {
                  logout();
                  setUser(null);
                }}
              >
                Logout
              </a>
            </Link>
          </div>
        ) : (
          <div className="flex">
            <Link href="/login">
              <a className="nav-link hover:underline">Login</a>
            </Link>
            <Link href="/register">
              <a className="nav-link hover:underline">Register</a>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
