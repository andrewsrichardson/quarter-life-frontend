import { Button } from "@chakra-ui/core";
import Container from "@/components/container";
import ForumPost from "@/components/forumPost";
import Layout from "@/components/layout";
import { getAllQuestionsForForum, getCategories } from "@/lib/api";
import Head from "next/head";
import { SITE_NAME } from "../lib/constants";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Questions({ allQuestions, categories }) {
  const appContext = useContext(AppContext);
  const router = useRouter();

  function toPost(question, index) {
    return <ForumPost key={index} props={question}></ForumPost>;
  }

  const postList = allQuestions.map(toPost);
  const tagsList = categories.__type.enumValues.map((category, index) => {
    return (
      <p className="pb-1" key={index}>
        {"#" + category.name.charAt(0).toUpperCase() + category.name.slice(1)}
      </p>
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
            <div className="flex-grow">
              <section
                style={{
                  borderRight: "4px solid black",
                  borderLeft: "4px solid black",
                  borderTop: "0px",
                }}
                className="flex flex-col mb-5 pt-5 bg-white p-10 outline"
              >
                <h1 className="text-5xl">Welcome</h1>
                <p className="text-md">
                  We're helping each other figure out what's going on in our
                  lives.
                </p>
                <div className="self-end">
                  {appContext.isAuthenticated ? (
                    <Button
                      size="sm"
                      bg="brand.800"
                      color="white"
                      onClick={() => {
                        router.push("/questions/create");
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
              </section>
              <div className="min-h-screen">
                <div className="flex justify-center flex-wrap flex-2">
                  {postList}
                </div>
              </div>
            </div>
            <div
              style={{ height: "max-content" }}
              className="max-w-7xl m-10  p-10 bg-white outline"
            >
              <h2 className="text-2xl pb-2">Categories</h2>
              {tagsList}
            </div>
          </div>
        </Container>
        <Footer> </Footer>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const allQuestions = (await getAllQuestionsForForum()) || [];
  const categories = (await getCategories()) || [];
  return {
    props: { allQuestions, categories },
  };
}
