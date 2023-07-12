import { getBackground } from "../scripts/background.js";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/home.module.css";

export default function Background({ t, a, f, title, subtitle, image }) {
  const [gradient, setGradient] = useState({});
  const [shapes, setShapes] = useState([]);
  const [hue, setHue] = useState(0);
  const titlesRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    let background = getBackground(f, a, t);
    setGradient(background[0]);
    setShapes(background[1]);
    setHue(background[2]);
  }, [t, a, f]);

  useEffect(() => {
    if (titleRef.current.offsetWidth > titlesRef.current.offsetWidth) {
      titleRef.current.style.width = "100%";
    } else {
      titleRef.current.style.width = "auto";
    }

    if (subtitleRef.current.offsetWidth > titlesRef.current.offsetWidth) {
      subtitleRef.current.style.width = "100%";
    } else {
      subtitleRef.current.style.width = "auto";
    }
  }, [title, subtitle]);

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
        <img
          src={image}
          className={styles["image"]}
          style={{ visibility: `${image ? `visible` : `hidden`}` }}
        />
      </div>
      <div className={styles["titles"]} ref={titlesRef}>
        <span className={styles["title"]} ref={titleRef}>
          {title}
        </span>
        <span className={styles["subtitle"]} ref={subtitleRef}>
          {subtitle}
        </span>
      </div>
    </div>
  );
}
