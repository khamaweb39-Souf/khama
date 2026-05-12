import React from 'react';

export const Button = ({ children, onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-cairo font-bold transition-all hover:scale-105 active:scale-95 bg-gold text-burgundy shadow-lg hover:shadow-gold/50 ${className}`}
    >
      {children}
    </button>
  );
};
