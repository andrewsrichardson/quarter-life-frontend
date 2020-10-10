import {
  Input,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
} from "@chakra-ui/core";
import Header from "../components/header";
import AppContext from "../context/AppContext";
import styles from "./login.module.css";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { registerUser } from "../lib/auth";
import Link from "next/link";

const backendUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

function Register() {
  const [data, updateData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Header></Header>
      <div className={styles.container + " outline p-10"}>
        {Object.entries(error).length !== 0 &&
          error.constructor === Object &&
          error.message.map((error) => {
            return (
              <div key={error.messages[0].id} style={{ marginBottom: 10 }}>
                <small style={{ color: "red" }}>
                  {error.messages[0].message}
                </small>
              </div>
            );
          })}
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            onChange={(event) => onChange(event)}
            name="email"
            type="email"
            id="email"
            borderColor="gray.400"
            size="md"
            focusBorderColor="brand.900"
            aria-describedby="email-helper-text"
          />
          <FormHelperText className="mb-5" id="email-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            onChange={(event) => onChange(event)}
            className="mb-5"
            name="username"
            type="text"
            borderColor="gray.400"
            id="username"
            focusBorderColor="brand.900"
            size="md"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            onChange={(event) => onChange(event)}
            className="mb-5"
            name="password"
            type="password"
            id="password"
            size="md"
            borderColor="gray.400"
            focusBorderColor="brand.900"
          />
        </FormControl>
        <div className="flex justify-center">
          <Button
            bg="brand.900"
            onClick={() => {
              setLoading(true);
              registerUser(data.username, data.email, data.password)
                .then((res) => {
                  setLoading(false);
                  // set authed User in global context to update header/app state
                  appContext.setUser(res.data.user);
                })
                .catch((error) => {
                  setError(error.response.data);
                  setLoading(false);
                });
            }}
          >
            {loading ? "Loading... " : "Submit"}
          </Button>
        </div>
        <p className="text-center mt-10">Or..</p>

        <div className="flex justify-center mt-10 mb-3">
          <a href={`${backendUrl}/connect/google`}>
            <Button className={styles.submit} variantColor="red">
              Connect to Google
            </Button>
          </a>
        </div>
        <div className="flex justify-center">
          <a href={`${backendUrl}/connect/facebook`}>
            <Button className={styles.submit} variantColor="blue">
              Connect to Facebook
            </Button>
          </a>
        </div>
        <p className="text-xs mt-10 text-gray-800">
          By registering you are agreeing to our{" "}
          <Link href="/terms-and-conditions">
            <a className="underline">T&Cs</a>
          </Link>{" "}
          and
          <Link href="/privacy-policy">
            <a className="underline">Privacy Policy.</a>
          </Link>
        </p>
      </div>
    </>
  );
}
export default Register;

export async function getStaticProps({ params }) {
  // Get the ID to render
  //   const { id } = params;

  //   // Get the data
  //   const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  //   const show = await res.json();

  //   return { props: { show } };
  return { props: { id: null } };
}
