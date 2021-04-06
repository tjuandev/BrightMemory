import { useContext } from "react";
import { DeckContext } from "../../contexts/DeckContext";
import styles from "../../styles/Home/User.module.css";

export default function User() {
  return (
    <div className={styles.userInfo}>
      <img src="/thiagoUser.jpeg" alt="thiago-user" />
      <div>
        <strong>Thiago Juan</strong>
        <p>16 Decks</p>
      </div>
    </div>
  );
}
