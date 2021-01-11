import { createUpvote, deleteUpvote } from "@/lib/api";
import { Badge, Icon } from "@chakra-ui/core";
import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import styles from "./forumpost.module.css";
import TimeAgo from "timeago-react";
import { parseTopic } from "@/lib/util";

export default function ForumPost(props) {
  const {
    title,
    id,
    user,
    created_at,
    comments,
    upvotes,
    category
  } = props.props;
  const { username } = user;
  let { me, upvotedQuestions, setUpvotedQuestions } = props;

  const [isUpvoted, setIsUpvoted] = useState(props.highlight);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(upvotes.length);

  useEffect(() => {
    setIsUpvoted(props.highlight);
  }, [props.highlight]);

  function handleUpvote() {
    if (!me) {
      Router.push("/register");
    } else {
      setIsLoading(true);
      if (isUpvoted) {
        const deleteID = upvotedQuestions.find(
          ele => ele.question && ele.question.id == id
        );
        setNumber(number - 1);
        deleteUpvote(deleteID.id)
          .then(res => {
            setUpvotedQuestions(
              upvotedQuestions.filter(ele => ele.id !== deleteID.id)
            );
            setIsUpvoted(false);
            setIsLoading(false);
          })
          .catch(err => console.log(err));
      } else {
        setNumber(number + 1);
        createUpvote(null, null, id.toString())
          .then(res => {
            setUpvotedQuestions([...upvotedQuestions, res.data]);
            setIsUpvoted(!isUpvoted);
            setIsLoading(false);
          })
          .catch(err => console.log(err));
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className="m-auto mr-3">
        <Icon
          name="chevron-up"
          size="1.5rem"
          focusable={true}
          role="button"
          className="pointer"
          color={isUpvoted ? "#D81E5B" : ""}
          onClick={isLoading ? null : handleUpvote}
        />
        <h1 className="text-lg text-center">{number}</h1>
      </div>
      <div style={{ width: "100%" }}>
        <Link href={"/community/" + id}>
          <h1 className={`text-md`}>
            {" "}
            <a className={`${styles.title} cursor-pointer`}>{title}</a>
          </h1>
        </Link>
        <div className="flex">
          <Link href={"/users/" + username}>
            <h3 className="text-xs text-gray-600 mr-8 hover:underline cursor-pointer">
              {"by " + username}
            </h3>
          </Link>
          {user.isAdmin ? (
            <Badge fontSize="0.7rem" variant="outline" variantColor="blue">
              Admin
            </Badge>
          ) : null}
          <h3 className="text-xs text-gray-600 justify-self-start mr-8">
            {comments.length.toString() +
              " comment" +
              (comments.length == 1 ? "" : "s")}
          </h3>
          <h3 className="text-xs text-gray-600 mr-8 italic">
            {"in " + parseTopic(category)}
          </h3>

          <p className="text-xs text-gray-600 text-right ml-auto">
            <TimeAgo datetime={created_at} />
          </p>
        </div>
      </div>
    </div>
  );
}
