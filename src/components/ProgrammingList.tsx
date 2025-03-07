
import React from 'react';
import { Programming } from './ProgrammingModal';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { Calendar, Edit, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProgrammingListProps = {
  programmings: Programming[];
  onAddProgramming: () => void;
  onEditProgramming: (programming: Programming) => void;
  onDeleteProgramming: (id: string) => void;
  className?: string;
  hideAddButton?: boolean;
};

const ProgrammingList = ({
  programmings,
  onAddProgramming,
  onEditProgramming,
  onDeleteProgramming,
  className,
  hideAddButton = false,
}: ProgrammingListProps) => {
  // Function to get experiment display name
  const getExperimentName = (value: string): string => {
    const experiments: Record<string, string> = {
      'teste-variedades': 'Teste de novas variedades de culturas agrícolas',
      'resistencia-pragas': 'Avaliação de resistência a pragas',
      'analise-solos': 'Análise de crescimento em diferentes solos',
      'fertilizantes-adubos': 'Avaliação de eficiência de fertilizantes e adubos',
      'controle-pragas': 'Pesquisa sobre controle biológico de pragas',
      'tecnicas-irrigacao': 'Estudo de técnicas de irrigação para otimização do uso da água',
      'conservacao-solo': 'Desenvolvimento de práticas de conservação do solo',
      'cultivares-resistentes': 'Teste de cultivares resistentes a mudanças climáticas',
      'qualidade-nutricional': 'Análise da qualidade nutricional de alimentos produzidos',
    };
    
    return experiments[value] || value;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {!hideAddButton && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Programações do Plano Operacional</h3>
          <Button onClick={onAddProgramming} className="btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Criar Nova Programação
          </Button>
        </div>
      )}

      {programmings.length > 0 ? (
        <div className="grid gap-4 animate-fade-in">
          {programmings.map((programming) => (
            <div key={programming.id} className="border rounded-lg bg-white overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="p-4 md:col-span-3 space-y-4">
                  <div>
                    <h4 className="font-medium text-lg">{programming.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{getExperimentName(programming.experiment)}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {format(programming.startDate, 'dd/MM/yyyy')} até {format(programming.endDate, 'dd/MM/yyyy')}
                    </span>
                  </div>

                  {programming.resources.length > 0 && (
                    <div className="pt-2">
                      <h5 className="text-sm font-medium mb-2">Recursos ({programming.resources.length})</h5>
                      <div className="flex flex-wrap gap-2">
                        {programming.resources.map((resource) => (
                          <div 
                            key={resource.id}
                            className="text-xs bg-app-lightBlue text-app-blue px-2 py-1 rounded-full"
                          >
                            {resource.type === 'campo' && 'Campo'}
                            {resource.type === 'infra' && 'Infra'}
                            {resource.type === 'lab' && 'Lab'}
                            {' • '}
                            {resource.item}
                            {resource.fields?.['Quilometragem'] && ` • ${resource.fields['Quilometragem']} km`}
                            {resource.fields?.['Quantidade'] && ` • Qtd: ${resource.fields['Quantidade']}`}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-4 flex md:flex-col justify-end items-center md:items-end gap-2 border-t md:border-t-0 md:border-l">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditProgramming(programming)}
                    className="h-9 gap-1.5"
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteProgramming(programming.id)}
                    className="h-9 gap-1.5 text-app-orange border-app-orange hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed rounded-md bg-gray-50">
          <p className="text-gray-500">Nenhuma programação adicionada</p>
          <Button onClick={onAddProgramming} variant="outline" className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Criar Nova Programação
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProgrammingList;
