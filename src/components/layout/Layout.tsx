import { ReactNode } from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = "Luca Mazzarello | Portfolio" }: LayoutProps) {
  const router = useRouter();
  const [isChangingPage, setIsChangingPage] = useState(false);

  // Detectar cambios de página
  useEffect(() => {
    const handleStart = () => setIsChangingPage(true);
    const handleComplete = () => {
      setTimeout(() => setIsChangingPage(false), 100);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Portfolio personal de Luca Mazzarello" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-[#F8F4E1] overflow-hidden">
        <div className={cn(
          "min-h-screen", 
          !isChangingPage ? "animate-fade-in" : ""
        )}>
          {children}
        </div>
        <NavBar />
      </main>
    </>
  );
}
