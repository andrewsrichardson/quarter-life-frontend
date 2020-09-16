import Container from "@/components/container";
import Layout from "@/components/layout";
import { getQuestionByID } from "@/lib/api";
import Head from "next/head";
import CommentsList from "../../components/CommentList";

export default function ForumPost({ question }) {
  const { title, user, created_at, comments, content } = question[0];

  const { username } = user;
  const date = created_at.slice(0, 10);

  return (
    <>
      <Layout>
        <Head>
          <title>Talk</title>
        </Head>
        <Container>
          {" "}
          <div className="border-b-2">
            <h1 className="text-4xl">{title}</h1>
            <h2 className="text-xl m-10">{content}</h2>

            <h3 className="text-sm">{"by " + username}</h3>
            <h3 className="text-sm">
              {comments.length.toString() +
                " comment" +
                (comments.length == 1 ? "" : "s")}
            </h3>
            <p className="text-sm text-right">{date}</p>
          </div>
          <CommentsList comments={comments}></CommentsList>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const question = (await getQuestionByID(id)) || [];
  return {
    props: { question },
  };
}
