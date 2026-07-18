import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Kumar Bhargav Vasa — Python, AI & Data Science",
  description:
    "Portfolio of Kumar Bhargav Vasa — Computer Science (AI/ML) student and full-stack developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
