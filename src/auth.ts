import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { db, roles, sessions, users } from "@/server/db/schema";
import type { NextAuthOptions } from "next-auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { User } from "@/types/user";
import { v4 as uuidv4 } from "uuid";

export const options: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials.password) {
            throw new Error("Missing credentials");
          }

          const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.username, credentials.username))
            .limit(1);

          if (existingUser.length === 0) {
            throw new Error("No user found");
          }

          const user = existingUser[0];
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password ?? ""
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            role_id: user.role_id,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const email = user.email || "";
        const image = user.image || "";

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (existingUser.length === 0) {
          const userRole = await db
            .select({ Id: roles.id })
            .from(roles)
            .where(eq(roles.name, "member"))
            .limit(1);

          await db.insert(users).values({
            email,
            profileImage: image,
            username: "",
            password: "",
            role_id: userRole[0].Id,
          });
        } else {
          user.id = existingUser[0].id;
          user.username = existingUser[0].username;
          user.role_id = existingUser[0].role_id;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role_id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.role_id = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
};