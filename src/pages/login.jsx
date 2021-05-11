import { signIn, getSession } from "next-auth/client";

export default function Login() {
  return (
    <>
      <h1>Hello you gonna login!</h1>
      <button onClick={signIn}>Log</button>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (session) {
    ctx.res.writeHead(302, { Location: "/home" });
    ctx.res.end();
    return { props: {} };
  }

  return { props: {} };
}
