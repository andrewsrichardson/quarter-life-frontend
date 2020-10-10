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
import Footer from "@/components/footer";
import Link from "next/link";

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
          <section
            style={{
              borderRight: "4px solid black",
              borderLeft: "4px solid black",
              borderTop: "0px",
            }}
            className="flex flex-col mb-5 pt-5 bg-white p-10 outline"
          >
            <h1 className="text-5xl">Welcome</h1>
            <h2 className="text-3xl">to the {SITE_NAME} forum.</h2>
            <p className="text-md">
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
                <h3>
                  <Link href="/login">
                    <a className="hover:underline">Login to post.</a>
                  </Link>
                </h3>
              )}
            </div>
          </section>
          <div className="min-h-screen">
            <div className="flex justify-center flex-wrap">{postList}</div>
          </div>
        </Container>
        <Footer> </Footer>
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
