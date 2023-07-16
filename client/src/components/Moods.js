import styles from "../styles/home.module.css";
import { useState, useEffect } from "react";
import { getBackground } from "../scripts/background.js";

export default function Moods({ t, a, f }) {
  let temp = [];
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    let background = getBackground(f, a, t);
    let temp = [];
    background[1].map((category) => {
      temp.push(
        <span style={{ color: `${category.rgb}` }}>{category.name}</span>
      );
    });
    setMoods(temp);
  }, [t, a, f]);

  return (
    <div className={styles["moods-wrapper"]}>
      <h1>Your Audio Aura</h1>
      <h2>
        Your top music moods are {moods[0]}, {moods[1]}, and {moods[2]}.
      </h2>
    </div>
  );
}
