import type { Metadata } from "next";

import { AppHeader } from "@/components/ui/app-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "D2 Build Planner",
  description: "Destiny 2 build planning foundation for Bungie API inventory data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
