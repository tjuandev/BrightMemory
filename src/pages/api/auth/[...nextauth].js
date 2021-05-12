import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    redirect: async (url, _) => {
      if (url === "/api/auth/signin") {
        return Promise.resolve("/home");
      }

      return Promise.resolve("/api/auth/signin");
    },
  },
  database: process.env.MONGODB_URI,
  pages: {
    signIn: "/signin",
    signOut: "/signin",
  },
});
