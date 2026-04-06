import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Vahlevy Nugraha - Kura Ninja | Portfolio & Projects",
  description: "Welcome to the official portfolio of Aditya Vahlevy Nugraha (Kura Ninja). Explore innovative web projects, software engineering skills, and creative works.",
  keywords: "Aditya Vahlevy Nugraha, Kura Ninja, Software Engineer, Web Developer, Portfolio, React, TypeScript, Go, Full Stack Developer",
  authors: [{ name: "Aditya Vahlevy Nugraha" }],
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: "Aditya Vahlevy Nugraha - Kura Ninja | Portfolio & Projects",
    description: "Welcome to the official portfolio of Aditya Vahlevy Nugraha (Kura Ninja). Explore innovative web projects, software engineering skills, and creative works.",
    url: "https://kuraninja.vercel.app",
    siteName: "Kura Ninja Portfolio",
    images: [
      {
        url: "/assets/profile.png",
        width: 1200,
        height: 630,
        alt: "Aditya Vahlevy Nugraha Profile",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Vahlevy Nugraha - Kura Ninja",
    description: "Welcome to the official portfolio of Aditya Vahlevy Nugraha (Kura Ninja).",
    images: ["/assets/profile.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
