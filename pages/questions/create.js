import Container from "@/components/container";
import Link from "next/link";
import Layout from "@/components/layout";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Input, FormControl, FormLabel, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { createQuestion } from "../../lib/forum-interactions";

export default function Create() {
  const [data, updateData] = useState({
    title: "",
    content: "",
  });
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
        <Container>
          {appContext.isAuthenticated ? (
            <div>
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                Object.entries(error).map((error, index) => {
                  return (
                    <div key={index} style={{ marginBottom: 10 }}>
                      <small style={{ color: "red" }}>{error[1][0]}</small>
                    </div>
                  );
                })}
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  onChange={(event) => onChange(event)}
                  name="title"
                  type="title"
                  id="title"
                  size="lg"
                  focusBorderColor="brand.900"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Input
                  onChange={(event) => onChange(event)}
                  name="content"
                  type="text"
                  id="content"
                  focusBorderColor="brand.900"
                  size="lg"
                  styles={{ marginBottom: "1rem" }}
                />
              </FormControl>
              <Button
                onClick={() => {
                  setLoading(true);
                  createQuestion(data.title, data.content, appContext.user)
                    .then(() => {
                      setLoading(false);
                    })
                    .catch((error) => {
                      setError(error.response.data.data.errors);
                      setLoading(false);
                    })
                    .then(() => {
                      router.push("/questions");
                    });
                }}
              >
                {loading ? "Loading... " : "Submit"}
              </Button>
            </div>
          ) : (
            <div className="flex">
              <h1 className="text-3xl">
                Please
                <Link href="/login">
                  <a className="nav-link hover:underline">Login</a>
                </Link>
              </h1>
            </div>
          )}
        </Container>
      </Layout>
    </>
  );
}
