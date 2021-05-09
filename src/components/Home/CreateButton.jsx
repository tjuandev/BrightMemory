import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

import styles from "../../styles/Home/CreateButton.module.css";

export default function CreateButton({ isActive }) {
  const { activateModal } = useContext(ModalContext);

  return (
    <button
      onClick={() => {
        isActive ? activateModal("CreateDeckModal") : "";
      }}
      style={isActive ? { cursor: "pointer" } : { cursor: "initial" }}
      className={styles.createButton}
    >
      +
    </button>
  );
}
