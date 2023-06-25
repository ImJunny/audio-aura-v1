import styles from "../styles/home.module.css";
import { getInfo } from "../scripts/info.js";
import { useState, useEffect } from "react";
import Extra from "../components/Extra.js";

export default function Infopanel({ t, a, setHovered, date }) {
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
              onMouseLeave={() => handleHover(date)}
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
              onMouseLeave={() => handleHover(date)}
              key={`artist-${i}`}
            >
              {item}
            </li>
          ))}
        </ul>
        <h1>Top Genre</h1>
        <ul style={{ listStyleType: `none`, marginBottom: 0 }}>
          {genres.map((item, i) => (
            <li key={`genre-${i}`}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
