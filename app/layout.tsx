import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M. Hafiz Suryadinata | Portofolio Pribadi Modern",
  description: "Portofolio profesional M. Hafiz Suryadinata - Mahasiswa Teknik Informatika, Full-Stack Web Developer & Mobile Developer. Menampilkan proyek pemrograman, riwayat pendidikan, sertifikat, dan kontak.",
  keywords: ["M. Hafiz Suryadinata", "Hafiz Suryadinata", "Portofolio", "Web Developer", "Software Engineer", "Laravel", "Next.js", "Kotlin", "Mahasiswa"],
  authors: [{ name: "M. Hafiz Suryadinata" }],
  openGraph: {
    title: "M. Hafiz Suryadinata | Portofolio Pribadi Modern",
    description: "Portofolio profesional M. Hafiz Suryadinata - Web & Mobile Developer.",
    url: "https://mhafizsuryadinata.vercel.app",
    siteName: "M. Hafiz Suryadinata Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Hafiz Suryadinata | Portofolio Pribadi",
    description: "Portofolio profesional M. Hafiz Suryadinata - Web & Mobile Developer.",
  },
  verification: {
    google: "googlea459a231f2ac20ab",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
