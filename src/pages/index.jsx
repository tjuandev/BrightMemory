import { useContext, useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";
import styles from "../styles/Home/index.module.css";

import Decks from "../components/Home/Decks";
import CreateDeckModal from "../components/Home/modal/CreateDeckModal";
import CreateCardModal from "../components/Home/modal/CreateCardModal";
import DeckModal from "../components/Home/modal/DeckModal/DeckModal";
import CardModal from "../components/Home/modal/CardModal.jsx";
import User from "../components/Home/User";
import CreateButton from "../components/Home/CreateButton";

export default function Home() {
  const {
    isCreateDeckModalOpen,
    isDeckModalOpen,
    currentDeckActive,
    isCreateCardModalOpen,
    isCardModalOpen,
  } = useContext(ModalContext);

  /* useEffect(() => {
    const bob = async () => {
      const res = await fetch("/api/deck/readAll", {
        method: "GET",
      });

      res.json().then((el) => {
        console.log(el);
      });
    };

    bob();
  }, []); */

  return (
    <div className={styles.container}>
      <div className={styles.homeContainer}>
        <header>
          <nav className={styles.navbar}>
            <User />
            <CreateButton />
          </nav>
        </header>
        <main>
          <Decks />
        </main>
      </div>

      {isCreateDeckModalOpen ? (
        <div className={styles.modalBg}>
          <CreateDeckModal />
        </div>
      ) : (
        ""
      )}

      {isDeckModalOpen ? (
        <div className={styles.modalBg}>
          <DeckModal
            name={currentDeckActive.name}
            description={currentDeckActive.description}
            id={currentDeckActive.id}
          />
        </div>
      ) : (
        ""
      )}

      {isCardModalOpen ? (
        <CardModal name={currentDeckActive.name} id={currentDeckActive.id} />
      ) : (
        ""
      )}

      {isCreateCardModalOpen ? (
        <div className={styles.modalBg}>
          <CreateCardModal id={currentDeckActive.id} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
