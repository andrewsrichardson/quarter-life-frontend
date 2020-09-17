import Container from "@/components/container";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";

export default function Index({ allPosts, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
        <Container>
          <Intro />
        </Container>
      </Layout>
    </>
  );
}

// export async function getStaticProps({ preview = null }) {
//   const allPosts = (await getAllPostsForHome(preview)) || [];
//   return {
//     props: { allPosts, preview },
//   };
// }
