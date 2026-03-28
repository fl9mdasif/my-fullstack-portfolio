import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/Navbar";
import { Toaster } from "sonner";
// import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Md Asif's Fullstack Portfolio | Modern Web Solutions",
  description: "Modern & Professional Full Stack Portfolio by dev_asif. Specializing in creating intuitive front-end designs and robust back-end systems.",
  openGraph: {
    title: "Md Asif's Fullstack Portfolio",
    description: "Explore the modern full-stack web solutions and projects by Md Asif Al Azad.",
    url: "https://dev-mdasif-portolio.vercel.app",
    siteName: "Md Asif Al Azad Portfolio",
    images: [
      {
        url: "/portfolio_preview.png",
        width: 1200,
        height: 630,
        alt: "Md Asif Fullstack Developer Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Asif's Fullstack Portfolio",
    description: "Modern & Professional Full Stack Portfolio by dev_asif.",
    images: ["/portfolio_preview.png"],
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
        <Providers
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Footer />
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
