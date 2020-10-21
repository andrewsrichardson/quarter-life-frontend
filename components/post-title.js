import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@chakra-ui/core";
import AppContext from "../context/AppContext";
import { createUpvote, deleteUpvote } from "@/lib/api";

export default function PostTitle(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(props.upvotes.length);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const appContext = useContext(AppContext);
  const {
    user: me,
    upvotes: upvotedQuestions,
    setUpvotes: setUpvotedQuestions,
  } = appContext;
  useEffect(() => {
    appContext.upvotes.forEach((vote) => {
      if (vote.question != null && vote.question.id == props.id) {
        setIsUpvoted(true);
      }
    });
  }, [appContext]);

  function handleUpvote() {
    if (!me) {
      Router.push("/register");
    }
    setIsLoading(true);
    if (isUpvoted) {
      const deleteID = upvotedQuestions.find(
        (ele) => ele.question.id == props.id
      );
      setNumber(number - 1);
      deleteUpvote(deleteID.id)
        .then((res) => {
          setUpvotedQuestions(
            upvotedQuestions.filter((ele) => ele.id !== deleteID.id)
          );
          setGlobalUpvotes(
            upvotedQuestions.filter((ele) => ele.id !== deleteID.id)
          );
          setIsUpvoted(false);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setNumber(number + 1);
      createUpvote(null, null, props.id.toString())
        .then((res) => {
          setUpvotedQuestions([...upvotedQuestions, res.data]);
          setGlobalUpvotes([...upvotedQuestions, res.data]);
          setIsUpvoted(!isUpvoted);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className="flex">
      {/* <div className="m-auto mr-5 ml-5">
        <Icon
          name="chevron-up"
          size="2rem"
          focusable={true}
          role="button"
          className="pointer"
          color={isUpvoted ? "#D81E5B" : ""}
          onClick={isLoading ? null : handleUpvote}
        />
        <h1 className="text-2xl text-center">{number}</h1>
      </div> */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 pt-12 text-center md:text-left">
        {props.children}
      </h1>
    </div>
  );
}
