import Container from "@/components/container";
import Link from "next/link";
import Layout from "@/components/layout";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import React, { useContext, useState } from "react";
import { getCategories } from "@/lib/api";
import AppContext from "../../context/AppContext";
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
  Textarea,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { createQuestion } from "../../lib/forum-interactions";
import Footer from "@/components/footer";

export default function Create({ categories }) {
  const [data, updateData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }
  const tagsList = categories.__type.enumValues.map((category, index) => {
    return (
      <option key={index} value={category.name}>
        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
      </option>
    );
  });
  return (
    <>
      <Layout>
        <Head>
          <title>{"Create Post | " + SITE_NAME}</title>
        </Head>
        <Container>
          {appContext.isAuthenticated ? (
            <div className="flex">
              <div className="min-h-screen p-10 bg-white flex-grow">
                <h1 className="text-3xl">Create a post</h1>
                {Object.entries(error).length !== 0 &&
                  error.constructor === Object &&
                  Object.entries(error).map((error, index) => {
                    return (
                      <div key={index} style={{ marginBottom: 10 }}>
                        <small style={{ color: "red" }}>{error[1][0]}</small>
                      </div>
                    );
                  })}
                <FormControl className="pb-5">
                  <FormLabel className="text-2xl" htmlFor="title">
                    Title
                  </FormLabel>
                  <Input
                    onChange={(event) => onChange(event)}
                    name="title"
                    type="title"
                    id="title"
                    size="md"
                    focusBorderColor="brand.900"
                  />
                </FormControl>
                <FormLabel className="text-2xl" htmlFor="category">
                  Category
                </FormLabel>
                <div className="pb-5">
                  <Select
                    placeholder="Select"
                    id="category"
                    name="category"
                    onChange={onChange}
                    focusBorderColor="brand.900"
                  >
                    {tagsList}
                  </Select>
                </div>
                <FormControl className="pb-5">
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <Textarea
                    onChange={(event) => onChange(event)}
                    name="content"
                    type="text"
                    resize="vertical"
                    id="content"
                    focusBorderColor="brand.900"
                    size="lg"
                    styles={{ marginBottom: "1rem" }}
                  />
                </FormControl>
                {/* <MDEditor /> */}
                <Button
                  bg="brand.800"
                  color="white"
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
              <div
                style={{ height: "max-content" }}
                className="max-w-3xl bg-white p-10 m-10 outline"
              >
                <h2 className="text-xl">Posting Rules:</h2>
                <ol>
                  <li>• Dont be a dick</li>
                  <li>• Behave like you would in real life</li>
                </ol>
              </div>
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
        <Footer />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const categories = (await getCategories()) || [];
  return {
    props: { categories },
  };
}
