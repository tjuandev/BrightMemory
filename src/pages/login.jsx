import { signIn } from "next-auth/client";

export default function Login() {
  return (
    <>
      <h1>Hello you gonna login!</h1>
      <button onClick={signIn}>Log</button>
    </>
  );
}
