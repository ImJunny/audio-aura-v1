//import styles from "../styles/home.module.css";
import { useEffect, useState } from "react";
import Background from "../components/Background.js";
import styles from "../styles/home.module.css";
import Infopanel from "../components/Infopanel.js";
import Extra from "../components/Extra.js";
import Musicalitypanel from "../components/Musicalitypanel.js";
import Feelingspanel from "../components/Feelingspanel.js";
import Patternspanel from "../components/Patternspanel.js";
import { Navigate } from "react-router-dom";
import img from "../images/spotify-small.png";

export default function Home() {
  //states
  let codeQuery = new URLSearchParams(window.location.search).get("code");
  const [tracks, setTracks] = useState([]);
  const [features, setFeatures] = useState([]);
  const [artists, setArtists] = useState([]);
  const [ready, setReady] = useState(false);
  const [leavePage, setLeavePage] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  const [hovered, setHovered] = useState("");

  //useEffect
  useEffect(() => {
    async function getData() {
      const res = await fetch("/postCode", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: codeQuery,
      });
      const data = await res.json();
      if (data === "no token") {
        setLeavePage(true);
        return;
      } else if (data === "not enough tracks") {
        setErrorPage(true);
        setReady(true);
        return;
      }
      setTracks(data.topTracks.items);
      setFeatures(data.audioFeatures.audio_features);
      setArtists(data.topArtists.items);
      setReady(true);
    }
    getData();
  }, []);

  return (
    <div
      className={styles["display"]}
      style={{ filter: `brightness(${ready ? 100 : 0}%)` }}
    >
      {leavePage ? (
        <Navigate to="/" />
      ) : errorPage ? (
        <h1 className={styles["error-message"]}>Not enough user data ._.</h1>
      ) : ready ? (
        <>
          <Background
            className={styles["background"]}
            t={tracks}
            a={artists}
            f={features}
          ></Background>
          <div className={styles["wrapper"]}>
            <div className={styles["container"]}>
              <Infopanel t={tracks} a={artists} setHovered={setHovered} />
              <img src={img}></img>
            </div>
            <div className={styles["container"]}>
              <Feelingspanel f={features} />
              <Musicalitypanel f={features} />
              <Patternspanel t={tracks} />
            </div>
          </div>
          <Extra t={hovered} />
        </>
      ) : null}
    </div>
  );
}
