import { useEffect, useState } from "react";
import axios from "axios";
import Background from "../components/Background.js";
import Infopanel from "../components/Infopanel.js";
import Feelingspanel from "../components/Feelingspanel.js";
import Patternspanel from "../components/Patternspanel.js";
import { Navigate } from "react-router-dom";
import Filter from "../components/Filter.js";
import styles from "../styles/home.module.css";

export default function Home() {
  //states API
  let codeQuery = new URLSearchParams(window.location.search).get("code");
  const [tracks, setTracks] = useState([]);
  const [features, setFeatures] = useState([]);
  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState(undefined);
  const [term, setTerm] = useState("short");
  //states page
  const [ready, setReady] = useState(false);
  const [leavePage, setLeavePage] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  //states date
  const currDate = new Date();
  const pastDate = new Date(currDate.getTime() - 28 * 24 * 60 * 60 * 1000);

  const fullDate =
    pastDate.toLocaleDateString() + "-" + currDate.toLocaleDateString();
  const [hovered, setHovered] = useState(fullDate);

  //useEffect
  useEffect(() => {
    (async () => {
      const res = await axios.post("/postCode", {
        code: codeQuery,
        term: term,
        token: token,
      });
      let data = await res.data;
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
      setToken(data.token);
      setReady(true);
    })();
  }, [term]);

  return (
    <div
      className={styles["display"]}
      style={{
        filter: `brightness(${ready ? 100 : 0}%)`,
      }}
    >
      {leavePage ? (
        <Navigate to="/" />
      ) : errorPage ? (
        <h1 className={styles["error-message"]}>Not enough user data ._.</h1>
      ) : ready ? (
        <>
          <Background
            t={tracks}
            a={artists}
            f={features}
            h={hovered}
          ></Background>
          <div className={styles["wrapper"]}>
            <div className={`${styles["container"]} ${styles["container1"]}`}>
              <Infopanel
                t={tracks}
                a={artists}
                setHovered={setHovered}
                date={fullDate}
              />
            </div>
            <div className={`${styles["container"]} ${styles["container2"]}`}>
              <Feelingspanel f={features} />
              <Patternspanel t={tracks} />
              <Filter setTerm={setTerm} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
