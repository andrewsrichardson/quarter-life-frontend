import Link from "next/link";
import styles from "./forumpost.module.css";

export default function ForumPost(props) {
  const { title, id, user, created_at, comments } = props.props;
  const { username } = user;
  const date = created_at.slice(0, 10);

  return (
    <Link href={"/questions/" + id}>
      <div className={styles.wrapper}>
        <h1 className="text-xl hover:underline">
          {" "}
          <a className="hover:underline cursor-pointer">{title}</a>
        </h1>
        <div className="flex">
          <h3 className="text-xs text-gray-600 mr-8">{"by " + username}</h3>
          <h3 className="text-xs text-gray-600 justify-self-start">
            {comments.length.toString() +
              " comment" +
              (comments.length == 1 ? "" : "s")}
          </h3>
          <p className="text-xs text-gray-600 text-right ml-auto">{date}</p>
        </div>
      </div>
    </Link>
  );
}
