
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OperationalPlanForm from '@/components/OperationalPlanForm';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  
  const fetchPlanData = async (planId: string) => {
    setIsLoading(true);
    try {
      // Fetch the plan
      const { data: plan, error } = await supabase
        .from('programmings')
        .select('*')
        .eq('id', planId)
        .single();
        
      if (error) throw error;
      
      // Fetch the programming experiments
      const { data: experiments, error: experimentsError } = await supabase
        .from('programmings')
        .select(`
          id,
          name,
          start_date,
          end_date,
          experiment,
          resources (*)
        `)
        .eq('experiment', plan.name)
        .order('created_at', { ascending: true });
        
      if (experimentsError) throw experimentsError;
      
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
      if (experiments && experiments.length > 0) {
        const experimentProgrammings: any = {};
        
        experiments.forEach(exp => {
          const experimentId = `${exp.experiment}-${Date.now()}`;
          
          if (!experimentProgrammings[experimentId]) {
            experimentProgrammings[experimentId] = [];
          }
          
          const resources = exp.resources.map((resource: any) => ({
            id: resource.id,
            type: resource.type,
            categoryValue: resource.category_value,
            item: resource.item,
            fields: resource.fields,
          }));
          
          experimentProgrammings[experimentId].push({
            id: exp.id,
            name: exp.name,
            startDate: new Date(exp.start_date),
            endDate: new Date(exp.end_date),
            experiment: exp.experiment,
            resources,
          });
        });
        
        formattedData.experimentProgrammings = experimentProgrammings;
      }
      
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
      // Prepare the data for update
      const planUpdateData = {
        name: data.projectSummary.substring(0, 100) || 'Plano Operacional', // Use first 100 chars of summary as name
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
      
      // Update the plan
      const { error } = await supabase
        .from('programmings')
        .update(planUpdateData)
        .eq('id', id);
        
      if (error) throw error;
      
      // Handle the experiment programmings (more complex - would require comparing existing with new)
      // This is a simplified approach - in a real project, you'd need more careful synchronization
      
      // For this example, we'll just update the programmings that are directly related to this plan
      if (data.experimentProgrammings) {
        for (const experimentId in data.experimentProgrammings) {
          const programmings = data.experimentProgrammings[experimentId];
          
          for (const programming of programmings) {
            if (programming.id) {
              // Update existing programming
              const { error: programmingError } = await supabase
                .from('programmings')
                .update({
                  name: programming.name,
                  start_date: programming.startDate,
                  end_date: programming.endDate,
                  experiment: programming.experiment,
                })
                .eq('id', programming.id);
                
              if (programmingError) throw programmingError;
              
              // Handle resources - delete existing and insert new ones
              if (programming.resources.length > 0) {
                // Delete existing resources
                const { error: deleteError } = await supabase
                  .from('resources')
                  .delete()
                  .eq('programming_id', programming.id);
                  
                if (deleteError) throw deleteError;
                
                // Insert new resources
                const resourcesData = programming.resources.map((resource: any) => ({
                  programming_id: programming.id,
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
            } else {
              // Insert new programming
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
