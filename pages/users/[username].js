import { Button } from "@chakra-ui/core";
import Container from "@/components/container";
import ForumPost from "@/components/forumPost";
import Layout from "@/components/layout";
import { getUserData } from "@/lib/api";
import AppContext from "../../context/AppContext";
import Head from "next/head";
import { SITE_NAME } from "../../lib/constants";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import Link from "next/link";
import TimeAgo from "timeago-react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";

export default function Questions({ user }) {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [upvotedQuestions, setUpvotedQuestions] = useState([]);

  useEffect(() => {
    setUpvotedQuestions(
      appContext.upvotes.filter((upvote) => {
        return upvote.question && upvote.question != null;
      })
    );
  }, [appContext]);

  const { userLoggedIn } = appContext;

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
        me={userLoggedIn}
        upvotedQuestions={appContext.upvotes}
        setUpvotedQuestions={appContext.setUpvotes}
      ></ForumPost>
    );
  }

  const usernameWithAt = "@" + user.users[0].username;

  let postList = user.questions.map(toPost);

  if (postList.length == 0)
    postList = `${usernameWithAt} has not asked any questions yet 😞.`;

  function toComment(comment) {
    return (
      <div className="border-2 flex justify-start p-2 mb-2 bg-white">
        <div className="flex flex-col justify-between">
          <h3>{comment.comments[0].content}</h3>
          <div className="flex justify-between">
            <p className="italic text-xs text-gray-500">
              on{" "}
              <Link as={"/community/" + comment.id} href={"/community/[id]"}>
                <a className="pl-3 hover:underline">{comment.title}</a>
              </Link>
            </p>
            <p className="text-xs ml-auto text-gray-700">
              <TimeAgo datetime={comment.comments[0].created_at} />
            </p>
          </div>
        </div>
      </div>
    );
  }

  let commentList = user.Comments.map(toComment);

  if (commentList.length == 0)
    commentList = `${usernameWithAt} hasn't yet commented on anything 😞.`;
  if (commentList.length == 0 && postList.length == 0)
    commentList = `${usernameWithAt} hasn't yet commented on anything either! Give them a nudge to wake them up! 👋`;

  return (
    <>
      <Layout>
        <Head>
          <title>
            {usernameWithAt} | {SITE_NAME}
          </title>
        </Head>
        <Container>
          <div
            style={{ border: "4px solid black", borderTop: "0px" }}
            className="p-10 bg-white h-96 mb-10"
          >
            <h1 className="text-5xl">{usernameWithAt}</h1>
            <h2 className="italic">
              joined <TimeAgo datetime={user.users[0].created_at} />
            </h2>
          </div>
          <div
            style={{ border: "4px solid black", borderBottom: "0px" }}
            className="bg-white p-5"
          >
            <Tabs isFitted variant="enclosed">
              <TabList>
                <Tab
                  _focus={{
                    color: "black",
                    boxShadow: "0 0 0 3px rgb(177, 237, 232)",
                  }}
                  color="black"
                >
                  Questions
                </Tab>
                <Tab
                  _focus={{
                    color: "black",
                    boxShadow: "0 0 0 3px rgb(177, 237, 232)",
                  }}
                >
                  Comments
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div style={{ minHeight: "400px" }} className="pt-5">
                    {postList}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div style={{ minHeight: "400px" }} className="pt-5">
                    {commentList}
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </Container>
        <Footer />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { username } = params;
  const user = (await getUserData(username)) || [];
  return {
    props: { user },
  };
}
