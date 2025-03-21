import Layout from "@/components/layout/Layout";
import { Mail, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const contactOptions = [
    {
      icon: <Mail className="w-5 h-5" />,
      text: "lucamazza02@gmail.com",
      href: "mailto:lucamazza02@gmail.com"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      text: "@luca_mazzarello",
      href: "https://www.instagram.com/luca_mazzarello/"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      text: "Luca Mazzarello",
      href: "https://www.linkedin.com/in/luca-mazzarello-6118251b8/"
    }
  ];

  return (
    <Layout title="Contact | Luca Mazzarello">
      <div className="min-h-screen flex flex-col items-center justify-center text-[#543310] px-4 py-10">
        <div className="max-w-xl w-full flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-black text-center mb-12 tracking-tight text-[#543310]">
            Let's work together
          </h1>
          
          {/* Opciones de contacto en línea horizontal */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {contactOptions.map((option, index) => (
              <Link 
                key={index}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="border border-[#543310] rounded-full p-2">
                  {option.icon}
                </div>
                <span className="font-medium">{option.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 