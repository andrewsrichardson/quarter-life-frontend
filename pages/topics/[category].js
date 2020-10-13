import Layout from "@/components/layout";
import {
  getTopicByCategory,
  getCategories,
  getAllQuestionsForForum,
} from "@/lib/api";
import Head from "next/head";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import CommentsList from "../../components/CommentList";
import React, { useEffect, useState } from "react";
import {
  createComment,
  linkCommentToQuestion,
} from "../../lib/forum-interactions";
import Footer from "@/components/footer";
import ForumPost from "@/components/forumPost";
import Link from "next/link";
import markdownToHtml from "@/lib/markdownToHtml";
import styles from "./category.module.css";
import markdownStyles from "../../components/markdown-styles.module.css";
import { Spinner } from "@chakra-ui/core";

export default function Category({ topic, content }) {
  function toPost(question, index) {
    return <ForumPost key={index} props={question}></ForumPost>;
  }
  const [questionsList, setQuestionsList] = useState(null);

  useEffect(() => {
    async function getPosts() {
      const forumPosts = (await getAllQuestionsForForum()) || [];
      setQuestionsList(forumPosts.map(toPost));
    }
    getPosts();
  }, []);

  const title = topic
    ? topic.topics[0].category.charAt(0).toUpperCase() +
      topic.topics[0].category.slice(1)
    : "Topic";

  function BlogPosts() {
    if (topic.posts[0]) {
      const postList = topic.posts.map((post, index) => {
        return (
          <Link
            className={styles.blogLink}
            key={index}
            href={"/posts/" + post.slug}
          >
            <div
              className={
                styles.blogLink + " flex max-h-14 justify-between  pl-2 pr-2"
              }
            >
              <h1
                style={{ wordWrap: "break-word", maxWidth: "80%" }}
                className="mt-auto mb-auto"
              >
                {index + 1 + ". " + post.title}
              </h1>
              <img
                src={`${
                  post.coverImage.url.startsWith("/")
                    ? process.env.NEXT_PUBLIC_STRAPI_API_URL
                    : ""
                }${post.coverImage.url}`}
                className="w-16 h-19"
              />
            </div>
          </Link>
        );
      });
      return postList;
    } else return [];
  }

  function BookReviews() {
    if (topic.bookReviews) {
      const postList = topic.bookReviews.map((post, index) => {
        return (
          <Link
            className={styles.blogLink}
            key={index}
            href={"/posts/" + post.slug}
          >
            <div
              className={
                styles.blogLink + " flex max-h-14 justify-between pl-2 pr-2"
              }
            >
              <h1
                style={{ wordWrap: "break-word" }}
                className="mt-auto mb-auto"
              >
                {index + 1 + ". " + post.title}
              </h1>
              <img
                src={`${
                  post.coverImage.url.startsWith("/")
                    ? process.env.NEXT_PUBLIC_STRAPI_API_URL
                    : ""
                }${post.coverImage.url}`}
                className="w-16 h-19"
              />
            </div>
          </Link>
        );
      });
      return postList;
    } else return [];
  }
  return (
    <>
      <Layout>
        <Head>
          <title>{title + " | 20sos"}</title>
        </Head>
        <div
          style={{ backgroundColor: "#b1ede8", maxHeight: "max-content" }}
          className="flex p-10 flex-col xl:flex-row"
        >
          <section className={"bg-white p-10 m-auto " + styles.content}>
            <h1 className="text-5xl pb-2">
              <span className="highlight">{title}</span>
            </h1>
            <div
              className={markdownStyles["markdown"]}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </section>
          <div
            className={
              "flex flex-wrap flex-col xl:flex-row mr-auto justify-between content-between " +
              styles.siteLinksContainer
            }
          >
            <div className={"outline bg-white " + styles.siteLinksCard}>
              <h2 className="text-2xl text-center">Posts</h2>
              <BlogPosts />
            </div>
            <div className={"outline bg-white " + styles.siteLinksCard}>
              <h2 className="text-2xl text-center">Reccomended Reading</h2>
              <BookReviews />
            </div>
            <div
              className={"outline bg-white " + styles.siteLinksCard}
              style={{ minHeight: "45%", minWidth: "100%" }}
            >
              <div
                style={{
                  borderLeft: "4px solid black",
                  borderRight: "4px solid black",
                  overflow: "auto",
                }}
                className="flex justify-between p-2"
              >
                <h1>What's the community saying?</h1>
                <h2 className="highlight">Join</h2>
              </div>
              {questionsList ? (
                questionsList
              ) : (
                <Spinner size="md" className="m-auto" />
              )}
            </div>
          </div>
        </div>
        <Footer></Footer>
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
