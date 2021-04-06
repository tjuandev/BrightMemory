import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  database: process.env.MONGODB_URI,
  callbacks: {
    redirect: async (url, _) => {
      if (url === "/api/auth/signin") {
        return Promise.resolve("/");
      }

      return Promise.resolve("/api/auth/signin");
    },
  },
});
