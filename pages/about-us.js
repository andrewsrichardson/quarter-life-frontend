import Footer from "@/components/footer";
import Header from "@/components/header";
import { SITE_NAME } from "@/lib/constants";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About us | {SITE_NAME}</title>
      </Head>
      <Header />
      <section
        className="min-h-screen pb-10"
        style={{ borderTop: "4px solid black", backgroundColor: "#b1ede8" }}
      >
        <div
          className="bg-white max-w-5xl m-auto mt-10 p-10"
          style={{ border: "4px solid black" }}
        >
          <h1 className="text-center text-4xl p-10">About Us</h1>
          <div>
            <p className="text-lg pb-5">
              We are three guys who met at University, currently undergoing out
              own quarter life crisies. After growing disillusioned with the
              world of work we decided to create this place to foster a
              community where we can discuss issues, support each other and
              raise awareness of things which plague the life of a 20-something.
            </p>
            <p className="text-lg pb-5">
              During this time we encountered others who felt equally lost and
              shared our angst regarding their purpose and the overall
              trajectory of their life. Common buzzwords kept popping up in
              conversation with our friendship group; many spoke of feeling
              lost, dissatisfied with work or underwhelmed by the pace their
              life’s were moving at. Indeed, no one seemed to be immune. Some
              thought they’d be in a good job with a partner and a home by 25,
              but instead they were in their childhood bedroom working unpaid
              internships to get dream roles. Alternatively, others had secured
              good graduate jobs and quickly grew disenchanted with the reality,
              asking 'Is this it?'. Whilst their parents, friends and partners
              were proud, they were miserable. Eventually we stumbled across the
              term Quarter Life Crisis, and realised how widespread this feeling
              is among 18-30 year olds, particularly those in their mid
              twenties.
            </p>
            <p className="text-lg pb-5">
              We hope that you can use {SITE_NAME} to talk about issues, big and
              small, which may be hard to address in person. We hope that our
              articles can not only show you that you are not the only one
              feeling this way, but can also offer some sort of start towards a
              path of a more fulfilling outlook on your life.
            </p>

            <h3 className="text-center">Joe, Ross and Andrew</h3>
            <img
              className="m-auto max-w-xs xl:max-w-md"
              src="/the_boys.jpg"
            ></img>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
