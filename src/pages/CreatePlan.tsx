import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OperationalPlanForm from "@/components/OperationalPlanForm";
import { toast } from "@/components/ui/use-toast";
import { savePlan, saveProgrammings } from "@/utils/localStorage";

const CreatePlan = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      console.log("Submitting data:", data);

      // Step 1: Insert the operational plan
      const operationalPlanData = {
        name: data.projectSummary.substring(0, 100) || "Novo Plano Operacional",
        project_type: data.projectType,
        has_available_resources: data.hasAvailableResources === "sim",
        annual_budget: data.annualBudget ? parseFloat(data.annualBudget) : null,
        consumption_materials: data.consumptionMaterials
          ? parseFloat(data.consumptionMaterials)
          : null,
        investments: data.investments ? parseFloat(data.investments) : null,
        fuel: data.fuel ? parseFloat(data.fuel) : null,
        allowances: data.allowances ? parseFloat(data.allowances) : null,
        insurance: data.insurance ? parseFloat(data.insurance) : null,
        resource_execution_date: data.resourceExecutionDate,
        execution_start_date: data.executionStartDate,
        execution_end_date: data.executionEndDate,
        needs_assistance: data.needsAssistance === "sim",
        assistance_details: data.assistanceDetails,
        project_summary: data.projectSummary,
      };

      // Insert the operational plan
      const insertedPlan = savePlan(operationalPlanData);

      if (!insertedPlan) {
        throw new Error("Failed to create operational plan");
      }

      const planId = insertedPlan.id;

      // Step 2: Save programmings and resources
      if (planId && data.experimentProgrammings) {
        saveProgrammings(planId, data.experimentProgrammings);
      }

      toast({
        title: "Plano operacional cadastrado",
        description: "O plano operacional foi cadastrado com sucesso!",
        duration: 3000,
      });

      // Limpar formulário ou reiniciar os campos, em vez de redirecionar
      // Você pode adicionar lógica para resetar o formulário aqui
    } catch (error: any) {
      console.error("Erro ao cadastrar plano operacional:", error.message);
      toast({
        title: "Erro ao cadastrar plano",
        description:
          error.message || "Não foi possível cadastrar o plano operacional.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Apenas limpamos o formulário sem redirecionamento
    toast({
      title: "Operação cancelada",
      description: "O cadastro do plano operacional foi cancelado.",
      variant: "destructive",
      duration: 3000,
    });

    // Opcional: Lógica para limpar o formulário
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-app-blue mb-6">
          Criar Novo Plano Operacional
        </h1>
        <OperationalPlanForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CreatePlan;
