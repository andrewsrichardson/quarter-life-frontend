import { Input, FormControl, FormLabel, Button } from "@chakra-ui/core";
import Header from "../components/header";
import AppContext from "../context/AppContext";
import styles from "./login.module.css";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { login } from "../lib/auth";

function Login(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
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
            name="identifier"
            className="mb-5"
            type="email"
            id="email"
            size="lg"
            focusBorderColor="brand.900"
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
            size="lg"
            focusBorderColor="brand.900"
          />
        </FormControl>
        <Button
          className={styles.submit}
          variantColor="yellow"
          onClick={() => {
            setLoading(true);
            login(data.identifier, data.password)
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
export default Login;

export async function getStaticProps({ params }) {
  // Get the ID to render
  //   const { id } = params;

  //   // Get the data
  //   const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  //   const show = await res.json();

  //   return { props: { show } };
  return { props: { id: null } };
}
