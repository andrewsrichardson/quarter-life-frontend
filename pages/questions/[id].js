import { Input, FormControl, FormLabel, Button } from "@chakra-ui/core";

import Container from "@/components/container";
import Layout from "@/components/layout";
import { getQuestionByID } from "@/lib/api";
import Head from "next/head";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import CommentsList from "../../components/CommentList";
import React, { useContext, useState } from "react";
import {
  createComment,
  linkCommentToQuestion,
} from "../../lib/forum-interactions";
import Footer from "@/components/footer";
import Link from "next/link";

export default function ForumPost({ question }) {
  const { title, user, created_at, comments, content, id } = question[0];

  const [data, updateData] = useState({ content: "" });
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);
  const commentIDs = comments.map((element) => {
    return element.id;
  });

  const { username } = user;
  const date = created_at.slice(0, 10);
  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
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
            <h1 className="text-4xl">{title}</h1>
            <h2 className="text-xl m-10">{content}</h2>
            <h3 className="text-sm">{"by " + username}</h3>
            <h3 className="text-sm">
              {comments.length.toString() +
                " comment" +
                (comments.length == 1 ? "" : "s")}
            </h3>
            <p className="text-sm text-right">{date}</p>
          </div>
          {appContext.isAuthenticated ? (
            <div className="m-5">
              <FormControl>
                <FormLabel htmlFor="email">Add comment</FormLabel>
                <Input
                  onChange={(event) => onChange(event)}
                  name="content"
                  className="mb-5"
                  type="text"
                  id="content"
                  size="sm"
                  focusBorderColor="brand.900"
                />
              </FormControl>
              <Button
                variantColor="yellow"
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
          <div className="min-h-screen">
            <CommentsList comments={comments}></CommentsList>
          </div>
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
