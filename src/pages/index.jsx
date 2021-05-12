import styles from "../styles/Landing/Landing.module.css";
import { signIn } from "next-auth/client";

import Head from "next/head";

export default function Landing() {
  return (
    <div className={styles.landingContainer}>
      <Head>
        <title>Brigth Memory | Landing</title>
      </Head>
      <div className={styles.elementsContainer}>
        <header className={styles.headerNavigation}>
          <img src="/logo.svg" alt="BrigthMemory-logo" />

          <div>
            <a href="#" onClick={signIn}>
              Sign Up
            </a>
            <button onClick={signIn}>Log In</button>
          </div>
        </header>
        <main className={styles.mainContent}>
          <section className={styles.textContent}>
            <h1>Aprenda o que você quiser</h1>
            <p>
              Oferecemos um sistema no qual você consegue criar seus próprios
              FlashCards usando uma automação de repetições feita por nós, a fim
              de garantir seu aprendizado.
            </p>

            <button className={styles.startNowButton} onClick={signIn}>
              Comece Agora
            </button>
            <button className={styles.learnMoreButton}>Saiba Mais</button>
          </section>
          <img
            src="/illustration.png"
            alt="illustration"
            className={styles.illustration}
          />
        </main>
      </div>
    </div>
  );
}
