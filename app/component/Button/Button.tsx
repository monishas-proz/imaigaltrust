import React from 'react';
import './Button.css'
interface ButtonProps {
  label: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  link?: string; // Currently unused, can be removed if not needed
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'button',
  onClick,
  className = '',
}) => {
  return (
    <button suppressHydrationWarning type={type} onClick={onClick} className={`btns font-semibold hover:shadow-lg  ${className}`}>
      {label}
    </button>
  );
};

export default Button;
