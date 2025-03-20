import { ReactNode } from "react";
import Head from "next/head";
import NavBar from "./NavBar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = "Luca Mazzarello | Portfolio" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Portfolio personal de Luca Mazzarello" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-[#F8F4E1] overflow-hidden">
        {children}
        <NavBar />
      </main>
    </>
  );
}
