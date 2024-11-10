/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      id: string;
      username: string;
      email: string;
      image: string;
      profileImage: string;
      expertise: string;
      bio: string;
      roleId: string;
    };
  }

  interface User extends DefaultSession["user"] {
    id: string;
    username: string;
    email: string;
    image: string;
    roleId: string;
    session_token?: string;
  }
}
