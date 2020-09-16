import { Button } from "@chakra-ui/core";
import Container from "@/components/container";
import ForumPost from "@/components/forumPost";
import Layout from "@/components/layout";
import { getAllQuestionsForForum } from "@/lib/api";
import Head from "next/head";
import { SITE_NAME } from "../lib/constants";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";

export default function Questions({ allQuestions }) {
  const appContext = useContext(AppContext);
  const router = useRouter();

  function toPost(question, index) {
    return <ForumPost key={index} props={question}></ForumPost>;
  }

  const postList = allQuestions.map(toPost);
  return (
    <>
      <Layout>
        <Head>
          <title>Talk</title>
        </Head>
        <Container>
          {" "}
          <section className="flex flex-col mb-5">
            <h1 className="text-4xl">Welcome</h1>
            <h2 className="">to the {SITE_NAME} forum.</h2>
            <p className="text-sm">
              Feel free to chat about anyting relating to life worries.
            </p>
            <div className="self-end">
              {appContext.isAuthenticated ? (
                <Button
                  size="sm"
                  variantColor="yellow"
                  onClick={() => {
                    router.push("/questions/create");
                  }}
                >
                  Create Post
                </Button>
              ) : (
                <h3>Login to post</h3>
              )}
            </div>
          </section>
          <div className="flex justify-center flex-wrap">{postList}</div>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const allQuestions = (await getAllQuestionsForForum()) || [];
  return {
    props: { allQuestions },
  };
}
