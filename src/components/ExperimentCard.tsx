
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Select from "./Select";
import ProgrammingModal from "./ProgrammingModal";
import { Programming } from "@/types/programmingTypes";
import ProgrammingList from "./ProgrammingList";
import { v4 as uuidv4 } from 'uuid';

// Mock data for experiment options
const experimentOptions = [
  {
    label: "Teste de novas variedades de culturas agrícolas",
    value: "teste-variedades",
  },
  {
    label: "Avaliação de eficiência de fertilizantes e adubos",
    value: "fertilizantes-adubos",
  },
  {
    label: "Pesquisa sobre controle biológico de pragas",
    value: "controle-pragas",
  },
  {
    label: "Estudo de técnicas de irrigação para otimização do uso da água",
    value: "tecnicas-irrigacao",
  },
  {
    label: "Desenvolvimento de práticas de conservação do solo",
    value: "conservacao-solo",
  },
  {
    label: "Teste de cultivares resistentes a mudanças climáticas",
    value: "cultivares-resistentes",
  },
  {
    label: "Análise da qualidade nutricional de alimentos produzidos",
    value: "qualidade-nutricional",
  },
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
  experimentProgrammings,
}: ExperimentCardProps) => {
  const [selectedExperiment, setSelectedExperiment] = useState("");
  const [programmingModalOpen, setProgrammingModalOpen] = useState(false);
  const [editingProgramming, setEditingProgramming] = useState<
    Programming | undefined
  >();
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [currentExperimentId, setCurrentExperimentId] = useState<string>("");

  const handleExperimentChange = (value: string) => {
    setSelectedExperiment(value);
  };

  const handleAddExperiment = () => {
    if (!selectedExperiment) return;

    const experimentExists = experiments.some(
      (exp) => exp.value === selectedExperiment
    );
    if (experimentExists) return;

    // Use UUID instead of timestamp for unique identifier
    const newExperiment = {
      id: `${selectedExperiment}-${uuidv4()}`,
      value: selectedExperiment,
    };

    setExperiments((prev) => [...prev, newExperiment]);
    setSelectedExperiment("");
  };

  const handleAddProgramming = (experimentId: string) => {
    setCurrentExperimentId(experimentId);
    setEditingProgramming(undefined);
    setProgrammingModalOpen(true);
  };

  const handleEditProgramming = (
    experimentId: string,
    programming: Programming
  ) => {
    setCurrentExperimentId(experimentId);
    setEditingProgramming(programming);
    setProgrammingModalOpen(true);
  };

  const handleSaveProgramming = (programming: Programming) => {
    const experiment = experiments.find(
      (exp) => exp.id === currentExperimentId
    );

    // Create a new programming object with a valid UUID
    const programmingWithExperiment = {
      ...programming,
      // If id doesn't exist or isn't a valid UUID, generate a new one
      id: programming.id && programming.id.includes('-') ? programming.id : uuidv4(),
      experiment: experiment?.value || "",
    };

    onAddProgramming(currentExperimentId, programmingWithExperiment);
  };

  const handleDeleteProgramming = (
    experimentId: string,
    programmingId: string
  ) => {
    onDeleteProgramming(experimentId, programmingId);
  };

  const getExperimentName = (value: string): string => {
    const experiment = experimentOptions.find((exp) => exp.value === value);
    return experiment ? experiment.label : "";
  };

  return (
    <div className="space-y-6">
      <div className="p-5 border rounded-lg bg-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Selecione o Experimento
            </label>
            <Button
              type="button"
              onClick={handleAddExperiment}
              className="h-9 bg-[#2D405A] text-white hover:bg-[#4A5A71]/90"
              variant="save"
              disabled={!selectedExperiment}
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Experimento
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
            <div
              key={experiment.id}
              className="p-5 border rounded-lg bg-white space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {getExperimentName(experiment.value)}
                </h3>
                <Button
                  type="button"
                  onClick={() => handleAddProgramming(experiment.id)}
                  variant="resource"
                  className="h-9 bg-[#2D405A] text-white hover:bg-[#4A5A71]/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Programação
                </Button>
              </div>

              {experimentProgrammings[experiment.id]?.length > 0 ? (
                <div className="mt-4">
                  <ProgrammingList
                    programmings={experimentProgrammings[experiment.id] || []}
                    onAddProgramming={() => handleAddProgramming(experiment.id)}
                    onEditProgramming={(programming) =>
                      handleEditProgramming(experiment.id, programming)
                    }
                    onDeleteProgramming={(programmingId) =>
                      handleDeleteProgramming(experiment.id, programmingId)
                    }
                    hideAddButton
                  />
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed rounded-md bg-gray-50">
                  <p className="text-gray-500">
                    Nenhuma programação adicionada para este experimento
                  </p>
                  <Button
                    type="button"
                    onClick={() => handleAddProgramming(experiment.id)}
                    variant="outline"
                    className="mt-4"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Programação
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
