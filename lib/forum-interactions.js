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
        Router.push("/questions");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};
export async function createComment(content, user, question) {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/comments`, {
        content,
        user,
        question,
        headers: {
          Authorization: "Bearer " + Cookie.get("token"),
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
}
export const linkCommentToQuestion = (questionID, commentID, commentList) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/questions/${questionID}`, {
        comments: commentList,
        headers: {
          Authorization: "Bearer " + Cookie.get("token"),
        },
      })
      .then((res) => {
        resolve(res);
        // Router.push("/questions");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};
