import Layout from "@/components/layout";
import {
  getTopicByCategory,
  getCategories,
  getQuestionsByCategory,
} from "@/lib/api";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Footer from "@/components/footer";
import ForumPost from "@/components/forumPost";
import markdownToHtml from "@/lib/markdownToHtml";
import styles from "./category.module.css";
import markdownStyles from "../../components/markdown-styles.module.css";
import { Button, Spinner } from "@chakra-ui/core";
import AppContext from "context/AppContext";
import MoreStories from "@/components/more-stories";
import { SITE_NAME } from "@/lib/constants";
import HeroPost from "@/components/hero-post";
export default function Category({ topic, content }) {
  const [questionsList, setQuestionsList] = useState(null);
  const appContext = useContext(AppContext);
  const [upvotedQuestions, setUpvotedQuestions] = useState([]);

  const { user } = appContext;

  function toPost(question, index) {
    let highlight = false;
    upvotedQuestions.forEach((upvote) => {
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

  useEffect(() => {
    async function getPosts() {
      const forumPosts =
        (await getQuestionsByCategory(topic.topics[0].category)) || [];
      setQuestionsList(forumPosts.map(toPost));
    }
    getPosts();
  }, [upvotedQuestions]);

  useEffect(() => {
    setUpvotedQuestions(
      appContext.upvotes.filter((upvote) => {
        return upvote.question && upvote.question != null;
      })
    );
    return () => {};
  }, [appContext]);

  const title = topic
    ? topic.topics[0].category.charAt(0).toUpperCase() +
      topic.topics[0].category.slice(1)
    : "Topic";

  const heroPost =
    topic.posts.filter((post) => post.featured == true)[0] || topic.posts[0];
  return (
    <>
      <Layout>
        <Head>
          <title>{title + " | " + SITE_NAME}</title>
        </Head>
        <div
          style={{
            backgroundColor: "#b1ede8",
            maxHeight: "max-content",
            marginBottom: "2rem",
            borderBottom: "4px solid black",
          }}
          className="flex p-10 flex-col xl:flex-row justify-around"
        >
          <section className="pr-2">
            <HeroPost props={heroPost} />
          </section>
          <div
            className={
              "flex flex-wrap flex-col xl:flex-row content-between " +
              styles.siteLinksContainer
            }
          >
            <div
              className={"outline bg-white " + styles.siteLinksCard}
              style={{ minHeight: "100%", minWidth: "100%" }}
            >
              <div
                style={{
                  borderLeft: "4px solid black",
                  borderRight: "4px solid black",
                }}
                className="flex justify-between p-2"
              >
                <h1 className="text-xl">What's the community saying?</h1>
                <Button
                  size="sm"
                  bg="brand.800"
                  color="white"
                  onClick={() => {
                    router.push("/community/create");
                  }}
                >
                  Join
                </Button>
              </div>
              {questionsList ? (
                <div style={{ overflowY: "scroll" }}>{questionsList}</div>
              ) : (
                <div className="m-auto">
                  <Spinner size="md" />
                </div>
              )}
            </div>
          </div>
        </div>
        {topic ? (
          topic.posts ? (
            <div style={{ maxWidth: "1800px", margin: "auto" }}>
              <MoreStories posts={topic.posts} label={""} />
            </div>
          ) : null
        ) : null}

        <Footer />
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { category } = params;
  const topic = (await getTopicByCategory(category)) || [];
  const content = await markdownToHtml(topic?.topics[0]?.content || "");

  return {
    props: { topic, content },
  };
}
export async function getStaticPaths() {
  const allTopics = await getCategories();
  return {
    paths:
      allTopics.__type.enumValues?.map((topic) => `/topics/${topic.name}`) ||
      [],
    fallback: true,
  };
}
