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
      <div className={styles.container}>
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
            size="lg"
            focusBorderColor="brand.900"
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            onChange={(event) => onChange(event)}
            name="username"
            type="text"
            id="username"
            focusBorderColor="brand.900"
            size="lg"
            styles={{ marginBottom: "1rem" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            onChange={(event) => onChange(event)}
            name="password"
            type="password"
            id="password"
            size="lg"
            focusBorderColor="brand.900"
          />
        </FormControl>
        <Button
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
    </>
  );
}
export default Register;

export async function getStaticPaths() {
  // Define the paths we want to prerender
  const paths = [{ params: { id: "register" } }];
  // for (let id = 1; id <= 100; id++) {
  //   paths.push({ params: { id: String(id) } });
  // }

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Get the ID to render
  //   const { id } = params;

  //   // Get the data
  //   const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  //   const show = await res.json();

  //   return { props: { show } };
  return { props: { id: null } };
}
