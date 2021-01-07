import Link from "next/link";
import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import classnames from "classnames";
import { getCategories } from "@/lib/api";
import styles from "./header.module.css";
import { Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Header({}) {
  const { user, setUser } = useContext(AppContext);
  const [menu, setMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getTags() {
      const categories = (await getCategories()) || [];
      setMenuItems(categories);
    }
    getTags();
  }, []);

  const menuClass = menu ? "" : " hidden";

  function toggleMenu() {
    setMenuOpen(!menu);
  }

  const textMotion = {
    rest: {
      color: "grey",
      x: 0,
      transition: {
        duration: 2,
        type: "tween",
        ease: "easeIn"
      }
    },
    hover: {
      color: "black",
      x: 20,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut"
      }
    }
  };
  const slashMotion = {
    rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeIn"
      }
    }
  };

  let tagsList = [];
  if (menuItems) {
    tagsList = menuItems.__type.enumValues.map((category, index) => {
      return (
        <Link href={"/topics/" + category.name}>
          <motion.li
            className="text-xl"
            key={index}
            whileHover="hover"
            animate="rest"
            initial="rest"
          >
            <motion.h5
              className="mr-10"
              variants={textMotion}
              style={{ display: "inline-block" }}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </motion.h5>
            <motion.span
              variants={slashMotion}
              style={{
                height: "22px",
                width: "22px",
                display: "inline-block",
                marginTop: "4px",
                backgroundColor: "white",
                borderRadius: "4px"
              }}
            >
              <img
                className="arrow"
                style={{ margin: "0px", marginBottom: "9px" }}
                src="/right-arrow-button.png"
                alt="arrow"
              ></img>
            </motion.span>
          </motion.li>
        </Link>
      );
    });
  }

  return (
    <div className="relative">
      <nav className="flex items-center justify-between flex-wrap p-6 w-full z-10 lg:container m-auto">
        <div className="flex items-center flex-no-shrink mr-6">
          <Link href="/" replace>
            <a className="text-xl">
              <span style={{ backgroundColor: "#B1EDE8" }}>20</span>
              <span className="highlight">SOS</span>
            </a>
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
            <li className="mr-2 mb-10 xl:mb-0">
              <Link href="/start-here">
                <a className="nav-link hover:underline pr-10">Start Here</a>
              </Link>
            </li>
            <li className={"mr-2 mb-10 xl:mb-0 " + styles.dropdown}>
              <Link href="/#topics">
                <a className="nav-link xl:pr-10">Topics</a>
              </Link>
              <ul className={styles.dropdownNav}>{tagsList}</ul>
            </li>
            <li className="mr-2 mb-10 xl:mb-0">
              <Link href="/community">
                <a className="nav-link hover:underline pr-10">Community</a>
              </Link>
            </li>
            <li className={"mr-2 mb-10 xl:mb-0 " + styles.dropdown}>
              <a className="nav-link hover:underline xl:pr-10 xl:border-r-2">
                More
              </a>
              <ul className={styles.dropdownNav}>
                <Link href={"/posts/"}>
                  <li className="pb-1">All Posts</li>
                </Link>
                <Link href={"/about-us/"}>
                  <li className="pb-1">About Us</li>
                </Link>
              </ul>
            </li>
            <li className="mr-2 mb-10 xl:mb-0">
              {user ? (
                <div className="flex">
                  <Link href={"/users/" + user.username}>
                    <a className="nav-link hover:underline">{user.username}</a>
                  </Link>
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
                <div className="flex justify-between">
                  <Link href="/login">
                    <a className="nav-link hover:underline m-auto mr-3 text-sm">
                      Login
                    </a>
                  </Link>
                  <Button
                    size="sm"
                    bg="brand.800"
                    color="white"
                    onClick={() => {
                      router.push("/register");
                    }}
                  >
                    Join
                  </Button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
