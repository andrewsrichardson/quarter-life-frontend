import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";
import styles from "./more-stories.module.css";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  category,
}) {
  const cat = (
    <Link to={`/topics/${category}`}>
      <a className="hover:underline italic">{category}</a>
    </Link>
  );
  const datey = <Date dateString={date} /> + " ◦ ";
  return (
    <div className={styles.story}>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} url={coverImage.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4 flex">
        <Date dateString={date} />
        <p className="mr-2 ml-2 text-gray-600"> ◦ </p>
        <Link href={`/topics/${category}`}>
          <a className="hover:underline italic text-gray-600">{category}</a>
        </Link>
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}
