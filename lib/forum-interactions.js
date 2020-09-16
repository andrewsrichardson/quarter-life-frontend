import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const createQuestion = (title, content, user) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/questions`, {
        title,
        content,
        user,
        headers: {
          Authorization: "Bearer " + Cookie.get("token"),
        },
      })
      .then((res) => {
        resolve(res);
        Router.push("/forum");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};
