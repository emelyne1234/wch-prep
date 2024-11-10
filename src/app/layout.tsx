import ClientBootstrap from "@/components/ClientBootstrap";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { SessionProvider } from "@/utils/SessionProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WCH",
  description: "Wildlife Conservation Hub",
  icons: {
    icon: "/gorilla-icon 1.png",
    shortcut: "/gorilla-icon 1.png",
    apple: "/gorilla-icon 1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ReactQueryProvider>
            {children}
            <ClientBootstrap />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
