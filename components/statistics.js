import styles from "./statistics.module.css";
import { ONS_DATA } from "@/lib/constants";
import PercentLivingAtHome from "@/components/graphs/PercentLivingAtHome";
import EffectsBarChart from "@/components/graphs/EffectsBarChart";
import Link from "next/link";
import { withScreenSize } from "@vx/responsive";

export default function Statistics() {
  let ScaledEffectsBarChart = withScreenSize(EffectsBarChart);
  let ScaledPercentLivingAtHome = withScreenSize(PercentLivingAtHome);

  return (
    <section className={styles.statistics}>
      <h1 className="text-center">
        The <span className="highlight">Facts</span>
      </h1>
      <div className={styles.otherstats}>
        <div className="flex flex-col m-auto mt-20 mb-20 ">
          <h2 className="text-center">75%</h2>
          <p className="max-w-sm">
            of 25-33 year olds have experienced a quarter-life crisis, with the
            average age being 27. The number one cause of the crisis in this
            study were fears around finding a career they are passionate about,
            even more so than about finding a life partner (47%) or dealing with
            student debt (22%). Another top reason was comparing themselves to
            their more successful friends. Nearly half (48%) say this has caused
            them anxiety.
          </p>
        </div>
        <div className={styles.barChart}>
          <p className="max-w-md m-auto">
            Thought it was just you? This chart shows percentages of people who
            career-pivoted during the ages of 25-33. Chances are that something
            on this list is something that you've had on your mind for yourself,
            and this data shows not only that career-pivoting is possible, but
            also that it's common. People just aren't tied down to their jobs
            for life anymore.
          </p>
          <ScaledEffectsBarChart />
        </div>

        <ScaledPercentLivingAtHome data={ONS_DATA} />

        <div className="flex flex-col">
          <h1>
            The <span className="highlight">Takeaway</span>
          </h1>
          <p className="m-10 text-xl">
            Whilst there is room for more research, it is clear that young
            adults increasingly want meaning and purpose from their jobs, are
            struggling financially and as a result, are unable to get on the
            property ladder. Interestingly, they identify as lonely far more
            often than their predecessors; whether this is real or perceived, it
            is worrying all the same. All of these factors are causing angst and
            leading them into periods of emotional turmoil. In addition, social
            media seems to be stoking the flames of a QLC also, offering 24 hour
            updates on their peers' successes and fuelling a competetive
            comparison culture. Drawing on these themes, we have crafted a set
            of{" "}
            <Link href="/#topics">
              <a className="highlight">topics</a>
            </Link>{" "}
            which touch on these issues and offer practical advice.
          </p>
        </div>
      </div>
    </section>
  );
}
