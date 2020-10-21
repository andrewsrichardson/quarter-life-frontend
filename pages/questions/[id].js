import { Input, FormControl, FormLabel, Button, Icon } from "@chakra-ui/core";
import { createUpvote, deleteUpvote } from "@/lib/api";
import Container from "@/components/container";
import Layout from "@/components/layout";
import { getQuestionByID } from "@/lib/api";
import Head from "next/head";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import Comment from "../../components/Comment";
import React, { useContext, useState, useEffect } from "react";
import {
  createComment,
  linkCommentToQuestion,
} from "../../lib/forum-interactions";
import Footer from "@/components/footer";
import Link from "next/link";
import PostBody from "@/components/post-body";

export default function ForumPost({ question }) {
  const {
    title,
    user,
    created_at,
    comments,
    content,
    id,
    upvotes,
  } = question[0];

  const [data, updateData] = useState({ content: "" });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(upvotes.length);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);
  const commentIDs = comments.map((element) => {
    return element.id;
  });
  const [upvotedComments, setUpvotedComments] = useState([]);
  const [upvotedQuestions, setUpvotedQuestions] = useState([]);
  const { user: me, setUpvotes: setGlobalUpvotes } = appContext;
  const { username } = user;

  useEffect(() => {
    setUpvotedComments(
      appContext.upvotes.filter((upvote) => {
        return upvote.comment && upvote.comment !== null;
      })
    );
    setUpvotedQuestions(
      appContext.upvotes.filter((upvote) => {
        return upvote.question && upvote.question !== null;
      })
    );
  }, [isUpvoted]);

  useEffect(() => {
    appContext.upvotes.forEach((vote) => {
      if (vote.question != null && vote.question.id == id) {
        setIsUpvoted(true);
      }
    });
  }, [appContext]);

  function toComment(comment, index) {
    let highlight = false;
    upvotedComments.forEach((upvote) => {
      if (upvote.comment != null && comment.id === upvote.comment.id) {
        highlight = true;
      }
    });
    const date = comment.created_at.slice(0, 10);

    return (
      <Comment
        key={index}
        date={date}
        comment={comment}
        highlight={highlight}
        me={me}
        upvotedComments={appContext.upvotes}
        setUpvotedComments={appContext.setUpvotes}
      ></Comment>
    );
  }
  const commentsList = comments.map(toComment);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }
  const date = created_at.slice(0, 10);

  function handleUpvote() {
    if (!me) {
      Router.push("/register");
    }
    setIsLoading(true);
    if (isUpvoted) {
      const deleteID = upvotedQuestions.find((ele) => ele.question.id == id);
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
      createUpvote(null, null, id.toString())
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
    <>
      <Layout>
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
          {" "}
          <div
            className="bg-white p-5"
            style={{ border: "4px solid black", borderTop: "0px" }}
          >
            <div className="flex justify-start">
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
              <h1 className="text-4xl">{title}</h1>
            </div>

            <PostBody content={content} />
            <h3 className="text-sm">{"by " + username}</h3>
            <h3 className="text-sm">
              {comments.length.toString() +
                " comment" +
                (comments.length == 1 ? "" : "s")}
            </h3>
            <p className="text-sm text-right">{date}</p>
          </div>
          {appContext.isAuthenticated ? (
            <div
              style={{ border: "4px solid black", borderTop: "0px" }}
              className="m-5 mt-0 p-5 bg-white"
            >
              <FormControl>
                <FormLabel htmlFor="email">Add comment</FormLabel>
                <Input
                  onChange={(event) => onChange(event)}
                  name="content"
                  className="mb-1"
                  type="text"
                  id="content"
                  size="sm"
                  focusBorderColor="brand.900"
                />
              </FormControl>
              <Button
                bg="brand.800"
                color="white"
                size="xs"
                onClick={() => {
                  setLoading(true);
                  createComment(data.content, appContext.user, id)
                    .then((res) => {
                      console.log(res);
                      commentIDs.push(res.data.id.toString());
                      linkCommentToQuestion(id, res.data.id, commentIDs).then(
                        (res) => {
                          router.reload();
                          setLoading(false);
                        }
                      );
                    })

                    .catch(() => {
                      setLoading(false);
                    });
                }}
              >
                {loading ? "Loading... " : "Submit"}
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <p className="hover:underline">Login to comment</p>
            </Link>
          )}
          <div className="min-h-screen">{commentsList}</div>
        </Container>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const question = (await getQuestionByID(id)) || [];
  return {
    props: { question },
  };
}
