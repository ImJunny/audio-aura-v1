import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import styles from "../styles/home.module.css";
import Moods from "../components/Moods.js";
import Background from "../components/Background.js";
import Infopanel from "../components/Infopanel.js";
import Feelingspanel from "../components/Feelingspanel.js";
import Patternspanel from "../components/Patternspanel.js";
import Filter from "../components/Filter.js";
import Modal from "../components/Modal.js";

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
  let pastDate;
  if (term === "short") {
    pastDate = new Date(currDate.getTime() - 28 * 24 * 60 * 60 * 1000);
  } else if (term === "medium") {
    pastDate = new Date(currDate.getTime() - 180 * 24 * 60 * 60 * 1000);
  } else {
    pastDate = new Date(currDate.getTime() - 365 * 24 * 60 * 60 * 1000);
  }
  let fullDate =
    format(pastDate, "MM/dd/yy") + " - " + format(currDate, "MM/dd/yy");
  //states elements
  const [title, setTitle] = useState(fullDate);
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(true);
  //sizing

  const displayRef = useRef(null);
  const backgroundRef = useRef(null);

  function setDimensions() {
    let windowRatio = 0;
    windowRatio = window.innerWidth / window.innerHeight;
    if (windowRatio >= 0.5) {
      displayRef.current.style.height = "100%";
      displayRef.current.style.width = "auto";
    } else {
      displayRef.current.style.width = "100%";
      displayRef.current.style.height = "auto";
    }
    displayRef.current.style.fontSize = `${
      displayRef.current.offsetWidth * 0.05
    }px`;
    displayRef.current.style.overflow = "hidden";
  }

  //useEffect
  useEffect(() => {
    setDimensions();
    window.addEventListener("resize", setDimensions);
    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios
        .post("/postCode", {
          code: codeQuery,
          term: term,
          token: token,
        })
        .catch((err) => {
          setLeavePage(true);
          return;
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

      setTitle(fullDate);
    })();
  }, [codeQuery, fullDate, term, token]);

  return (
    <div
      className={styles["display"]}
      style={{
        filter: `brightness(${ready ? 100 : 0}%)`,
      }}
      ref={displayRef}
    >
      {leavePage ? (
        <Navigate to="/" />
      ) : errorPage ? (
        <h1 className={styles["error-message"]}>Not enough user data ._.</h1>
      ) : ready ? (
        <>
          <Moods t={tracks} a={artists} f={features} />
          <Background
            t={tracks}
            a={artists}
            f={features}
            title={title}
            subtitle={subtitle}
            image={image}
            ref={backgroundRef}
          />
          <div className={styles["wrapper"]}>
            <div className={`${styles["container"]} ${styles["container1"]}`}>
              <Infopanel
                t={tracks}
                a={artists}
                setTitle={setTitle}
                setSubtitle={setSubtitle}
                fullDate={fullDate}
                setImage={setImage}
              />
            </div>
            <div className={`${styles["container"]} ${styles["container2"]}`}>
              <Feelingspanel f={features} />
              <Patternspanel t={tracks} />
              <Filter setTerm={setTerm} />
            </div>
          </div>
          {showModal ? <Modal setShowModal={setShowModal} /> : null}
        </>
      ) : null}
    </div>
  );
}
