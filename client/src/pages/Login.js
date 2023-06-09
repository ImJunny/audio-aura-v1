import { useState, useEffect } from "react";
import styles from "../styles/login.module.css";
import { getBackground } from "../scripts/background.js";
import img from "../images/spotify-small.png";

function Login() {
  const [redirectUrl, setRedirectUrl] = useState("");
  const [gradient, setGradient] = useState({});
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    fetch("/authenticate", (req, res) => {})
      .then((res) => res.json())
      .then((data) => setRedirectUrl(data));

    let background = getBackground(null, null);
    setGradient(background[0]);
    setShapes(background[1]);
  }, []);

  return (
    <div className={styles["body-wrapper"]} style={gradient}>
      <div className={styles.overlay}></div>
      {shapes}
      <div id={styles["login-container"]}>
        <h1 id={styles["login-title"]}>Audio Aura</h1>
        <h1 id={styles["login-subtitle"]}>Visualize your music taste</h1>
        <button
          id={styles["login-button"]}
          onClick={() => (window.location.href = redirectUrl)}
        >
          Login to Spotify
          <img className={styles["login-logo"]} src={img} />
        </button>
        <h1>
          *Under development. Must need to be authorized in development mode.*
        </h1>
      </div>
    </div>
  );
}

export default Login;
