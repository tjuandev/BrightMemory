import { signIn, getSession, getProviders } from "next-auth/client";

import styles from "../styles/SignIn.module.css";

export default function SignIn({ providers }) {
  return (
    <div className={styles.logInContainer}>
      <img src="/logo.svg" alt="Brigth Memory Logo" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Entrar com o {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const providers = await getProviders();

  if (session) {
    ctx.res.writeHead(302, { Location: "/home" });
    ctx.res.end();
    return { props: {} };
  }

  return { props: { providers } };
}
