
import { cn } from '@/lib/utils';
import React from 'react';

type RadioGroupProps = {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const RadioGroup = ({ name, options, value, onChange, className }: RadioGroupProps) => {
  return (
    <div className={cn('flex gap-4', className)}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 text-app-blue focus:ring-app-blue/20 border-gray-300 cursor-pointer"
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="ml-2 block text-sm text-gray-700 cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
