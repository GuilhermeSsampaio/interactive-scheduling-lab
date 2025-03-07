
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Select from './Select';
import ProgrammingModal from './ProgrammingModal';
import { Programming } from './ProgrammingModal';
import ProgrammingList from './ProgrammingList';

// Mock data for experiment options
const experimentOptions = [
  { label: 'Teste de novas variedades de culturas agrícolas', value: 'teste-variedades' },
  { label: 'Avaliação de eficiência de fertilizantes e adubos', value: 'fertilizantes-adubos' },
  { label: 'Pesquisa sobre controle biológico de pragas', value: 'controle-pragas' },
  { label: 'Estudo de técnicas de irrigação para otimização do uso da água', value: 'tecnicas-irrigacao' },
  { label: 'Desenvolvimento de práticas de conservação do solo', value: 'conservacao-solo' },
  { label: 'Teste de cultivares resistentes a mudanças climáticas', value: 'cultivares-resistentes' },
  { label: 'Análise da qualidade nutricional de alimentos produzidos', value: 'qualidade-nutricional' },
];

type Experiment = {
  id: string;
  value: string;
};

type ExperimentCardProps = {
  onAddProgramming: (experimentId: string, programming: Programming) => void;
  onDeleteProgramming: (experimentId: string, programmingId: string) => void;
  experimentProgrammings: Record<string, Programming[]>;
};

const ExperimentCard = ({ 
  onAddProgramming, 
  onDeleteProgramming, 
  experimentProgrammings 
}: ExperimentCardProps) => {
  const [selectedExperiment, setSelectedExperiment] = useState('');
  const [programmingModalOpen, setProgrammingModalOpen] = useState(false);
  const [editingProgramming, setEditingProgramming] = useState<Programming | undefined>();
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [currentExperimentId, setCurrentExperimentId] = useState<string>('');

  const handleExperimentChange = (value: string) => {
    setSelectedExperiment(value);
  };

  const handleAddExperiment = () => {
    if (!selectedExperiment) return;
    
    const experimentExists = experiments.some(exp => exp.value === selectedExperiment);
    if (experimentExists) return;
    
    const newExperiment = {
      id: `${selectedExperiment}-${Date.now()}`,
      value: selectedExperiment
    };
    
    setExperiments(prev => [...prev, newExperiment]);
    setSelectedExperiment('');
  };

  const handleAddProgramming = (experimentId: string) => {
    setCurrentExperimentId(experimentId);
    setEditingProgramming(undefined);
    setProgrammingModalOpen(true);
  };

  const handleEditProgramming = (experimentId: string, programming: Programming) => {
    setCurrentExperimentId(experimentId);
    setEditingProgramming(programming);
    setProgrammingModalOpen(true);
  };

  const handleSaveProgramming = (programming: Programming) => {
    onAddProgramming(currentExperimentId, programming);
  };

  const handleDeleteProgramming = (experimentId: string, programmingId: string) => {
    onDeleteProgramming(experimentId, programmingId);
  };

  const getExperimentName = (value: string): string => {
    const experiment = experimentOptions.find(exp => exp.value === value);
    return experiment ? experiment.label : '';
  };

  return (
    <div className="space-y-6">
      <div className="p-5 border rounded-lg bg-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Selecione o Experimento</label>
            <Button onClick={handleAddExperiment} variant="outline" className="h-9" disabled={!selectedExperiment}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Experimento
            </Button>
          </div>
          <Select
            options={experimentOptions}
            value={selectedExperiment}
            onChange={handleExperimentChange}
            placeholder="Selecione um experimento"
          />
        </div>
      </div>

      {experiments.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          {experiments.map((experiment) => (
            <div key={experiment.id} className="p-5 border rounded-lg bg-white space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{getExperimentName(experiment.value)}</h3>
                <Button onClick={() => handleAddProgramming(experiment.id)} className="btn-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Programação
                </Button>
              </div>

              {experimentProgrammings[experiment.id]?.length > 0 ? (
                <div className="mt-4">
                  <ProgrammingList
                    programmings={experimentProgrammings[experiment.id] || []}
                    onAddProgramming={() => handleAddProgramming(experiment.id)}
                    onEditProgramming={(programming) => handleEditProgramming(experiment.id, programming)}
                    onDeleteProgramming={(programmingId) => handleDeleteProgramming(experiment.id, programmingId)}
                    hideAddButton
                  />
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed rounded-md bg-gray-50">
                  <p className="text-gray-500">Nenhuma programação adicionada para este experimento</p>
                  <Button onClick={() => handleAddProgramming(experiment.id)} variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Programação
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ProgrammingModal
        open={programmingModalOpen}
        onOpenChange={setProgrammingModalOpen}
        onSave={handleSaveProgramming}
        editingProgramming={editingProgramming}
      />
    </div>
  );
};

export default ExperimentCard;
