import React from "react";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, className }) => {
  return (
    <div className={`flex items-center justify-center gap-4 my-10 ${className}`}>
      
      {/* Left Line */}
      <div className="flex-1 h-[5px] bg-green-800 max-w-[1000px] shadow-[0_0_8px_rgba(0,0,0,0.6),0_0_3px_rgba(255,255,255,0.9)]"></div>

      {/* Heading */}
       <h2 className=" poppins-font text-2xl md:text-3xl font-semibold uppercase text-center <div class=" >
        {title}
      </h2>

      {/* Right Line */}
      <div className="flex-1 h-[5px] bg-green-800 max-w-[1000px] shadow-[0_0_8px_rgba(0,0,0,0.6),0_0_3px_rgba(255,255,255,0.9)]"></div>

    </div>
  );
};

export default SectionHeading;