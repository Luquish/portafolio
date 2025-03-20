import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { experience } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <div className="bg-[#543310]/10 rounded-xl p-4">
      <h2 className="text-xl font-bold text-[#543310] mb-3">
        Experience
      </h2>
      
      <div className="space-y-4">
        {experience.map((job, index) => (
          <div key={index} className="space-y-2">
            <div className="flex flex-col gap-0.5">
              <Link 
                href={`https://${job.company.toLowerCase()}.com`} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-fit bg-[#543310]/20 hover:bg-[#543310]/30 
                           text-[#543310] px-3 py-1 rounded-full transition-colors text-sm"
              >
                <span className="font-semibold">{job.company}</span>
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </Link>
              
              <div className="flex items-center gap-2 text-[#543310] mt-1">
                <span className="font-semibold text-sm">{job.role}</span>
                <span className="text-[#74512D] text-sm">•</span>
                <span className="text-[#74512D] text-sm">{job.period}</span>
              </div>
            </div>
            
            <p className="text-[#74512D] leading-normal text-sm">
              {job.description}
            </p>
            
            {index < experience.length - 1 && (
              <hr className="border-[#AF8F6F]/20 my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
