import { Mail, Twitter, Instagram, FileText } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  const contactLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      text: "lucamazza02@gmail.com",
      href: "mailto:lucamazza02@gmail.com"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      text: "@luca_mazza",
      href: "https://twitter.com/luca_mazza"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      text: "@luca_mazza",
      href: "https://instagram.com/luca_mazza"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      text: "cv.lucamazzarello.com",
      href: "https://cv.lucamazzarello.com"
    }
  ];

  return (
    <div className="bg-[#543310]/10 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-[#543310] mb-6">
        Come and say hi!
      </h2>
      
      <div className="space-y-4">
        {contactLinks.map((link, index) => (
          <Link 
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#AF8F6F]/20 hover:bg-[#AF8F6F]/30 
                       text-[#543310] rounded-xl p-4 transition-colors w-full"
          >
            {link.icon}
            <span className="font-medium">{link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
