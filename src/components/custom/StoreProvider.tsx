"use client"; // Important for client-side components

import { Provider } from "react-redux";
import { store } from "@/lib/store/store"; // Adjust path if needed

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
