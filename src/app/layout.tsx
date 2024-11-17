import dynamic from 'next/dynamic';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Dynamically import providers
const ReactQueryProvider = dynamic(() => import("@/utils/providers/ReactQueryProvider"), {
  ssr: true
});

const SessionProvider = dynamic(() => import("@/utils/SessionProvider").then(mod => mod.SessionProvider), {
  ssr: true
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wildlife Conservation",
  description: "Wildlife Conservation",
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
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
