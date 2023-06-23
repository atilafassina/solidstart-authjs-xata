import GithubProvider from "@auth/core/providers/github";
import type { SolidAuthConfig } from "@solid-auth/base";
import { nanoid } from "nanoid";
import { getXataClient } from "~/xata.codegen";

const xata = getXataClient();

export const authOptions: SolidAuthConfig = {
  providers: [
    // @ts-expect-error Types are wrong
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = session.user as Record<
        "email" | "name" | "image",
        string
      >;
      const userFromDb = await xata.db.clients
        .filter({ username: sessionUser.email })
        .getFirst();

      // if user doesn't exist, it will be `null`
      if (!userFromDb) {
        const registeredUser = await xata.db.clients.create({
          id: nanoid(),
          username: sessionUser.email,
        });

        // return session with the user id on Xata db
        return { ...session, userId: registeredUser.id };
      }

      // return session with the user id on Xata db
      return { ...session, userId: userFromDb.id };
    },
  },
};
