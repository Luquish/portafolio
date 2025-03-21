import { MapPin, Briefcase, Book } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#543310]/10 shadow-sm">
      <div className="p-6 pt-6 pb-0">
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src="/profile.jpg" 
            alt="Profile photo" 
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-[#543310] mb-2">
          Hey again 👋
        </h2>
        
        <p className="text-[#74512D] mb-6">
          I'm a multidisciplinary professional who combines technical knowledge in programming, 
          AI, and data analysis with skills in business, design, and neuroscience. 
          I develop innovative technological solutions that make a positive impact.
        </p>
        
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-[#AF8F6F]/20 text-[#543310] px-4 py-2 rounded-full text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>ARGENTINA</span>
          </div>
          <div className="flex items-center gap-1 bg-[#AF8F6F]/20 text-[#543310] px-4 py-2 rounded-full text-sm">
            <Book className="w-4 h-4 mr-1" />
            <span>DIGITAL TECHNOLOGY</span>
          </div>
          <div className="flex items-center gap-1 bg-[#AF8F6F]/20 text-[#543310] px-4 py-2 rounded-full text-sm mt-2">
            <Briefcase className="w-4 h-4 mr-1" />
            <span>FREELANCE</span>
          </div>
        </div>
      </div>
    </div>
  );
} 