import "@/styles/index.css";
import React, { useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import { getUpvotes } from "@/lib/api";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress//Binding events.

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [upvotes, setUpvotes] = useState([]);

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          setUser(null);
          return null;
        }
        const user = await res.json();
        setUser(user);
      });
      async function up() {
        const upvotes = await getUpvotes();
        setUpvotes(upvotes);
      }
      up();
    }
  }, []);

  const customTheme = {
    ...theme,
    fonts: {
      heading: "Armata, sans-serif",
      body: "Armata, sans-serif",
      mono: "Palanquin, monospace",
    },
    colors: {
      ...theme.colors,
      brand: {
        900: "#b1ede8",
        800: "#d81e5b",
        700: "2C2C4A",
      },
    },
  };

  return (
    <AppContext.Provider
      value={{
        user: user,
        upvotes: upvotes,
        isAuthenticated: !!user,
        setUser: setUser,
        setUpvotes: setUpvotes,
      }}
    >
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
