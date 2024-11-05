import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { db, roles, users } from "@/server/db/schema";
import type { NextAuthOptions } from "next-auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

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
            async authorize(credentials) {
                if (!credentials?.identifier || !credentials.password) return null;

                const identifier = credentials.identifier;
                const userQuery = identifier.includes("@")
                    ? eq(users.email, identifier)
                    : eq(users.username, identifier);

                const existingUser = await db.select()
                    .from(users)
                    .where(userQuery)
                    .limit(1);

                if (existingUser.length === 0) {

                    const userRole = await db
                    .select({ Id: roles.id, Name: roles.name })
                    .from(roles)
                    .where(eq(roles.name, "member"))
                    .limit(1);

                    
                    const roleId = userRole[0].Id;
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);

                    const [newUser] = await db.insert(users).values({
                        email: identifier.includes("@") ? identifier : "",
                        username: !identifier.includes("@") ? identifier : "",
                        password: hashedPassword,
                        role_id: roleId,
                    }).returning({ id: users.id, email: users.email });

                    return newUser ? { id: newUser.id, email: newUser.email } : null;
                } else {
                    const user = existingUser[0];
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password ?? "");
                    if (!isPasswordValid) return null;

                    return { id: user.id, email: user.email };
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google" || account?.provider === "github") {
                const email = user.email || "";
                const image = user.image || "";

                const existingUser = await db.select()
                    .from(users)
                    .where(eq(users.email, email))
                    .limit(1);

                if (existingUser.length === 0) {

                    const userRole = await db
                    .select({ Id: roles.id, Name: roles.name })
                    .from(roles)
                    .where(eq(roles.name, "member"))
                    .limit(1);

                    
                    const roleId = userRole[0].Id;
                    await db.insert(users).values({
                        email,
                        profileImage: image,
                        username: "",
                        password: "",
                        role_id: roleId,
                    });
                } else {
                    user.id = existingUser[0].id;
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (token?.sub) {
                session.user = { name: token.sub };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
    // pages: {
    //     signIn: "/auth/signin"
    // },
};
