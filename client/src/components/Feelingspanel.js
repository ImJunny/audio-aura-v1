import styles from "../styles/home.module.css";
import { getFeelings } from "../scripts/feelings.js";
import { useState, useEffect } from "react";
import Bar from "./Bar.js";

export default function Feelingspanel({ f }) {
  const [valence, setValence] = useState([]);
  const [energy, setEnergy] = useState([]);

  useEffect(() => {
    let info = getFeelings(f);
    setValence(info[0]);
    setEnergy(info[1]);
  }, [f]);

  return (
    <div
      className={`${styles["panel"]} ${styles["statpanel"]} ${styles["feelingspanel"]}`}
    >
      <div className={styles["entry-wrapper"]}>
        <h1 className={styles["statpanel-title"]}>Feelings</h1>
        <Bar type={"Mood"} number={valence} key={"1"} />
        <Bar type={"Energy"} number={energy} key={"2"} />
      </div>
    </div>
  );
}
