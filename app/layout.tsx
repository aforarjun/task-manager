import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster"
import { StoreProvider } from "@/providers/store-provider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Generated by create next app",
};

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body 
        className={cn(
          'antialiased flex min-h-screen w-full flex-col bg-muted/40',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <ThemeProvider>
          <StoreProvider>
            <Header />
            {children}
            <Toaster />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
