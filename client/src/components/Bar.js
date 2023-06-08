import styles from "../styles/home.module.css";
import { useState, useEffect } from "react";

export default function Stat({ type, number }) {
  const [num, setNum] = useState(0);

  useEffect(() => {
    setNum(number);
  }, [num]);

  return (
    <div className={styles["entry"]}>
      <h1>{type}</h1>
      <div className={styles["outer-bar"]}>
        <div className={styles["inner-bar"]} style={{ width: `${num}%` }}></div>
      </div>
    </div>
  );
}
