import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function About() {
  return (
    <>
      <Header />
      <Container>
        <section className="min-h-screen bg-white">
          <h1 className="text-center text-4xl p-10">About Us</h1>
          <div className="max-w-3xl m-auto">
            <h2 className="text-2xl text-center pb-5"> Ross, 23</h2>
            <p className="text-center pb-2">
              My name is Ross, and I am a 23 year old Politics graduate (and
              aspiring adult) undergoing my own quarter life crisis. After
              growing disillusioned with life after uni- there's only so many
              times you can read a job listing which considers “the opportunity
              to become a paid role” a benefit - I decided to create this blog
              to foster a community where we can discuss these issues, support
              each other and raise awareness.
            </p>
            <p className="text-center pb-2">
              I’ve been inadvertently writing about a quarter life crisis for
              the last few years, but never had a name for my predicament. In
              article after article I bemoaned unpaid internships and the
              underwhelming reality of life after Uni; I dreamt of travelling
              but also wanted to get on the career ladder; I felt defined by my
              degree which no longer represented my long term ambitions and I
              envied my friends for their relationships and jobs which were
              broadcast online.
            </p>
            <p className="text-center pb-2">
              During this time I encountered others who felt equally lost and
              shared my angst regarding their purpose and the overall trajectory
              of their life. Common buzzwords kept popping up in conversation
              with my age group; many spoke of feeling lost, dissatisfied with
              work or underwhelmed by the pace their life’s were moving at.
              Indeed, no one seemed to be immune. Some thought they’d be in a
              good job with a partner and a home by 25, but instead they were in
              their childhood bedroom working unpaid internships to get dream
              roles. Alternatively, others had secured good graduate jobs and
              quickly grew disenchanted with the reality- “Is this it?” clouded
              their minds. Whilst their parents, friends and partners were
              proud, they were miserable. Eventually I stumbled across the term
              Quarter Life Crisis, and realised how widespread this feeling is
              among 18-30 year olds, particularly those in their mid twenties.
            </p>
            <h2 className="text-2xl text-center p-5"> Andrew, 23</h2>
            <p className="text-center pb-2">
              Not sure what to write here, but I made this site.
            </p>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}
