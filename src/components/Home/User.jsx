import styles from "../../styles/Home/User.module.css";

import { signOut, useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import { DeckContext } from "../../contexts/DeckContext";

export default function User() {
  const session = useSession();

  const { getUserId } = useContext(DeckContext);

  useEffect(() => {
    if (session[0]) {
      getUserId(session[0].user.email);
    }
  }, [session[0]]);

  return (
    <>
      {!session[0] ? (
        <h1>loading page</h1>
      ) : (
        <div className={styles.userInfo}>
          <img src={session[0].user.image} alt="thiago-user" />
          <div className={styles.userTextInfo}>
            <strong>{session[0].user.name}</strong>
            <p>Decks</p>
          </div>
        </div>
      )}
    </>
  );
}
