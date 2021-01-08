import Link from "next/link";
import styles from "../pages/index.module.css";

export default function Topics() {
  return (
    <div id="topics" className="outline bg-white p-10">
      <h1 className="text-4xl text-center">Topics</h1>
      <Link href="/topics/love">
        <p className={styles.link + " text-2xl"}>
          <a className="highlight">Love 💑</a>
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
          <a className="highlight">Livelihood 🎓</a>
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
        internships, the Experience Catch 22 and more.
      </p>
      <Link href="/topics/loneliness">
        <p className={styles.link + " text-2xl"}>
          <a className="highlight">Loneliness 😔</a>
          <img
            className="arrow"
            src="/right-arrow-button.png"
            alt="arrow"
          ></img>
        </p>
      </Link>
      <p className="mb-10">
        How to alleviate loneliness, whether you are in a new city or have
        drifted from childhood friends.
      </p>
      <Link href="/topics/livingArrangement">
        <p className={styles.link + " text-2xl"}>
          <a className="highlight">Living Arrangement 🏠</a>
          <img
            className="arrow"
            src="/right-arrow-button.png"
            alt="arrow"
          ></img>
        </p>
      </Link>
      <h1 className="text-2xl">
        <span className="highlight"></span>
      </h1>
      <p className="mb-10">
        Look at the stats around the Boomerang Generation and the struggles of
        moving back home as a twenty something.
      </p>
      <Link href="/topics/lockdown">
        <p className={styles.link + " text-2xl"}>
          <a className="highlight">Lockdown 😷</a>
          <img
            className="arrow"
            src="/right-arrow-button.png"
            alt="arrow"
          ></img>
        </p>
      </Link>
      <p className="mb-10">
        The ongoing pandemic and resultant lockdown is confounding all the
        issues mentioned above. We provide some practical ways to maintain your
        wellbeing in light of it, as well as documenting the many ways it is
        having an adverse impact on mental health.
      </p>
    </div>
  );
}
