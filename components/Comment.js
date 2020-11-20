import React, { useState, useEffect } from "react";
import { createUpvote, deleteUpvote } from "@/lib/api";
import { Badge, Icon } from "@chakra-ui/core";
import Router from "next/router";
import TimeAgo from "timeago-react";

export default function Comment({
  comment,
  upvotedComments,
  setUpvotedComments,
  highlight,
  date,
  me,
}) {
  const [number, setNumber] = useState(comment.upvotes.length);
  const [isUpvoted, setIsUpvoted] = useState(highlight);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsUpvoted(highlight);
  }, [highlight]);

  function handleUpvote() {
    if (!me) {
      Router.push("/register");
    }
    setIsLoading(true);
    if (isUpvoted) {
      const deleteID = upvotedComments.find(
        (ele) => ele.comment != null && ele.comment.id == comment.id
      );
      setNumber(number - 1);
      deleteUpvote(deleteID.id)
        .then((res) => {
          setUpvotedComments(
            upvotedComments.filter((ele) => ele.id !== deleteID.id)
          );
          setIsUpvoted(false);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setNumber(number + 1);
      createUpvote(comment.id, null, null)
        .then((res) => {
          setUpvotedComments([...upvotedComments, res.data]);
          setIsUpvoted(!isUpvoted);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="border-2 flex justify-start p-2 bg-white">
      <div className="m-auto mr-3 ml-0">
        <Icon
          name="chevron-up"
          size="1.5rem"
          focusable={true}
          role="button"
          className="pointer"
          color={isUpvoted ? "#D81E5B" : ""}
          onClick={isLoading ? null : handleUpvote}
        />
        <h1 className="text-xl text-center">{number}</h1>
      </div>
      <div className="flex flex-col justify-between">
        <h3>{comment.content}</h3>
        <div className="flex">
          <h3 className="text-xs pr-3">{comment.user.username}</h3>
          {comment.user.isAdmin ? (
            <Badge fontSize="0.7rem" variant="outline" variantColor="blue">
              Admin
            </Badge>
          ) : null}
        </div>
        <p className="text-xs ml-auto text-gray-700">
          <TimeAgo datetime={date} />
        </p>
      </div>
    </div>
  );
}
