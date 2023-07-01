import styles from "../styles/home.module.css";
import { getInfo } from "../scripts/info.js";
import { useState, useEffect, useRef } from "react";

export default function Infopanel({ t, a, setHovered, date }) {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trackPreviews, setTrackPreviews] = useState([]);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    let info = getInfo(t, a);
    setTracks(info[0]);
    setArtists(info[1]);
    setGenres(info[2]);
    //setTrackPreviews(info[3]);
  }, [t, a]);

  function handleHover(index) {
    setHovered(tracks[index]);
  }

  function handleUnhover() {
    setHovered(date);
  }

  return (
    <div className={`${styles["panel"]} ${styles["infopanel"]}`}>
      <div className={styles["infobox"]}>
        <h1>Top Tracks</h1>
        <ul>
          {tracks.map((item, i) => (
            <li
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleUnhover()}
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
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleUnhover()}
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
