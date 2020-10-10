import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../../../context/AppContext";
import Cookie from "js-cookie";

const backendUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export default function LoginRedirect(props) {
  const [text, setText] = useState("Loading...");
  const router = useRouter();
  const appContext = useContext(AppContext);

  //query.id == callback
  //query.provider == "google"

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    if (router.query.id) {
      const query = router.asPath
        .replace("auth/google/callback", "")
        .replace("auth/facebook/callback", "");
      fetch(`${backendUrl}/auth/${router.query.provider}/callback${query}`)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
          }
          return res;
        })
        .then((res) => res.json())
        .then((res) => {
          // Successfully logged with Strapi
          // Now saving the jwt to use it for future authenticated requests to Strapi
          Cookie.set("token", res.jwt);
          appContext.setUser(res.user);
          setText(
            "You have been successfully logged in. You will be redirected in a few seconds..."
          );
          setTimeout(() => router.push("/"), 2000); // Redirect to homepage after 2 sec
        })
        .catch((err) => {
          console.log(err);
          setText("An error occurred, please see the developer console.");
        });
    }
  }, [router.query.provider, router.query.id_token]);

  return <p>{text}</p>;
}
