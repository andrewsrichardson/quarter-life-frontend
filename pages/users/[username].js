import { Button } from "@chakra-ui/core";
import Container from "@/components/container";
import ForumPost from "@/components/forumPost";
import Layout from "@/components/layout";
import {
  getCategories,
  getQuestionsByCategory,
  getUser,
  getUserData,
} from "@/lib/api";
import Head from "next/head";
import { SITE_NAME } from "../../lib/constants";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Questions({ user }) {
  //   const appContext = useContext(AppContext);
  //   const router = useRouter();

  //   const { user } = appContext;

  console.log(user);

  return (
    <>
      <Layout>
        <Head>
          <title>| {SITE_NAME}</title>
        </Head>
        <Container></Container>
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
