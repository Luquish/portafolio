import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Pen, Mail, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const router = useRouter();
  
  const isActive = (path: string) => router.pathname === path;
  
  const navItems = [
    { icon: Home, path: "/" },
    { icon: Pen, path: "/projects" },
    { icon: Mail, path: "/contact" },
    { icon: User, path: "/about" },
    { icon: X, path: "/X" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-[#F8F4E1]/80 backdrop-blur-sm border border-[#AF8F6F]/30 rounded-full p-2 shadow-lg">
        {navItems.map(({ icon: Icon, path }, index) => (
          <Link 
            key={index} 
            href={path}
            className={cn(
              "p-3 rounded-full transition-all",
              isActive(path) 
                ? "bg-[#AF8F6F]/30 text-[#543310]" 
                : "text-[#74512D] hover:bg-[#F8F4E1] hover:text-[#543310]"
            )}
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
