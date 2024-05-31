import { atom } from "jotai";

// Atom for storing the current user data along with session and metadata
export const currentUserAtom = atom({
  session: null,
  username: null,
  email: null,
  metadata: {
    loading: false,
    error: null,
    strategy: "email_code",
    modal: false,
    pendingVerification: false,
    emailSent: false,
  },
});
