import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreStories from "@/components/more-stories";
import PostHeader from "@/components/post-header";
import Layout from "@/components/layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/lib/api";
import PostTitle from "@/components/post-title";
import Head from "next/head";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Footer from "@/components/footer";
import Avatar from "@/components/avatar";
import { Facebook, Twitter, Linkedin } from "react-social-sharing";

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const generateRssItem = (post) => `
  <item>
    <guid>https://emilioschepis.com/blog/${post.slug}</guid>
    <title>${post.title}</title>
    <link>https://emilioschepis.com/blog/${post.slug}</link>
    <description>${post.excerpt}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>
`;
  const generateRss = (posts) => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>20SOS</title>
      <link>https://20sos.co.uk</link>
      <description>[...]</description>
      <language>en</language>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="https://emilioschepis.com/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join("")}
    </channel>
  </rss>
`;

  const url = SITE_URL + router.asPath;
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article
              className="outline bg-white"
              style={{
                borderRight: "4px solid black",
                borderLeft: "4px solid black",
                borderTop: "0",
              }}
            >
              <Head>
                <title>
                  {post.title} | {SITE_NAME}
                </title>
                <meta property="og:image" content={post.coverImage.url} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={post.title} />
                <meta property="og:site_name" content={SITE_NAME} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                url={url}
                upvotes={post.upvotes}
                id={post.id}
              />
              <PostBody content={post.content} />
              <div className="max-w-2xl p-2 m-auto pb-20">
                <Avatar name={post.author.name} />
                <div className="pt-10">
                  <Facebook link={url} />
                  <Twitter link={url} />
                  <Linkedin link={url} />
                </div>
              </div>
            </article>
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
      <Footer></Footer>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getPostAndMorePosts(params.slug, preview);
  const content = await markdownToHtml(data?.posts[0]?.content || "");

  const rss = generateRss(posts);

  fs.writeFileSync("./public/rss.xml", rss);

  return {
    props: {
      preview,
      post: {
        ...data?.posts[0],
        content,
      },
      morePosts: data?.morePosts,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
}
