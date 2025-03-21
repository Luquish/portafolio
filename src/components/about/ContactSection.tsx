import { Mail, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  const contactLinks = [
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
    <div className="bg-[#543310]/10 rounded-xl p-4 pb-3">
      <h2 className="text-xl font-bold text-[#543310] mb-3">
        Come and say hi!
      </h2>
      
      <div className="space-y-3">
        {contactLinks.map((link, index) => (
          <Link 
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#AF8F6F]/20 hover:bg-[#AF8F6F]/30 
                       text-[#543310] rounded-xl p-3 transition-colors w-full"
          >
            {link.icon}
            <span className="font-medium text-sm">{link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
