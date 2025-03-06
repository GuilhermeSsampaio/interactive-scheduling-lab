
import React from 'react';
import { Programming } from './ProgrammingModal';
import { format, differenceInDays, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

type ProgrammingTimelineProps = {
  programmings: Programming[];
  className?: string;
};

const ProgrammingTimeline = ({ programmings, className }: ProgrammingTimelineProps) => {
  if (programmings.length === 0) return null;

  // Sort programmings by start date
  const sortedProgrammings = [...programmings].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  // Get earliest and latest dates
  const earliestDate = sortedProgrammings[0].startDate;
  const latestDate = sortedProgrammings.reduce(
    (latest, prog) => (prog.endDate > latest ? prog.endDate : latest),
    sortedProgrammings[0].endDate
  );

  // Calculate total days for the timeline
  const totalDays = differenceInDays(latestDate, earliestDate) + 1;

  // Generate months for the timeline
  const months: { month: string; days: number }[] = [];
  let currentDate = new Date(earliestDate);
  
  while (currentDate <= latestDate) {
    const month = format(currentDate, 'MMMM yyyy');
    const existingMonth = months.find(m => m.month === month);
    
    if (existingMonth) {
      existingMonth.days += 1;
    } else {
      months.push({ month, days: 1 });
    }
    
    currentDate = addDays(currentDate, 1);
  }

  // Function to get experiment display name
  const getExperimentName = (value: string): string => {
    const experiments: Record<string, string> = {
      'teste-variedades': 'Teste de variedades',
      'resistencia-pragas': 'Resistência a pragas',
      'analise-solos': 'Análise de solos',
    };
    
    return experiments[value] || value;
  };

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold text-gray-800">Timeline dos Experimentos</h3>
      
      {/* Timeline header with months */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="flex border-b">
            <div className="w-48 flex-shrink-0 pr-4 py-2 font-medium text-sm text-gray-600">
              Experimento
            </div>
            <div className="flex-grow flex">
              {months.map((month, index) => {
                const widthPercentage = (month.days / totalDays) * 100;
                return (
                  <div
                    key={index}
                    className="py-2 text-center font-medium text-sm text-gray-600 border-l"
                    style={{ width: `${widthPercentage}%` }}
                  >
                    {month.month}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline body with programmings */}
          {sortedProgrammings.map((programming) => {
            const offsetDays = differenceInDays(programming.startDate, earliestDate);
            const durationDays = differenceInDays(programming.endDate, programming.startDate) + 1;
            const offsetPercentage = (offsetDays / totalDays) * 100;
            const widthPercentage = (durationDays / totalDays) * 100;

            return (
              <div key={programming.id} className="flex py-3 border-b group">
                <div className="w-48 flex-shrink-0 pr-4 py-1 text-sm font-medium truncate">
                  <div className="truncate">{programming.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getExperimentName(programming.experiment)}
                  </div>
                </div>
                <div className="flex-grow relative">
                  <div
                    className="absolute top-0 h-8 rounded-md bg-app-blue/10 border border-app-blue/30 group-hover:bg-app-blue/20 transition-colors duration-200"
                    style={{
                      left: `${offsetPercentage}%`,
                      width: `${widthPercentage}%`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-app-blue font-medium truncate px-2">
                      {format(programming.startDate, 'dd/MM')} - {format(programming.endDate, 'dd/MM')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgrammingTimeline;
