import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

import Decks from "../components/Home/Decks";
import CreateDeckModal from "../components/Home/modal/CreateDeckModal";
import CreateCardModal from "../components/Home/modal/CreateCardModal";
import DeckModal from "../components/Home/modal/DeckModal/DeckModal";
import CardModal from "../components/Home/modal/CardModal/CardModal.jsx";
import User from "../components/Home/User";
import CreateButton from "../components/Home/CreateButton";

import { getSession } from "next-auth/client";

import styles from "../styles/Home/home.module.css";

export default function Home() {
  const {
    isCreateDeckModalOpen,
    isDeckModalOpen,
    currentDeckActive,
    isCreateCardModalOpen,
    isCardModalOpen,
  } = useContext(ModalContext);

  return (
    <div className={styles.homeContainer}>
      <aside className={styles.asideContainer}>
        <img src="logo-home.svg" alt="Logo to Home" className={styles.logo} />
        <img
          src="getout.svg"
          alt="Sign Out Button"
          className={styles.signOut}
        />
      </aside>
      <div className={styles.mainContent}>
        <header>
          <User />
          <CreateButton />
        </header>
        <main>
          <Decks />
        </main>
      </div>

      {isCreateDeckModalOpen ? (
        <div>
          <CreateDeckModal />
        </div>
      ) : (
        ""
      )}

      {isDeckModalOpen ? (
        <div>
          <DeckModal
            name={currentDeckActive.name}
            description={currentDeckActive.description}
            deckId={currentDeckActive.id}
            reviewInfo={currentDeckActive.reviewInfo}
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
        <div>
          <CreateCardModal id={currentDeckActive.id} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
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
