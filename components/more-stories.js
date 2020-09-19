import PostPreview from "./post-preview";
import styles from "./more-stories.module.css";

export default function MoreStories({ posts, label }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl tracking-tighter leading-tight">
        {label ? label : "More Stories"}
      </h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32"> */}
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
          />
        ))}
      </div>
    </section>
  );
}
