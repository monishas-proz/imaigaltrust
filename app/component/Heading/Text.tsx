import React from 'react';

interface TextProps {
  title: string;
  size?: string;
  className?: string;
}

const Text: React.FC<TextProps> = ({ title, size = "text-4xl",className }) => {
  return (
    <div className={`poppins-font ${size} ${className} `}>{title}</div>
  );
};

export default Text;
