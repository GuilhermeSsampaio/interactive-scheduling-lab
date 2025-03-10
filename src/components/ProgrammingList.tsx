
import React, { useState } from 'react';
import { Programming } from '@/types/programmingTypes';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { Calendar, ChevronDown, ChevronUp, Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import ResourceList from './ResourceList';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

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
  const [viewingResources, setViewingResources] = useState<Programming | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

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

  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
            <Collapsible 
              key={programming.id} 
              open={expandedCards[programming.id]} 
              onOpenChange={() => toggleCard(programming.id)}
              className="border rounded-lg bg-white overflow-hidden"
            >
              <div className="p-4 flex justify-between items-start">
                <div className="space-y-2">
                  <h4 className="font-medium text-lg">{programming.name}</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {format(programming.startDate, 'dd/MM/yyyy')} até {format(programming.endDate, 'dd/MM/yyyy')}
                    </span>
                  </div>
                  {programming.resources.length > 0 && (
                    <div className="pt-1 text-sm text-gray-600">
                      Recursos ({programming.resources.length})
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingResources(programming);
                    }}
                    className="h-9 justify-center gap-1.5"
                  >
                    <Eye className="h-4 w-4" />
                    Ver
                  </Button>
                  
                  <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 justify-center gap-1.5"
                    >
                      {expandedCards[programming.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              
              <CollapsibleContent>
                <div className="border-t">
                  <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="col-span-2 md:col-span-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditProgramming(programming)}
                        className="h-9 w-full justify-center gap-1.5"
                      >
                        <Edit className="h-4 w-4" />
                        Editar
                      </Button>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteProgramming(programming.id)}
                        className="h-9 w-full justify-center gap-1.5 text-app-orange border-app-orange hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {programming.experiment && (
                      <div className="col-span-2 mt-2 md:mt-0">
                        <p className="text-sm text-gray-600">{getExperimentName(programming.experiment)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
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

      {/* Dialog for viewing resources */}
      <Dialog open={!!viewingResources} onOpenChange={() => setViewingResources(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Recursos da Programação: {viewingResources?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {viewingResources && viewingResources.resources.length > 0 ? (
              <ResourceList 
                resources={viewingResources.resources}
                onRemoveResource={() => {}} // Empty function as we're just viewing
                readOnly={true}
              />
            ) : (
              <div className="text-center py-6 border border-dashed rounded-md bg-gray-50">
                <p className="text-gray-500">Nenhum recurso adicionado para esta programação</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgrammingList;
