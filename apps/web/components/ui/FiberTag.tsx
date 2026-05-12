import React from 'react';

interface FiberComposition {
  name: string;
  percentage: number;
}

interface FiberTagProps {
  compositions: FiberComposition[];
  className?: string;
}

const FiberTag: React.FC<FiberTagProps> = ({ compositions, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1 bg-white border border-border px-2 py-1 rounded shadow-sm ${className}`}>
      {compositions.map((comp, index) => (
        <React.Fragment key={comp.name}>
          <div className="flex items-baseline gap-1">
            <span className="font-mono font-bold text-burgundy text-xs">{comp.percentage}%</span>
            <span className="text-[10px] text-muted uppercase font-semibold">{comp.name}</span>
          </div>
          {index < compositions.length - 1 && (
            <span className="text-border mx-1">/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FiberTag;
