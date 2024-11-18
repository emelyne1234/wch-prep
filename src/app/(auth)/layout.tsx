import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login and Registration",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
} 