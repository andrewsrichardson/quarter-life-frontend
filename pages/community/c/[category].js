import { Button } from "@chakra-ui/core";
import Container from "@/components/container";
import ForumPost from "@/components/forumPost";
import Layout from "@/components/layout";
import { getCategories, getQuestionsByCategory } from "@/lib/api";
import Head from "next/head";
import { SITE_NAME } from "../../../lib/constants";
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../../context/AppContext";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Questions({ allQuestions, categories, category }) {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [upvotedQuestions, setUpvotedQuestions] = useState([]);

  useEffect(() => {
    setUpvotedQuestions(
      appContext.upvotes.filter(upvote => {
        return upvote.question && upvote.question != null;
      })
    );
  }, [appContext]);

  const { user } = appContext;

  function toPost(question, index) {
    let highlight = false;
    upvotedQuestions.forEach(upvote => {
      if (question.id == upvote.question.id) {
        highlight = true;
      }
    });

    return (
      <ForumPost
        key={index}
        props={question}
        highlight={highlight}
        me={user}
        upvotedQuestions={appContext.upvotes}
        setUpvotedQuestions={appContext.setUpvotes}
      ></ForumPost>
    );
  }
  let postList = [];
  try {
    postList = allQuestions.map(toPost);
  } catch {
    console.log("no posts");
  }

  const tagsList = categories.__type.enumValues.map((category, index) => {
    return (
      <Link href={"/community/c/" + category.name}>
        <p className="pb-1 hover:underline cursor-pointer" key={index}>
          {"#" + category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </p>
      </Link>
    );
  });

  return (
    <>
      <Layout>
        <Head>
          <title>Talk | {SITE_NAME}</title>
        </Head>
        <Container>
          {" "}
          <div className="flex flex-wrap">
            <div style={{ maxWidth: "75%" }} className="flex-grow">
              <section
                style={{
                  borderRight: "4px solid black",
                  borderLeft: "4px solid black",
                  borderTop: "0px"
                }}
                className="flex flex-col mb-5 pt-5 bg-white p-5 outline"
              >
                <div className="flex justify-between align-middle">
                  <h1 className="text-3xl">{category}</h1>
                  <div className="self-end">
                    {appContext.isAuthenticated ? (
                      <Button
                        size="sm"
                        bg="brand.800"
                        color="white"
                        onClick={() => {
                          router.push("/community/create");
                        }}
                      >
                        Create Post
                      </Button>
                    ) : (
                      <h3 className="highlight text-xl">
                        <Link href="/login">
                          <a className="hover:underline">Login to post.</a>
                        </Link>
                      </h3>
                    )}
                  </div>
                </div>
              </section>
              <div className="min-h-screen">
                <div className="flex justify-center flex-wrap flex-2">
                  {postList}
                </div>
              </div>
            </div>
            <div style={{ maxWidth: "25%" }} className="min-h-screen">
              <div
                style={{ height: "max-content" }}
                className="max-w-7xl m-10  p-10 bg-white outline"
              >
                <h2 className="text-2xl pb-2">Categories</h2>
                {tagsList}
              </div>
              <div className="max-w-7xl m-10 p-10 outline">
                <a
                  className="italic cursor-pointer text-sm"
                  href="mailto:contact@20sos.co.uk"
                >
                  Your sponsorship here
                </a>
              </div>
            </div>
          </div>
        </Container>
        <Footer> </Footer>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { category } = params;
  const allQuestions = (await getQuestionsByCategory(category)) || [];
  const categories = (await getCategories()) || [];
  return {
    props: { allQuestions, categories, category }
  };
}
