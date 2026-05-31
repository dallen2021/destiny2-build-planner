import type { Metadata } from "next";

import { AppHeader } from "@/components/ui/app-header";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html className={cn("dark font-sans", geist.variable)} lang="en">
      <body>
        <TooltipProvider>
          <AppHeader />
          <main>{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
