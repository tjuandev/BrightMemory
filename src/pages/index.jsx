import styles from "../styles/Landing/Landing.module.css";

export default function Landing() {
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
            <button>Registre-se -{">"} </button>
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
