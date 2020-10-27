import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";
import { Facebook, Twitter, Linkedin } from "react-social-sharing";

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  url,
  upvotes,
  id,
}) {
  return (
    <>
      <PostTitle upvotes={upvotes} id={id}>
        {title}
      </PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0 lg:max-w-3xl lg:m-auto">
        <CoverImage title={title} url={coverImage.url} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-md italic text-gray-500">
          <Date dateString={date} />
        </div>
        <Facebook link={url} />
        <Twitter link={url} />
        <Linkedin link={url} />
      </div>
    </>
  );
}
