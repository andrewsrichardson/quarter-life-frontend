import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroPost from "@/components/hero-post";
import Layout from "@/components/layout";
import { getAllPostsForHome } from "@/lib/api";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import Footer from "@/components/footer";
import fs from "fs";

const generateRssItem = post => `
<item>
  <guid>https://20sos.co.uk/posts/${post.slug}</guid>
  <title>${post.title}</title>
  <link>https://20sos.co.uk/posts/${post.slug}</link>
  <description>${post.excerpt}</description>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>
`;
const generateRss = posts => `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>20SOS</title>
    <link>https://20sos.co.uk</link>
    <description>Connect with like-minded people on the trials and tribulations of being 20-something. Welcome to the home of all things Quarter Life Crisis.</description>
    <language>en</language>
    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
    <atom:link href="https://20sos.co.uk/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(generateRssItem).join("")}
  </channel>
</rss>
`;

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

  const rss = generateRss(
    allPosts.sort((a, b) => b.date.localeCompare(a.date))
  );

  fs.writeFileSync("./public/rss.xml", rss);
  return {
    props: { allPosts, preview }
  };
}
