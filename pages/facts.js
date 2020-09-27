import Container from "@/components/container";
import Layout from "@/components/layout";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import Footer from "@/components/footer";
import Statistics from "@/components/statistics";

export default function Facts() {
  return (
    <>
      <Layout>
        <Head>
          <title>{"Facts | " + SITE_NAME}</title>
        </Head>
        <Container>
          <Statistics />
        </Container>

        <Footer></Footer>
      </Layout>
    </>
  );
}
