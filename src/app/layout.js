import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";


export const metadata = {
  title: "",
  description: "blablabla",
  charset: 'UTF-8',
  author: '',
  keywords: 'Next.js, React, JavaScript, HTML, CSS'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Header> </Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}