import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K-Beauty MX — Cosméticos Coreanos",
  description: "Tienda de cosméticos coreanos con envío a México",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.variable} antialiased bg-white text-neutral-900`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
