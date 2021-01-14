import Link from "next/link";
import styles from "../pages/index.module.css";

export default function Topics() {
  return (
    <div id="topics" className="outline bg-white p-10">
      <h1 className="text-4xl text-center">Topics</h1>
      <Link href="/topics/occupation">
        <p className={styles.link + " text-2xl"}>
          <a className="highlight">Society&Culture ☀️</a>
          <img
            className="arrow"
            src="/right-arrow-button.png"
            alt="arrow"
          ></img>
        </p>
      </Link>
      <p className="mb-10">
        A look at how the world works, what's going wrong and possible ways we
        can fix it, along with analysis of relevant media.
      </p>
      <Link href="/topics/philosophymindset">
        <p className={styles.link + " text-2xl"}>
          <a className="highlight">Philosophy&Mindset 🧠</a>
          <img
            className="arrow"
            src="/right-arrow-button.png"
            alt="arrow"
          ></img>
        </p>
      </Link>
      <p className="mb-10">
        Ideas which challenge the way we think, or help to improve our outlook
        on life. It's mind over matter and fresh concepts can change the way we
        view out current situation.
      </p>
      <Link href="/topics/relationships">
        <p className={styles.link + " text-2xl"}>
          <a className="highlight">Relationships 💑</a>
          <img
            className="arrow"
            src="/right-arrow-button.png"
            alt="arrow"
          ></img>
        </p>
      </Link>
      <p className="mb-10">
        Peek advice on how to date when living at home, how to come to terms
        with being single, and how to find a balance between work and leisure.
      </p>
      <Link href="/topics/livelihood">
        <p className={styles.link + " text-2xl"}>
          <a className="highlight">Occupation 🎓</a>
          <img
            className="arrow"
            src="/right-arrow-button.png"
            alt="arrow"
          ></img>
        </p>
      </Link>
      <p className="mb-10">
        Look at the many career anxieties weighing on young adults and the
        social factors making it harder to get into desired industries; Unpaid
        internships, the experience catch-22 and more.
      </p>
      <Link href="/topics/lockdown">
        <p className={styles.link + " text-2xl"}>
          <a className="highlight">Lifestyle&Wellbeing 🌿</a>
          <img
            className="arrow"
            src="/right-arrow-button.png"
            alt="arrow"
          ></img>
        </p>
      </Link>
      <p className="mb-10">
        Keeping fitness of the body and mind in check is key to feeling on top
        form. Here we discuss ideas and approaches to staying fit and healthy.
      </p>
    </div>
  );
}
