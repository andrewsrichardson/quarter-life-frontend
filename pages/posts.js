import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroPost from "@/components/hero-post";
import Layout from "@/components/layout";
import { getAllPostsForHome } from "@/lib/api";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import Footer from "@/components/footer";

export default function Posts({ allPosts, preview }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
        <Container>
          {heroPost && <HeroPost props={heroPost} />}
          {morePosts.length > 0 && (
            <MoreStories label={"Recent Posts"} posts={morePosts} />
          )}
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
