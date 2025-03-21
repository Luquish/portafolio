import React from 'react';

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <div className={`bg-[#543310]/10 rounded-xl p-6 shadow-sm ${className}`}>
      <h2 className="text-2xl font-bold text-[#543310] mb-4">About Me</h2>
      <div className="space-y-4 text-[#543310]">
        <p>
          I am a multidisciplinary person who combines technical knowledge in programming, artificial intelligence, and data analysis with skills in business, design, and neuroscience. During my university studies, I developed practical projects using machine learning frameworks, algorithms, and participated in initiatives that integrate technological innovation with problem-solving. My ability to learn and adapt to new challenges enables me to provide creative and efficient solutions in various business environments.
        </p>
        <p>
          The Bachelor's in Digital Technology has provided me with a strong technical foundation comparable to Computer Science degrees at top universities, complemented by coursework in business, design, and neuroscience. This integration allows me to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Develop innovative technological solutions across industries such as healthcare, education, finance, and entertainment.</li>
          <li>Extract, analyze, and utilize large datasets for data-driven decision-making.</li>
          <li>Implement machine learning techniques and intelligent systems to optimize processes and improve efficiency.</li>
          <li>Adapt quickly to technological advancements and contribute to projects with social and business impact.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutSection;
