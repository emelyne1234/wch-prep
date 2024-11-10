import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { db, roles, sessions, users } from "@/server/db/schema";
import type { NextAuthOptions, User } from "next-auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
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
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: {
        identifier: string;
        password: string;
      }): Promise<User | null> {
        if (!credentials?.identifier || !credentials.password) return null;

        const identifier = credentials.identifier;
        const userQuery = identifier.includes("@")
          ? eq(users.email, identifier)
          : eq(users.username, identifier);

        const existingUser = await db
          .select()
          .from(users)
          .where(userQuery)
          .limit(1);

        if (existingUser.length === 0) {
          const userRole = await db
            .select({ Id: roles.id })
            .from(roles)
            .where(eq(roles.name, "member"))
            .limit(1);

          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const [newUser] = await db
            .insert(users)
            .values({
              email: identifier.includes("@") ? identifier : "",
              username: !identifier.includes("@") ? identifier : "",
              password: hashedPassword,
              role_id: userRole[0].Id,
            })
            .returning({
              id: users.id,
              email: users.email,
              username: users.username,
              role_id: users.role_id,
            });

          return newUser
            ? {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                role_id: newUser.role_id,
              }
            : null;
        } else {
          const user = existingUser[0];
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password ?? ""
          );
          if (!isPasswordValid) return null;
          return {
            id: user.id,
            email: user.email,
            username: user.username,
            role_id: user.role_id,
          };
        }
      },
    }),
  ],
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

      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const sessionToken = uuidv4();
      try {
        await db.insert(sessions).values({
          session_token: sessionToken,
          user_id: user.id,
          expires,
        });

        user.session_token = sessionToken;
      } catch (err) {
        const error = err as Error;
        return error.message;
      }
      return true;
    },
    // async session({ session, token }) {
    //     if (token?.sub) {
    //         session.user = { id: token.sub, email: session.user.email, accessToken: "", username: "", image: "", profileImage: "", expertise: "", bio: "", role_id: "" };
    //     }

    //     console.log("sessions==================================", session.user)
    //     return session;
    // },
    // async jwt({ token, user }) {
    //     if (user) {
    //         token.sub = user.id;
    //         token.username = user.username;
    //         token.role_id = user.role_id;
    //     }
    //     return token;
    // },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.session_token = user.session_token;
        token.email = user.email;
        token.username = user.username;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.accessToken = token.session_token as string;
        session.user.role_id = token.role as string;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return Promise.resolve(baseUrl);
    },
  },

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
};
