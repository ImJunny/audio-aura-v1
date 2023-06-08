import styles from "../styles/home.module.css";
import { getStats } from "../scripts/stats.js";
import { useState, useEffect } from "react";
import Bar from "./Bar.js";

export default function Statpanel({ t }) {
  const [popularity, setPopularity] = useState([]);
  const [variety, setVariety] = useState([]);
  const [recency, setRecency] = useState([]);

  useEffect(() => {
    let info = getStats(t);
    setPopularity(info[0]);
    setVariety(info[1]);
    setRecency(info[2]);
  }, []);

  return (
    <div
      className={`${styles["panel"]} ${styles["statpanel"]} ${styles["patternspanel"]}`}
    >
      <div className={styles["entry-wrapper"]}>
        <h1 className={styles["statpanel-title"]}>Listening Patterns</h1>
        <Bar type={"Popularity"} number={popularity} key={"3"} />
        <Bar type={"Variety"} number={variety} key={"4"} />
        <Bar type={"Recency"} number={recency} key={"5"} />
      </div>
    </div>
  );
}
