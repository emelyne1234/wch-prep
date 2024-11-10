import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { SessionProvider } from "@/utils/SessionProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wildlife Conservation",
  description: "Wildlife Conservation",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
          <Toaster />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
