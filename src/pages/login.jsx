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
    ctx.res.writeHead(302, { Location: "/home" }); // NOTE estudar sobre isso aqui!
    ctx.res.end(); // NOTE é importante sempre dar o end() se não vai ficar carregando inifinitamente
    return { props: {} };
  }

  return { props: {} };
}
