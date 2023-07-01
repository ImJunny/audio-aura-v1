import img from "../images/spotify-small.png";
import styles from "../styles/home.module.css";
import { useState, useEffect } from "react";

export default function Filter({ setTerm }) {
  const [filter, setFilter] = useState(false);
  const ranges = ["4w", "6m", "1y"];
  const [time, setTime] = useState(ranges[0]);

  function handleTerm() {
    if (time === "4w") {
      setTerm("short");
    } else if (time === "6m") {
      setTerm("medium");
    } else {
      setTerm("long");
    }
  }

  useEffect(() => {
    handleTerm();
  }, [time, setTerm]);

  return (
    <div className={styles["filter-wrapper"]}>
      <div className={styles["filter-subwrapper"]}>
        <div
          className={styles["filter-box"]}
          style={{
            width: `${filter ? 100 : 0}%`,
            opacity: `${filter ? 1 : 0}`,
          }}
        >
          <ul>
            {ranges.map((range, i) => (
              <li
                style={{ color: `${time === range ? `gray` : `white`}` }}
                onClick={() => {
                  setTime(range);
                  setFilter(false);
                }}
                key={i}
              >
                {range}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <img
        src={img}
        onClick={() => {
          filter ? setFilter(false) : setFilter(true);
        }}
        style={{ transform: `rotate(${filter ? -45 : 0}deg)` }}
      ></img>
    </div>
  );
}
