import { getBackground } from "../scripts/background.js";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/home.module.css";
import Shape from "../components/Shape.js";

export default function Background({ t, a, f, title, subtitle, image, ref }) {
  const [gradient, setGradient] = useState({});
  const [categoriesTop, setCategoriesTop] = useState([]);
  const [hue, setHue] = useState(0);
  const titlesRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [shapes, setShapes] = useState([]);

  let displayRef = useRef(null);
  useEffect(() => {
    displayRef.current = ref;
  }, [ref]);

  useEffect(() => {
    let background = getBackground(f, a, t);
    setGradient(background[0]);
    setCategoriesTop(background[1]);
    setHue(background[2]);
  }, [t, a, f]);

  useEffect(() => {
    let temp = [];
    if (categoriesTop.length > 0) {
      for (let i = 0; i < 5; i++) {
        console.log(categoriesTop);
        temp.push(<Shape key={i} color={categoriesTop[i % 3].rgb} />);
      }
    }

    setShapes(temp);
  }, [categoriesTop]);

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
