import React from 'react';

interface ProfessionalObjectiveSectionProps {
  className?: string;
}

const ProfessionalObjectiveSection: React.FC<ProfessionalObjectiveSectionProps> = ({ className }) => {
  return (
    <div className={`bg-[#543310]/10 rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-[#543310] mb-4">Professional Objective</h2>
      <div className="space-y-4 text-gray-700">
        <p>
          I seek to apply my knowledge in a dynamic work environment to gain practical experience. I aspire to contribute to innovative projects and grow professionally in the technology and business fields.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalObjectiveSection; 