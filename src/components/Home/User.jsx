import styles from "../../styles/Home/User.module.css";

import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import { DeckContext } from "../../contexts/DeckContext";

export default function User() {
  const session = useSession();

  const { getUserId, deckArray } = useContext(DeckContext);

  useEffect(() => {
    if (session[0]) {
      getUserId(session[0].user.email);
    }
  }, [session[0]]);

  return (
    <>
      {!session[0] ? (
        <span>Carregando Dados</span>
      ) : (
        <div className={styles.userInfo}>
          <img src={session[0].user.image} alt="thiago-user" />
          <div className={styles.userTextInfo}>
            <strong>{session[0].user.name}</strong>
            <p>{deckArray.length || 0} Decks</p>
          </div>
        </div>
      )}
    </>
  );
}
