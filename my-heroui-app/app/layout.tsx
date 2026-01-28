import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import clsx from "clsx";
import "./globals.css";
import { Providers } from "./providers";

import { siteConfig } from "@/config/utils/site";
import { fontSans } from "@/config/utils/fonts";
import { Navbar } from "@/components/navbar/ui/navbar";
import Footer from "@/components/footer/ui/footer";
import { AppProvider } from "./app-provider";
import NeonCursor from "@/shared/ui/cursor/neon-cursor";
import CustomCursor from "@/shared/ui/cursor/custom-cursor";
import Loading from "./(protected)/loading";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <AppProvider>
              <CustomCursor />
              <NeonCursor />
              <Suspense fallback={<Loading />}>
                <Navbar />
              </Suspense>
              <main className="mx-auto w-full max-w-7xl px-6 pt-14 flex-grow">
                {children}
              </main>
              <Footer />
            </AppProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
