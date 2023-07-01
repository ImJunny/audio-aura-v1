import { getBackground } from "../scripts/background.js";
import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";

export default function Background({ t, a, f, h }) {
  const [gradient, setGradient] = useState({});
  const [shapes, setShapes] = useState([]);
  const [hue, setHue] = useState(0);

  useEffect(() => {
    let background = getBackground(f, a, t);
    setGradient(background[0]);
    setShapes(background[1]);
    setHue(background[2]);
  }, [t, a, f]);

  return (
    <div className={styles["frame"]}>
      <div className={styles["background"]}>
        <div
          className={styles["gradient"]}
          style={{
            ...gradient,
          }}
        />
        {shapes}
        <div
          className={styles["overlay"]}
          style={{ filter: `hue-rotate(${hue}deg)` }}
        ></div>
      </div>
      <h1 className={styles["extra"]}>{h}</h1>
    </div>
  );
}
