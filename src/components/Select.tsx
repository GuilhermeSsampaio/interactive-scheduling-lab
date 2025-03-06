
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type SelectProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const Select = ({ options, value, onChange, placeholder = "Selecione uma opção", className, disabled }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={selectRef} 
      className={cn(
        'relative w-full', 
        className
      )}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between rounded-md border border-border bg-white px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-app-blue/20 transition-all duration-200',
          disabled && 'opacity-60 cursor-not-allowed bg-gray-50',
          !disabled && 'cursor-pointer hover:border-app-blue/50'
        )}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md border border-border shadow-lg max-h-60 overflow-auto animate-fade-in">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'px-3 py-2 text-sm cursor-pointer hover:bg-app-lightBlue',
                  option.value === value && 'bg-app-lightBlue text-app-blue'
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
