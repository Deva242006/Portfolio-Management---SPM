import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ text = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-slate-500">
      <Loader2 className={`animate-spin text-indigo-600 ${sizeClasses[size] || sizeClasses.md}`} />
      {text && <p className="mt-3 text-sm font-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;

