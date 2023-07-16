import styles from "../styles/home.module.css";
import { getInfo } from "../scripts/info.js";
import { useState, useEffect, useRef } from "react";

export default function Infopanel({
  t,
  a,
  setTitle,
  setSubtitle,
  fullDate,
  setImage,
}) {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trackPreviews, setTrackPreviews] = useState([]);
  const [trackImages, setTrackImages] = useState([]);
  const [artistImages, setArtistImages] = useState([]);
  const audioRefs = useRef([]);

  useEffect(() => {
    let info = getInfo(t, a);
    setTracks(info[0]);
    setArtists(info[1]);
    setGenres(info[2]);
    setTrackPreviews(info[3]);
    setTrackImages(info[4]);
    setArtistImages(info[5]);
  }, [t, a]);

  function handleHover(item, i, type) {
    if (type === "track") {
      setTitle(item.name);
      setSubtitle(item.artists);
      setImage(trackImages[i]);
      if (trackPreviews[i] && audioRefs.current[i].paused) {
        audioRefs.current[i].volume = 0.4;
        audioRefs.current[i].play();
      }
    } else {
      setTitle(item);
      setSubtitle("");
      setImage(artistImages[i]);
    }
  }

  function handleUnhover(i) {
    setTitle(fullDate);
    setSubtitle("");
    setImage(null);
    audioRefs.current[i].pause();
    audioRefs.current[i].currentTime = 0;
  }

  return (
    <div className={`${styles["panel"]} ${styles["infopanel"]}`}>
      <div className={styles["infobox"]}>
        <h1>Top Tracks</h1>
        <ul>
          {tracks.map((item, i) => (
            <li
              onMouseEnter={() => handleHover(item, i, "track")}
              onMouseLeave={() => handleUnhover(i)}
              key={`track-${i}`}
            >
              {item.name}
              <audio
                ref={(ref) => (audioRefs.current[i] = ref)}
                src={trackPreviews[i]}
              />
            </li>
          ))}
        </ul>
        <h1>Top Artists</h1>
        <ul>
          {artists.map((item, i) => (
            <li
              onMouseEnter={() => handleHover(item, i)}
              onMouseLeave={() => handleUnhover(i)}
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
