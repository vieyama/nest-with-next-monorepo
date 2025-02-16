import type { Metadata } from "next";
import AppProvider from "@/provider";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyperhire Test",
  description: "Build with Next.JS and Nest.JS with Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <main>
            {children}
          </main>
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
