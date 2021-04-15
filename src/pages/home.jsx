import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import styles from "../styles/Home/index.module.css";

import Decks from "../components/Home/Decks";
import CreateDeckModal from "../components/Home/modal/CreateDeckModal";
import CreateCardModal from "../components/Home/modal/CreateCardModal";
import DeckModal from "../components/Home/modal/DeckModal/DeckModal";
import CardModal from "../components/Home/modal/CardModal/CardModal.jsx";
import User from "../components/Home/User";
import CreateButton from "../components/Home/CreateButton";

import { getSession } from "next-auth/client";

export default function Home() {
  const {
    isCreateDeckModalOpen,
    isDeckModalOpen,
    currentDeckActive,
    isCreateCardModalOpen,
    isCardModalOpen,
  } = useContext(ModalContext);

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
            deckId={currentDeckActive.id}
          />
        </div>
      ) : (
        ""
      )}

      {isCardModalOpen ? (
        <CardModal
          name={currentDeckActive.name}
          deckId={currentDeckActive.id}
        />
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

export async function getServerSideProps(ctx) {
  // NOTE Estudar bem essa parte!!!
  const session = await getSession(ctx);

  if (!session) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return {
      props: {},
    };
  }
  return {
    props: {},
  };
}
