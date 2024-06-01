import { atom } from "jotai";

// Atom (global state holding variable) for storing the current user data.
// This state can be accessed and modified from any page of our application.

export const currentUserAtom = atom({
  session: null, // Session ID of the current user
  username: null, // Username of the current user
  email: null, // Email address of the current user
  metadata: {
    loading: false, // Indicates if a process is currently loading
    error: null, // Stores any error messages
    strategy: process.env.REACT_APP_STRATEGY_EMAIL_CODE, // Default authentication strategy
    modal: false, // Indicates if a modal is currently active
    pendingVerification: false, // Indicates if email verification is pending
    emailSent: false, // Indicates if an email has been sent for verification or reset
  },
});
