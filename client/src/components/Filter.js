import img from "../images/spotify-small.png";
import styles from "../styles/home.module.css";
import { useState } from "react";

export default function Filter() {
  const [filter, setFilter] = useState(false);
  const ranges = ["1m", "6m", "1y"];
  const [time, setTime] = useState(ranges[0]);

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
