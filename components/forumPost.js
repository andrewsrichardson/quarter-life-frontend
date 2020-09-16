import Link from "next/link";
import styles from "./forumpost.module.css";

export default function ForumPost(props) {
  const { title, id, user, created_at, comments } = props.props;
  const { username } = user;
  const date = created_at.slice(0, 10);

  return (
    <div className={styles.wrapper}>
      <Link href={"/forum/" + id}>
        <h1 className="text-xl hover:underline">
          {" "}
          <a className="hover:underline cursor-pointer">{title}</a>
        </h1>
      </Link>

      <h3 className="text-sm">{"by " + username}</h3>
      <h3 className="text-sm">
        {comments.length.toString() +
          " comment" +
          (comments.length == 1 ? "" : "s")}
      </h3>
      <p className="text-sm text-right">{date}</p>
    </div>
  );
}
