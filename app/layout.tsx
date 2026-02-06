import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Projektname",
  description: "Projektbeschreibung",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
