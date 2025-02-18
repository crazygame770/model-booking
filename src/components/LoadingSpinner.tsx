import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'lg',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-32 w-32'
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div 
        className={`
          animate-spin rounded-full 
          border-t-2 border-b-2 border-blue-500
          ${sizeClasses[size]}
          ${className}
        `}
      />
    </div>
  );
};

export default LoadingSpinner;
