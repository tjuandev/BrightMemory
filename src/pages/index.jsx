import styles from "../styles/Landing/Landing.module.css";

import { signIn } from "next-auth/client";

export default function Landing() {
  /* async function setNextReview(deckId) {
    await fetch("/api/card/review", {
      method: "POST",
      body: JSON.stringify({ id: deckId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  setNextReview("606e2310ef1f4235879cc0d9"); */

  return (
    <div className={`bg-dark ${styles.landingContainer}`}>
      <main className={`${styles.main}`}>
        <p className={styles.mainTitle}>
          <span className="purple">function</span> study() {"{"}
          <br />
          <span className="green">return</span>
          <span className="green"> flashcards</span>;
          <br />
          <span>{"}"}</span>
        </p>

        <strong>Mude sua maneira de estudar...</strong>

        <div className={styles.buttons}>
          <div>
            <button onClick={signIn}>Registre-se -{">"} </button>
            <p>
              Já tem uma conta? faça o <span>login</span>
            </p>
          </div>
          <button>Saiba mais |{">"}</button>
        </div>
      </main>
    </div>
  );
}
