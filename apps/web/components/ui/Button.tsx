import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'premium' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-body font-bold transition-all duration-500 active:scale-95 disabled:opacity-50 disabled:pointer-events-none tracking-tight';
  
  const variants = {
    primary: 'bg-gold text-white hover:bg-gold-dark shadow-silk hover:shadow-gold-glow',
    premium: 'bg-gradient-to-br from-gold to-gold-dark text-white shadow-silk hover:shadow-gold-glow hover:-translate-y-0.5',
    secondary: 'bg-navy text-white hover:bg-navy-light shadow-silk',
    outline: 'border-2 border-gold text-gold bg-transparent hover:bg-gold hover:text-white',
    ghost: 'text-navy bg-transparent hover:bg-gold/10',
    danger: 'bg-burgundy text-white hover:opacity-90',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-xl',
    md: 'px-7 py-3 text-sm rounded-2xl',
    lg: 'px-9 py-4 text-base rounded-2xl',
    xl: 'px-12 py-5 text-lg rounded-3xl',
  };

  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
