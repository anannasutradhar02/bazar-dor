import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // আপনার লোকাল সার্ভার ইউআরএল
});

export const { signIn, signUp,signOut, useSession } = authClient;