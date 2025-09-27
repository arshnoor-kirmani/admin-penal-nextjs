"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function Provider({
  children,
  session,
  fetchOnWindowFocus = false,
}: {
  children: React.ReactNode;
  session?: Session;
  fetchOnWindowFocus?: boolean;
}) {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={fetchOnWindowFocus}
    >
      {children}
    </SessionProvider>
  );
}
