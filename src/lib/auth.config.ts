import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { SignInSchema } from "@/types/schema";
import { db } from "./db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { password, email } = validatedFields.data;
          try {
            const user = await db.user.findUnique({
              where: {
                email,
              },
            });
            if (!user || !user.password) {
              return null;
            }
            const isValidePassword = await bcrypt.compare(
              password,
              user.password
            );
            if (isValidePassword) {
              return user;
            }
          } catch (error) {
            console.log("credentials error", error);
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;

      return session;
    },
  },
} satisfies NextAuthConfig;
