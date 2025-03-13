import React, { useState } from "react";
import RadioGroup from "./RadioGroup";
import DatePicker from "./DatePicker";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import { Programming } from "@/types/programmingTypes";
import Select from "./Select";
import ExperimentCard from "./ExperimentCard";

// Mock data for project types
const projectTypeOptions = [
  { label: "Pesquisa Básica", value: "basic-research" },
  { label: "Desenvolvimento", value: "development" },
  { label: "Validação", value: "validation" },
  { label: "Demonstração", value: "demonstration" },
];

type OperationalPlanFormProps = {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
};

const OperationalPlanForm = ({
  onSubmit,
  onCancel,
}: OperationalPlanFormProps) => {
  // Form state
  const [projectType, setProjectType] = useState("");
  const [hasAvailableResources, setHasAvailableResources] = useState("sim");
  const [annualBudget, setAnnualBudget] = useState("");
  const [consumptionMaterials, setConsumptionMaterials] = useState("");
  const [investments, setInvestments] = useState("");
  const [fuel, setFuel] = useState("");
  const [allowances, setAllowances] = useState("");
  const [insurance, setInsurance] = useState("");
  const [resourceExecutionDate, setResourceExecutionDate] = useState<
    Date | undefined
  >();
  const [executionStartDate, setExecutionStartDate] = useState<
    Date | undefined
  >();
  const [executionEndDate, setExecutionEndDate] = useState<Date | undefined>();
  const [needsAssistance, setNeedsAssistance] = useState("nao");
  const [assistanceDetails, setAssistanceDetails] = useState("");
  const [projectSummary, setProjectSummary] = useState("");

  // Experiments and programmings state
  const [experimentProgrammings, setExperimentProgrammings] = useState<
    Record<string, Programming[]>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProgramming = (
    experimentId: string,
    programming: Programming
  ) => {
    setExperimentProgrammings((prev) => {
      const existingProgrammings = prev[experimentId] || [];
      const updatedProgrammings = { ...prev };

      if (existingProgrammings.some((p) => p.id === programming.id)) {
        // Edit existing programming
        updatedProgrammings[experimentId] = existingProgrammings.map((p) =>
          p.id === programming.id ? programming : p
        );
      } else {
        // Add new programming
        updatedProgrammings[experimentId] = [
          ...existingProgrammings,
          programming,
        ];
      }

      return updatedProgrammings;
    });
  };

  const handleDeleteProgramming = (
    experimentId: string,
    programmingId: string
  ) => {
    setExperimentProgrammings((prev) => {
      const existingProgrammings = prev[experimentId] || [];
      const updatedProgrammings = { ...prev };

      updatedProgrammings[experimentId] = existingProgrammings.filter(
        (p) => p.id !== programmingId
      );

      // If no more programmings for this experiment, clean up
      if (updatedProgrammings[experimentId].length === 0) {
        delete updatedProgrammings[experimentId];
      }

      return updatedProgrammings;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = {
      projectType,
      hasAvailableResources,
      annualBudget,
      consumptionMaterials,
      investments,
      fuel,
      allowances,
      insurance,
      resourceExecutionDate,
      executionStartDate,
      executionEndDate,
      needsAssistance,
      assistanceDetails,
      projectSummary,
      experimentProgrammings,
    };

    // Call the onSubmit handler with form data
    onSubmit?.(formData);

    // Reset submission state after a short delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-bold text-app-blue mb-6">
          Cadastrar Novo Plano Operacional
        </h2>

        <div className="space-y-6">
          <div className="p-5 border rounded-lg space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tipo de Projeto
              </label>
              <Select
                options={projectTypeOptions}
                value={projectType}
                onChange={setProjectType}
                placeholder="Selecione uma opção"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Valor do recurso disponível para o ano em execução
              </label>
              <RadioGroup
                name="hasAvailableResources"
                options={[
                  { label: "Sim", value: "sim" },
                  { label: "Não", value: "nao" },
                ]}
                value={hasAvailableResources}
                onChange={setHasAvailableResources}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Valor anual previsto
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">R$</span>
                </div>
                <input
                  type="number"
                  value={annualBudget}
                  onChange={(e) => setAnnualBudget(e.target.value)}
                  className="input-field pl-10"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          <div className="p-5 border rounded-lg space-y-6">
            <h3 className="text-base font-semibold">
              Especificação da rubrica
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Material de Consumo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">R$</span>
                  </div>
                  <input
                    type="number"
                    value={consumptionMaterials}
                    onChange={(e) => setConsumptionMaterials(e.target.value)}
                    className="input-field pl-10"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Investimentos
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">R$</span>
                  </div>
                  <input
                    type="number"
                    value={investments}
                    onChange={(e) => setInvestments(e.target.value)}
                    className="input-field pl-10"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Combustível
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">R$</span>
                  </div>
                  <input
                    type="number"
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    className="input-field pl-10"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Diárias
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">R$</span>
                  </div>
                  <input
                    type="number"
                    value={allowances}
                    onChange={(e) => setAllowances(e.target.value)}
                    className="input-field pl-10"
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Insumos
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">R$</span>
                </div>
                <input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className="input-field pl-10"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          <div className="p-5 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Prazo para execução do recurso
                </label>
                <DatePicker
                  date={resourceExecutionDate}
                  onSelect={setResourceExecutionDate}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Período de Execução - Início
                </label>
                <DatePicker
                  date={executionStartDate}
                  onSelect={setExecutionStartDate}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Período de Execução - Fim
                </label>
                <DatePicker
                  date={executionEndDate}
                  onSelect={setExecutionEndDate}
                />
              </div>
            </div>
          </div>

          <div className="p-5 border rounded-lg space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Auxílio Estudante?
              </label>
              <RadioGroup
                name="needsAssistance"
                options={[
                  { label: "Sim", value: "sim" },
                  { label: "Não", value: "nao" },
                ]}
                value={needsAssistance}
                onChange={setNeedsAssistance}
              />
            </div>

            {needsAssistance === "sim" && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-sm font-medium text-gray-700">
                  Com base na sua resposta anterior, especifique:
                </label>
                <textarea
                  value={assistanceDetails}
                  onChange={(e) => setAssistanceDetails(e.target.value)}
                  placeholder="Especifique o auxílio estudante caso necessário"
                  className="input-field min-h-[80px] resize-y"
                />
              </div>
            )}
          </div>

          <div className="p-5 border rounded-lg bg-app-lightBlue space-y-4">
            <h3 className="text-base font-semibold text-app-blue">
              RESUMO DO PROJETO
            </h3>
            <p className="text-sm text-gray-600">
              Este é um resumo do projeto. Aqui escreva uma descrição detalhada
              sobre o projeto selecionado, seus objetivos, metas e outras
              informações relevantes para a execução do plano operacional.
            </p>
            <textarea
              value={projectSummary}
              onChange={(e) => setProjectSummary(e.target.value)}
              className="input-field min-h-[120px] resize-y bg-white"
            />
          </div>

          <div className="p-5 border rounded-lg space-y-4">
            <h3 className="text-base font-semibold">
              Experimentos e Programações
            </h3>
            <ExperimentCard
              onAddProgramming={handleAddProgramming}
              onDeleteProgramming={handleDeleteProgramming}
              experimentProgrammings={experimentProgrammings}
            />
          </div>
        </div>
      </div>

      <div className="flex itens-center justify-end space-x-4 mr-6">
        <Button type="button" onClick={onCancel} className="btn-danger">
          <X className="mr-2 h-4 w-4" />
          Cancelar
        </Button>
        <Button type="submit" className="btn-primary" disabled={isSubmitting}>
          <Check className="mr-2 h-4 w-4" />
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
};

export default OperationalPlanForm;
