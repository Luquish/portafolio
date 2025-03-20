import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { experience } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <div className="bg-[#543310]/10 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-[#543310] mb-6">
        Experience
      </h2>
      
      <div className="space-y-8">
        {experience.map((job, index) => (
          <div key={index} className="space-y-4">
            <div className="flex flex-col gap-1">
              <Link 
                href={`https://${job.company.toLowerCase()}.com`} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-fit bg-[#543310]/20 hover:bg-[#543310]/30 
                           text-[#543310] px-4 py-2 rounded-full transition-colors"
              >
                <span className="font-semibold">{job.company}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
              
              <div className="flex items-center gap-2 text-[#543310] mt-2">
                <span className="font-semibold">{job.role}</span>
                <span className="text-[#74512D]">•</span>
                <span className="text-[#74512D]">{job.period}</span>
              </div>
            </div>
            
            <p className="text-[#74512D] leading-relaxed">
              {job.description}
            </p>
            
            {index < experience.length - 1 && (
              <hr className="border-[#AF8F6F]/20 my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
