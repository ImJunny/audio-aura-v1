import styles from "../styles/home.module.css";
import { useState, useEffect } from "react";

export default function Stat({ type, number }) {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNum(number);
    }, 0);
    return () => clearTimeout(timer);
  }, [number]);

  return (
    <div className={styles["entry"]}>
      <h1>{type}</h1>
      <div className={styles["outer-bar"]}>
        <div className={styles["inner-bar"]} style={{ width: `${num}%` }}></div>
      </div>
    </div>
  );
}
