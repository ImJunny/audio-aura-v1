import styles from "../styles/home.module.css";
import { useState, useEffect } from "react";

export default function Modal({ setShowModal }) {
  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles["modal"]}>
        <h1>Audio Aura (BETA)</h1>
        <h2>
          Welcome to your Audio Aura. View your top tracks, artists, genre, and
          visualize your music taste.
        </h2>
        <h2>This project is under development and problems may occur.</h2>
        <button onClick={() => setShowModal(false)}>View</button>
      </div>
    </div>
  );
}
