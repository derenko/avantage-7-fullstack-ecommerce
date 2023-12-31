import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextAuthSessionProvider from "../components/providers/SessionProvider";
import { Header } from "@/components/global/header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/core/utils";
import { Suspense } from "react";
import { Footer } from "@/components/global/footer";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          roboto.className,
          "bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white"
        )}
      >
        <Suspense>
          <NextAuthSessionProvider>
            <Header />
            <main className="min-h-[100vh] container-lg py-4">{children}</main>
            <Toaster />
            <Footer />
          </NextAuthSessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
