import React from 'react';

interface TagProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, isActive = false, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`
        px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300
        ${isActive 
          ? 'bg-gold text-white shadow-md' 
          : 'bg-ecru text-charcoal hover:bg-gold-light/30'
        }
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Tag;
