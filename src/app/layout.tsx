import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { SessionProvider } from "@/utils/SessionProvider";
import ClientBootstrap from '@/components/ClientBootstrap';
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
<<<<<<< HEAD
          <ReactQueryProvider>
            <ClientBootstrap />
            {children}
          </ReactQueryProvider>
=======
          <Toaster />
          <ReactQueryProvider>{children}</ReactQueryProvider>
>>>>>>> b4f8ad6d00ee63c7ce66836592bba3f62ab98987
        </SessionProvider>
      </body>
    </html>
  );
}
