import styles from "../styles/home.module.css";
import { getInfo } from "../scripts/info.js";
import { useState, useEffect } from "react";
import Extra from "../components/Extra.js";

export default function Infopanel({ t, a, setHovered }) {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    let info = getInfo(t, a);
    setTracks(info[0]);
    setArtists(info[1]);
    setGenres(info[2]);
  }, []);

  function handleHover(track) {
    setHovered(track);
  }

  return (
    <div className={`${styles["panel"]} ${styles["infopanel"]}`}>
      <div className={styles["infobox"]}>
        <h1>Top Tracks</h1>
        <ul>
          {tracks.map((item, i) => (
            <li
              onMouseEnter={() => handleHover(item)}
              onMouseLeave={() => handleHover("")}
              key={`track-${i}`}
            >
              {item}
            </li>
          ))}
        </ul>
        <h1>Top Artists</h1>
        <ul>
          {artists.map((item, i) => (
            <li
              onMouseEnter={() => handleHover(item)}
              onMouseLeave={() => handleHover("")}
              key={`artist-${i}`}
            >
              {item}
            </li>
          ))}
        </ul>
        <h1>Top Genres</h1>
        <ul>
          {genres.map((item, i) => (
            <li
              onMouseEnter={() => handleHover(item)}
              onMouseLeave={() => handleHover("")}
              key={`genre-${i}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
