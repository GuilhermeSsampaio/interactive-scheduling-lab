
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OperationalPlanForm from '@/components/OperationalPlanForm';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CreatePlan = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the data for insertion
      const planData = {
        name: data.projectSummary.substring(0, 100) || 'Novo Plano Operacional', // Use first 100 chars of summary as name
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
        project_summary: data.projectSummary,
      };
      
      // Insert the plan
      const { data: insertedPlan, error } = await supabase
        .from('programmings')
        .insert(planData)
        .select('id')
        .single();
        
      if (error) throw error;
      
      // Now handle the experiment programmings
      if (insertedPlan && data.experimentProgrammings) {
        for (const experimentId in data.experimentProgrammings) {
          const programmings = data.experimentProgrammings[experimentId];
          
          for (const programming of programmings) {
            // Insert the programming
            const { data: insertedProgramming, error: programmingError } = await supabase
              .from('programmings')
              .insert({
                name: programming.name,
                start_date: programming.startDate,
                end_date: programming.endDate,
                experiment: programming.experiment,
              })
              .select('id')
              .single();
              
            if (programmingError) throw programmingError;
            
            // Insert the resources associated with this programming
            if (insertedProgramming && programming.resources.length > 0) {
              const resourcesData = programming.resources.map((resource: any) => ({
                programming_id: insertedProgramming.id,
                type: resource.type,
                category_value: resource.categoryValue,
                item: resource.item,
                fields: resource.fields,
              }));
              
              const { error: resourcesError } = await supabase
                .from('resources')
                .insert(resourcesData);
                
              if (resourcesError) throw resourcesError;
            }
          }
        }
      }
      
      toast({
        title: "Plano operacional cadastrado",
        description: "O plano operacional foi cadastrado com sucesso!",
        duration: 3000,
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Erro ao cadastrar plano operacional:', error.message);
      toast({
        title: "Erro ao cadastrar plano",
        description: error.message || "Não foi possível cadastrar o plano operacional.",
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
      description: "O cadastro do plano operacional foi cancelado.",
      variant: "destructive",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-app-blue mb-6">Criar Novo Plano Operacional</h1>
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
