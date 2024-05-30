import { atom } from "jotai";

// Atom for storing the session data
export const sessionAtom = atom(null);

// Atom for storing the user data
export const userAtom = atom(null);

// Atom for managing the loading state
export const loadingAtom = atom(false);

// Atom for storing error messages
export const errorAtom = atom(null);

// Atom for tracking if account verification is pending
export const pendingVerificationAtom = atom(false);

// Atom for managing the visibility of modal dialogs
export const modalAtom = atom(false);

// Atom for tracking if an email for password reset has been sent
export const emailSentAtom = atom(false);

// Atom for storing the current strategy for email verification
export const strategyAtom = atom("email_code");
