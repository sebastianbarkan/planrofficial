import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../utilities/prismaClient";
import bcrypt from "bcrypt";

const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const { username, password } = credentials;

        const user = await prisma.user.findFirst({
          where: {
            username: username,
          },
          select: {
            id: true,
            username: true,
            password: true,
          },
        });

        //If no error and we have user data, return it
        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }

        //Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  debug: false,
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.password) delete user.password;
      user && (token.user = user);
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  jwt: { secret: process.env.NEXTAUTH_SECRET },
};

export default (req, res) => NextAuth(req, res, options);
