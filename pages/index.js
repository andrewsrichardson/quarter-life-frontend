import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import styles from "./index.module.css";
import Footer from "@/components/footer";
import MoreStories from "@/components/more-stories";
import { getAllPostsForHome } from "lib/api";
import { motion } from "framer-motion";
import Cookie from "js-cookie";
import { Button } from "@chakra-ui/core";
import ForumPost from "@/components/forumPost";
import Layout from "@/components/layout";
import { getAllQuestionsForForum, getCategories } from "@/lib/api";
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Container from "@/components/container";
import Topics from "@/components/topics";

export default function Index({ allPosts, preview }) {
  const [accepted, setAccepted] = useState(Cookie.get("accept"));
  const [isIntroClosed, setIsIntroClosed] = useState(true);
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [upvotedQuestions, setUpvotedQuestions] = useState([]);
  const [allQuestions, setQuestions] = useState([]);

  useEffect(() => {
    setUpvotedQuestions(
      appContext.upvotes.filter(upvote => {
        return upvote.question && upvote.question != null;
      })
    );
  }, [appContext]);
  useEffect(() => {
    const getQuestions = async () => (await getAllQuestionsForForum()) || [];
    getQuestions().then(q => setQuestions(q));
  }, []);

  const { user } = appContext;

  function toPost(question, index) {
    if (question == undefined) return;
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

  let postList = allQuestions.map(toPost);

  function AnimatedIntro(props) {
    let intro = [];
    for (let i = 0; i < props.columns; i++) {
      intro.push(
        <motion.h2
          style={{ marginTop: "0px" }}
          key={i}
          animate={{ y: 30 }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {SITE_NAME} . {SITE_NAME} . {SITE_NAME} .{" "}
        </motion.h2>
      );
    }
    return intro;
  }
  useEffect(() => {
    return () => {
      if (!accepted) {
        Cookie.set("accept", true);
      }
      if (!isIntroClosed) {
        Cookie.set("intro", true);
      }
    };
  }, []);

  function CookieBanner() {
    if (!accepted) {
      return (
        <div className={styles.cookie}>
          <h3>This site uses Cookies to help improve your experience!</h3>
          <div className="flex">
            <Link href="/privacy-policy">
              <a className="hover:underline text-xs italic text-gray-600">
                Learn More
              </a>
            </Link>
            <Button
              size="md"
              variantColor="yellow"
              className="ml-2"
              onClick={() => {
                Cookie.set("accept", true);
                setAccepted(true);
              }}
            >
              Okay
            </Button>
          </div>
        </div>
      );
    } else return null;
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
        <div className={styles.wrapper}>
          <section style={{ height: "200px" }} className={styles.intro}>
            <div className={styles.horizontaltext}>
              <AnimatedIntro columns={5}></AnimatedIntro>
            </div>
          </section>
          <div>
            <CookieBanner />
          </div>
          <MoreStories label={"Recent Posts"} posts={allPosts}></MoreStories>
          <Container>
            <div className="flex flex-wrap pt-10">
              <div className="flex-grow pb-10">
                <section
                  style={{
                    border: "4px solid black"
                  }}
                  className="flex flex-col bg-white p-5 mb-5 outline"
                >
                  <div className="flex justify-between align-middle">
                    <h1 className="text-2xl">Community</h1>
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
                  <p className="text-md">
                    We're helping each other figure out what's going on in our
                    lives.
                  </p>
                </section>
                <div
                  style={{
                    borderTop: "4px solid black",
                    borderBottom: "4px solid black"
                  }}
                >
                  <div className="flex justify-center flex-wrap flex-2">
                    {postList}
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <div className="pb-10">
            <Container>
              <Topics />
            </Container>
          </div>
        </div>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = null }) {
  const allPosts = (await getAllPostsForHome(preview)) || [];
  return {
    props: { allPosts, preview }
  };
}
