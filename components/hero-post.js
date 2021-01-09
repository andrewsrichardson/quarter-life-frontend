import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function HeroPost(props) {
  const { title, date, coverImage, slug, excerpt } = props.props;
  const fontColour = "white";
  return (
    <>
      <section
        className="bg-white outline m-auto max-w-screen-xl flex justify-end"
        style={{
          borderRight: "4px solid black",
          borderLeft: "4px solid black",
        }}
      >
        <div className="">
          <CoverImage title={title} url={coverImage.url} slug={slug} />
        </div>
        <div className="absolute max-w-md flex self-end pr-10 pb-10">
          <div className="">
            <h1
              className="mb-4 text-4xl lg:text-6xl leading-tight"
              style={{ color: fontColour }}
            >
              <Link as={`/posts/${slug}`} href="/posts/[slug]">
                <a className="">{title}</a>
              </Link>
            </h1>
            <h2 style={{ color: fontColour }} className="text-2xl">
              {excerpt}
            </h2>
            <div style={{ color: fontColour }} className="">
              <Date dateString={date} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
