import PostPreview from "./post-preview";
import styles from "./more-stories.module.css";

export default function MoreStories({ posts, label }) {
  return (
    <section>
      {label ? (
        <h2
          className="mb-2 mt-8 text-6xl md:text-7xl tracking-tighter leading-tight bg-white"
          style={{
            borderTop: "4px solid black",
            borderBottom: "4px solid black",
          }}
        >
          {label}
        </h2>
      ) : null}

      <div className={styles.container}>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            category={post.category}
          />
        ))}
      </div>
    </section>
  );
}
