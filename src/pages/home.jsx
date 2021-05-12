import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

import Decks from "../components/Home/Decks";
import CreateDeckModal from "../components/Home/modal/CreateDeckModal";
import CreateCardModal from "../components/Home/modal/CreateCardModal";
import DeckModal from "../components/Home/modal/DeckModal/DeckModal";
import CardModal from "../components/Home/modal/CardModal/CardModal.jsx";
import User from "../components/Home/User";
import CreateButton from "../components/Home/CreateButton";

import { getSession, signOut } from "next-auth/client";
import Head from "next/head";

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
      <Head>
        <title>Brigth Memory | Home</title>
      </Head>
      <div className={styles.mainContent}>
        <header>
          <User />
          <button
            className={styles.signOutBtn}
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </header>
        <Decks />
        <CreateButton isActive={true} />
      </div>

      {isCreateDeckModalOpen ? (
        <div className="bg-blur">
          <CreateDeckModal />
        </div>
      ) : (
        ""
      )}

      {isDeckModalOpen ? (
        <div className="bg-blur">
          <DeckModal
            name={currentDeckActive.name}
            photo_url={currentDeckActive.photo_url}
            description={currentDeckActive.description}
            deckId={currentDeckActive.id}
            reviewInfo={currentDeckActive.reviewInfo}
            colorClass={currentDeckActive.colorClass}
          />
        </div>
      ) : (
        ""
      )}

      {isCardModalOpen ? (
        <div className="bg-blur">
          <CardModal
            name={currentDeckActive.name}
            deckId={currentDeckActive.id}
          />
        </div>
      ) : (
        ""
      )}

      {isCreateCardModalOpen ? (
        <div className="bg-blur">
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
    ctx.res.writeHead(302, { Location: "/signin" });
    ctx.res.end();
    return {
      props: {},
    };
  }
  return {
    props: {},
  };
}
