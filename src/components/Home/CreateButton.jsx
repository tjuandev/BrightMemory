import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

import styles from "../../styles/Home/CreateButton.module.css";

export default function CreateButton() {
  const { activateModal } = useContext(ModalContext);

  return (
    <button
      onClick={() => activateModal("CreateDeckModal")}
      className={styles.createButton}
    >
      +
    </button>
  );
}
