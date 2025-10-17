import type { Metadata } from "next";
// import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Toaster } from "sonner";
import StoreProvider from "@/components/custom/StoreProvider";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Panel for managing institute resources",
};
// const fira = Fira_Sans({
//   weight: ["400"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   display: "swap",
// });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
