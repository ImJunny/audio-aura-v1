import styles from "../styles/home.module.css";
import { getMusicality } from "../scripts/musicality.js";
import { useState, useEffect } from "react";
import Bar from "./Bar.js";

export default function Musicalitypanel({ f }) {
  const [vocality, setVocality] = useState([]);
  const [acousticness, setAcousticness] = useState([]);
  const [danceability, setDanceability] = useState([]);

  useEffect(() => {
    let info = getMusicality(f);
    setVocality(info[0]);
    setAcousticness(info[1]);
    setDanceability(info[2]);
  }, []);

  return (
    <div
      className={`${styles["panel"]} ${styles["statpanel"]} ${styles["musicalitypanel"]}`}
    >
      <div className={styles["entry-wrapper"]}>
        <h1 className={styles["statpanel-title"]}>Musicality</h1>

        <Bar type={"Acousticness"} number={acousticness} key={"2"} />
        <Bar type={"Danceability"} number={danceability} key={"3"} />
      </div>
    </div>
  );
}
