import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Panel for managing institute resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="absolute top-1 right-1">
            <ThemeToggle />
          </div>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
