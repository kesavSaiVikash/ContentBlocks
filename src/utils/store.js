import { atom } from "jotai";

// Atoms for storing session and user data
export const sessionAtom = atom(null);
export const userAtom = atom(null);
export const loadingAtom = atom(false);
export const errorAtom = atom(null);
export const pendingVerificationAtom = atom(false);
export const modalAtom = atom(false);
// Atoms for forgot password flow
export const emailSentAtom = atom(false);
