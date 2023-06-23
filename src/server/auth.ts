import GithubProvider from "@auth/core/providers/github";
import type { SolidAuthConfig } from "@solid-auth/base";

export const authOptions: SolidAuthConfig = {
  providers: [
    // @ts-expect-error Types are wrong
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
};
