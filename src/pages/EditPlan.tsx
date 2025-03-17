
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OperationalPlanForm from '@/components/OperationalPlanForm';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { getPlanById, getProgrammingsByPlanId, getResourcesByProgrammingId, updatePlan, saveProgrammings } from '@/utils/localStorage';
import { OperationalPlan, Resource } from '@/types/programmingTypes';

const EditPlan = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [planData, setPlanData] = useState<any | null>(null);
  
  useEffect(() => {
    if (id) {
      fetchPlanData(id);
    }
  }, [id]);
  
  const fetchPlanData = (planId: string) => {
    setIsLoading(true);
    try {
      // Fetch the operational plan
      const plan = getPlanById(planId);
      
      if (!plan) {
        throw new Error("Plan not found");
      }
      
      // Fetch the programmings related to this plan
      const programmings = getProgrammingsByPlanId(planId);
      
      console.log("Fetched programmings:", programmings);
      
      // Format the data for the form
      const formattedData = {
        projectType: plan.project_type || '',
        hasAvailableResources: plan.has_available_resources ? 'sim' : 'nao',
        annualBudget: plan.annual_budget?.toString() || '',
        consumptionMaterials: plan.consumption_materials?.toString() || '',
        investments: plan.investments?.toString() || '',
        fuel: plan.fuel?.toString() || '',
        allowances: plan.allowances?.toString() || '',
        insurance: plan.insurance?.toString() || '',
        resourceExecutionDate: plan.resource_execution_date ? new Date(plan.resource_execution_date) : undefined,
        executionStartDate: plan.execution_start_date ? new Date(plan.execution_start_date) : undefined,
        executionEndDate: plan.execution_end_date ? new Date(plan.execution_end_date) : undefined,
        needsAssistance: plan.needs_assistance ? 'sim' : 'nao',
        assistanceDetails: plan.assistance_details || '',
        projectSummary: plan.project_summary || '',
        experimentProgrammings: {},
      };
      
      // Format experiment programmings
      if (programmings && programmings.length > 0) {
        const experimentProgrammings: any = {};
        
        programmings.forEach((prog: any) => {
          // Create a unique experiment ID based on the experiment name
          const experimentId = prog.experiment ? `${prog.experiment}-${uuidv4()}` : `programming-${uuidv4()}`;
          
          if (!experimentProgrammings[experimentId]) {
            experimentProgrammings[experimentId] = [];
          }
          
          // Get resources for this programming
          const resources = getResourcesByProgrammingId(prog.id);
          
          // Make sure resources are properly typed
          const typedResources: Resource[] = (resources || []).map((resource: any) => ({
            id: resource.id || uuidv4(),
            type: resource.type,
            categoryValue: resource.category_value,
            item: resource.item,
            fields: resource.fields || {},
          }));
          
          experimentProgrammings[experimentId].push({
            id: prog.id,
            name: prog.name,
            startDate: new Date(prog.start_date),
            endDate: new Date(prog.end_date),
            experiment: prog.experiment,
            resources: typedResources,
          });
        });
        
        formattedData.experimentProgrammings = experimentProgrammings;
      }
      
      console.log("Formatted data:", formattedData);
      setPlanData(formattedData);
    } catch (error: any) {
      console.error('Erro ao buscar dados do plano:', error.message);
      toast({
        title: "Erro ao carregar plano",
        description: "Não foi possível carregar os dados do plano operacional.",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (data: any) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      console.log("Submitting data:", data);
      
      // Step 1: Update the operational plan
      const operationalPlanData = {
        name: data.projectSummary.substring(0, 100) || 'Plano Operacional',
        project_type: data.projectType,
        has_available_resources: data.hasAvailableResources === 'sim',
        annual_budget: data.annualBudget ? parseFloat(data.annualBudget) : null,
        consumption_materials: data.consumptionMaterials ? parseFloat(data.consumptionMaterials) : null,
        investments: data.investments ? parseFloat(data.investments) : null,
        fuel: data.fuel ? parseFloat(data.fuel) : null,
        allowances: data.allowances ? parseFloat(data.allowances) : null,
        insurance: data.insurance ? parseFloat(data.insurance) : null,
        resource_execution_date: data.resourceExecutionDate,
        execution_start_date: data.executionStartDate,
        execution_end_date: data.executionEndDate,
        needs_assistance: data.needsAssistance === 'sim',
        assistance_details: data.assistanceDetails,
        project_summary: data.projectSummary
      };
      
      // Update the operational plan
      updatePlan(id, operationalPlanData);
      
      // Step 2: Handle the programmings
      if (data.experimentProgrammings) {
        saveProgrammings(id, data.experimentProgrammings);
      }
      
      toast({
        title: "Plano operacional atualizado",
        description: "O plano operacional foi atualizado com sucesso!",
        duration: 3000,
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Erro ao atualizar plano operacional:', error.message);
      toast({
        title: "Erro ao atualizar plano",
        description: error.message || "Não foi possível atualizar o plano operacional.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/');
    toast({
      title: "Operação cancelada",
      description: "A edição do plano operacional foi cancelada.",
      variant: "destructive",
      duration: 3000,
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-gray-500">Carregando dados do plano operacional...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-app-blue mb-6">Editar Plano Operacional</h1>
        {planData && (
          <OperationalPlanForm 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            initialData={planData}
          />
        )}
      </div>
    </div>
  );
};

export default EditPlan;
