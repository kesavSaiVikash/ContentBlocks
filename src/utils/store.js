import { atom } from "jotai";

// Atom (global state holding variable) for storing the current user data and can access from any page of our app.
export const currentUserAtom = atom({
  session: null,
  username: null,
  email: null,
  metadata: {
    loading: false,
    error: null,
    strategy: process.env.REACT_APP_STRATEGY_EMAIL_CODE,
    modal: false,
    pendingVerification: false,
    emailSent: false,
  },
});
