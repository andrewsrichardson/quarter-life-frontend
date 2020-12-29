import Container from "@/components/container";
import Layout from "@/components/layout";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import styles from "./index.module.css";
import Footer from "@/components/footer";
import Link from "next/link";
import MoreStories from "@/components/more-stories";
import { getAllPostsForHome } from "lib/api";
import { motion } from "framer-motion";
import Topics from "@/components/topics";
import Cookie from "js-cookie";
import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/core";

export default function Index({ allPosts, preview }) {
  const [accepted, setAccepted] = useState(Cookie.get("accept"));
  const [isIntroClosed, setIsIntroClosed] = useState(true);

  let introSize = isIntroClosed ? styles.closedIntro : null;

  function AnimatedIntro(props) {
    let intro = [];
    for (let i = 0; i < props.columns; i++) {
      intro.push(
        <motion.h2
          key={i}
          animate={{ y: 30 }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
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
          <section className={styles.intro}>
            <div className={styles.titlecontent}>
              <div className={styles.horizontaltext}>
                <AnimatedIntro columns={5}></AnimatedIntro>
              </div>
              <div className={styles.spacer}></div>
              <h1 className={styles.title}>
                20<span className="highlight">SOS</span>
              </h1>
            </div>
          </section>
          <div className={styles.description}>
            <div className={styles.leftspacer}></div>
            <div className={styles.descriptioncontent}>
              <h2>
                Welcome to the home of all things{" "}
                <span className="highlight">Quarter Life Crisis.</span>
              </h2>
              <h3>Don’t despair, we’ll be with you all the way. </h3>
            </div>
            <div className={styles.descriptionlinks}>
              <h2>
                Join a{" "}
                <Link href="/questions">
                  <p className={styles.link}>
                    <a className="highlight">Community</a>
                    <img className="arrow" src="/right-arrow-button.png"></img>
                  </p>
                </Link>
              </h2>
              <h2>
                Get practical{" "}
                <Link href="/#topics">
                  <p className={styles.link}>
                    <a className="highlight">Guidance</a>
                    <img className="arrow" src="/right-arrow-button.png"></img>
                  </p>
                </Link>
              </h2>
              <h2>
                Hear the{" "}
                <Link href="/facts">
                  <p className={styles.link}>
                    <a className="highlight">Facts</a>
                    <img
                      className="arrow"
                      src="/right-arrow-button.png"
                      alt="arrow"
                    ></img>
                  </p>
                </Link>
              </h2>
              {isIntroClosed ? (
                <>
                  <Button
                    variantColor="gray"
                    size="xs"
                    onClick={() => setIsIntroClosed(false)}
                  >
                    Open Introduction
                  </Button>
                </>
              ) : null}
            </div>
            <div className={styles.rightspacer}>
              <CookieBanner />
            </div>
          </div>
          <div className={`${styles.page2} ${introSize}`}>
            <div className={styles.leftspacer}>
              <h1 className={styles.problem}>What's the Problem?</h1>
              <h2 className={styles.horizontaltext}>
                {SITE_NAME} . {SITE_NAME} . {SITE_NAME} . {SITE_NAME} .{" "}
                {SITE_NAME} . {SITE_NAME} . {SITE_NAME} . {SITE_NAME} .
                {SITE_NAME} . {SITE_NAME} . {SITE_NAME} . {SITE_NAME} .{" "}
                {SITE_NAME} . {SITE_NAME} .
              </h2>{" "}
            </div>
            <div className={styles.page2content}>
              <p>
                Young adults today face many challenges that leave them feeling
                unfulfilled and frustrated at their circumstances.
              </p>
              <p>
                This feeling of anxiety over the quality and direction of your
                life in your early twenties and up to your thirties has been
                coined a quarter life crisis, and is defined by a period of soul
                searching and rumination over your progress in the professional
                and private sphere.
              </p>
              <p>
                The conditions to bring about such a crisis are optimal; with
                property prices soaring, moving back in with the parents
                increasingly common, and the job market more competitive, the
                climate faced by young adults is a perfect storm for anxiety
                regarding love and livelihood.
              </p>
            </div>
            <div className={styles.rightspacer}></div>
          </div>
          <div className={`${styles.ourmission} ${introSize}`}>
            <div className={styles.leftspacer}>
              <h1 className={styles.problem}>
                Our <span className="highlight">Mission</span>
              </h1>
            </div>
            <div className={styles.ourmissioncontent}>
              <p>
                {SITE_NAME} looks into the many different factors which confound
                a QLC from the increasing price of properties, to the grim
                necessity of Unpaid internships, the rise in “bullshit” jobs and
                the toxic comparison culture that social media has bred. But
                this website is about far more than outlining a problem- we also
                offer solutions and provide support during this confusing time.{" "}
              </p>
              <p className={styles.sticky}>
                We have{" "}
                <Link href="/#topics">
                  <a className="highlight">think pieces</a>
                </Link>{" "}
                which offer practical advice to those having a QLC, as well as{" "}
                <Link href="/questions">
                  <a className="highlight">a community</a>
                </Link>{" "}
                raising awareness about the challenges facing young adults
                today. Ultimately, we are here to help you navigate the rut
                you’re in, because we have been there, in many respects we are
                there, and we understand that it is a time better faced with
                support and resources than in isolation.
              </p>
            </div>
            <div className={styles.rightspacer}></div>
          </div>
          <div style={{ maxWidth: "75%" }} className="pt-10 m-auto">
            <Topics />
            <MoreStories posts={allPosts}></MoreStories>
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
    props: { allPosts, preview },
  };
}
