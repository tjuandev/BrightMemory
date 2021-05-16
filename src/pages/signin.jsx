import { signIn, getSession, getProviders } from "next-auth/client";
import { useRouter } from "next/router";

import styles from "../styles/SignIn.module.css";
import Head from "next/head";

export default function SignIn({ providers }) {
  const router = useRouter();

  return (
    <div className={styles.logInContainer}>
      <Head>
        <title>Brigth Memory | SignIn</title>
      </Head>
      <img
        src="/logo.svg"
        alt="Brigth Memory Logo"
        onClick={() => router.push("/")}
      />
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
