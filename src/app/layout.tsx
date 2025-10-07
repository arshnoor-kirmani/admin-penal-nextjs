import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import { Toaster } from "sonner";
import StoreProvider from "@/components/custom/StoreProvider";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Panel for managing institute resources",
};
const fira = Fira_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fira.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
