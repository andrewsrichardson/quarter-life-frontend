import Link from "next/link";
import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";
import React, { useContext, useState } from "react";
import { SITE_NAME } from "@/lib/constants";
import classnames from "classnames";

export default function Header() {
  const { user, setUser } = useContext(AppContext);
  const [menu, setMenuOpen] = useState(false);

  const menuClass = menu ? "" : " hidden";

  function toggleMenu() {
    setMenuOpen(!menu);
  }

  return (
    <div className="relative">
      <nav className="flex items-center justify-between flex-wrap p-6 w-full z-10 lg:container m-auto">
        <div className="flex items-center flex-no-shrink mr-6">
          <Link href="/" replace>
            <a className="hover:underline">{SITE_NAME}</a>
          </Link>
        </div>

        <div className="block lg:hidden">
          <button
            id="nav-toggle"
            className="flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:border-black"
            onClick={() => toggleMenu()}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={classnames(
            "w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-6 lg:pt-0",
            menuClass
          )}
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3 mb-10 xl:mb-0">
              <Link href="">
                <a className="nav-link hover:underline xl:pr-10">Topics</a>
              </Link>
            </li>
            <li className="mr-3 mb-10 xl:mb-0">
              <Link href="/blog">
                <a className="nav-link hover:underline xl:pr-10">Blog</a>
              </Link>
            </li>
            <li className="mr-3 mb-10 xl:mb-0">
              <Link href="/questions">
                <a className="nav-link hover:underline xl:border-r-2 pr-10">
                  Talk
                </a>
              </Link>
            </li>
            <li className="mr-3 mb-10 xl:mb-0">
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
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
