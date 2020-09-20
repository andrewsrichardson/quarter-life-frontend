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
import React, { useState } from "react";

export default function Index({ allPosts, preview }) {
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
          20sos . 20sos . 20sos .{" "}
        </motion.h2>
      );
    }
    return intro;
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
        <Container>
          <div className={styles.wrapper}>
            <section className={styles.intro}>
              <motion.img
                src="/smiley.png"
                className={styles.smiley}
                alt="not so smiley"
                animate={{ rotate: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                whileHover={{ rotate: 360 }}
                initial={false}
              />
              <div className={styles.spacer}></div>
              <div className={styles.titlecontent}>
                <div className={styles.horizontaltext}>
                  <AnimatedIntro columns={5}></AnimatedIntro>
                </div>
                <h1 className={styles.title}>{SITE_NAME}</h1>
              </div>
            </section>
            <div className={styles.description}>
              <div className={styles.leftspacer}></div>
              <div className={styles.descriptioncontent}>
                <h2>
                  Welcome to the home of all things{" "}
                  <span className={styles.highlight}>Quarter Life Crisis.</span>
                </h2>
                <h3>
                  A Quarter Life Crisis is temporary, with research suggesting
                  the average case lasts 11 months. Don’t despair, we’ll be with
                  you all the way.{" "}
                </h3>
              </div>
              <div className={styles.rightspacer}></div>
            </div>
            <div className={styles.page2}>
              <div className={styles.leftspacer}>
                <h1 className={styles.problem}>What's the Problem?</h1>
                <h2 className={styles.horizontaltext}>
                  20sos . 20sos . 20sos . 20sos . 20sos . 20sos . 20sos . 20sos
                  . 20sos . 20sos . 20sos . 20sos . 20sos . 20sos .
                </h2>{" "}
              </div>
              <div className={styles.page2content}>
                <p>
                  Young adults today face many challenges that leave them
                  feeling unfulfilled and frustrated at their circumstances.
                </p>
                <p>
                  This feeling of anxiety over the quality and direction of your
                  life in your early twenties and up to your thirties has been
                  coined a quarter life crisis, and is defined by a period of
                  soul searching and rumination over your progress in the
                  professional and private sphere.
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
            <div className={styles.ourmission}>
              <div className={styles.leftspacer}>
                <h1 className={styles.problem}>
                  Our <span className="highlight">Mission</span>
                </h1>
              </div>
              <div className={styles.ourmissioncontent}>
                <p>
                  {SITE_NAME} looks into the many different factors which
                  confound a QLC from the increasing price of properties, to the
                  grim necessity of Unpaid internships, the rise in “bullshit”
                  jobs and the toxic comparison culture that social media has
                  bred. But this website is about far more than outlining a
                  problem- we also offer solutions and provide support during
                  this confusing time.{" "}
                </p>
                <p className={styles.sticky}>
                  We have frequent{" "}
                  <Link href="/posts">
                    <a className="highlight">blog</a>
                  </Link>{" "}
                  posts which offer practical advice to those having a QLC, as
                  well as{" "}
                  <Link href="/ ">
                    <a className="highlight">think pieces</a>
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
            <MoreStories label={"Recent Posts"} posts={allPosts}></MoreStories>
          </div>
        </Container>
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
