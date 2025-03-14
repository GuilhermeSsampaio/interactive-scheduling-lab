
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OperationalPlanForm from '@/components/OperationalPlanForm';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { OperationalPlan, Resource } from '@/types/programmingTypes';
import { v4 as uuidv4 } from 'uuid';

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
      
      // Cast the plan data to the OperationalPlan type
      const typedPlan = plan as OperationalPlan;
      
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
        .eq('experiment', typedPlan.name)
        .order('created_at', { ascending: true });
        
      if (experimentsError) throw experimentsError;
      
      console.log("Fetched experiments:", experiments);
      
      // Format the data for the form
      const formattedData = {
        projectType: typedPlan.project_type || '',
        hasAvailableResources: typedPlan.has_available_resources ? 'sim' : 'nao',
        annualBudget: typedPlan.annual_budget?.toString() || '',
        consumptionMaterials: typedPlan.consumption_materials?.toString() || '',
        investments: typedPlan.investments?.toString() || '',
        fuel: typedPlan.fuel?.toString() || '',
        allowances: typedPlan.allowances?.toString() || '',
        insurance: typedPlan.insurance?.toString() || '',
        resourceExecutionDate: typedPlan.resource_execution_date ? new Date(typedPlan.resource_execution_date) : undefined,
        executionStartDate: typedPlan.execution_start_date ? new Date(typedPlan.execution_start_date) : undefined,
        executionEndDate: typedPlan.execution_end_date ? new Date(typedPlan.execution_end_date) : undefined,
        needsAssistance: typedPlan.needs_assistance ? 'sim' : 'nao',
        assistanceDetails: typedPlan.assistance_details || '',
        projectSummary: typedPlan.project_summary || '',
        experimentProgrammings: {},
      };
      
      // Format experiment programmings
      if (experiments && experiments.length > 0) {
        const experimentProgrammings: any = {};
        
        experiments.forEach(exp => {
          // Create a unique experiment ID with a proper UUID
          const experimentId = `${exp.experiment}-${uuidv4()}`;
          
          if (!experimentProgrammings[experimentId]) {
            experimentProgrammings[experimentId] = [];
          }
          
          // Make sure resources are properly typed
          const resources: Resource[] = (exp.resources || []).map((resource: any) => ({
            id: resource.id || uuidv4(),
            type: resource.type,
            categoryValue: resource.category_value,
            item: resource.item,
            fields: resource.fields || {},
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
      
      // Prepare the data for update
      const planUpdateData = {
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
        project_summary: data.projectSummary,
        // Add required fields from DB schema if they're missing
        start_date: data.executionStartDate || new Date(),
        end_date: data.executionEndDate || new Date()
      };
      
      // Update the plan
      const { error } = await supabase
        .from('programmings')
        .update(planUpdateData)
        .eq('id', id);
        
      if (error) throw error;
      
      // Handle the experiment programmings
      if (data.experimentProgrammings) {
        for (const experimentId in data.experimentProgrammings) {
          const programmings = data.experimentProgrammings[experimentId];
          
          for (const programming of programmings) {
            console.log("Processing programming:", programming);
            
            if (programming.id && typeof programming.id === 'string' && programming.id.includes('-')) {
              // Update existing programming
              const { data: updatedProgramming, error: programmingError } = await supabase
                .from('programmings')
                .update({
                  name: programming.name,
                  start_date: programming.startDate,
                  end_date: programming.endDate,
                  experiment: programming.experiment,
                })
                .eq('id', programming.id)
                .select('id')
                .single();
                
              if (programmingError) throw programmingError;
              
              // Handle resources - delete existing and insert new ones
              if (programming.resources && programming.resources.length > 0) {
                // Delete existing resources
                const { error: deleteError } = await supabase
                  .from('resources')
                  .delete()
                  .eq('programming_id', programming.id);
                  
                if (deleteError) throw deleteError;
                
                // Insert new resources
                const resourcesData = programming.resources.map((resource: any) => ({
                  id: uuidv4(), // Generate a new UUID for each resource
                  programming_id: programming.id, // Use the programming ID from the update
                  type: resource.type,
                  category_value: resource.categoryValue,
                  item: resource.item,
                  fields: resource.fields || {},
                }));
                
                console.log("Inserting updated resources for programming:", programming.id);
                console.log("Resources data:", resourcesData);
                
                const { error: resourcesError } = await supabase
                  .from('resources')
                  .insert(resourcesData);
                  
                if (resourcesError) throw resourcesError;
              }
            } else {
              // Generate a proper UUID for new programming
              const programmingId = uuidv4();
              
              // Insert new programming
              const { data: createdProgramming, error: programmingError } = await supabase
                .from('programmings')
                .insert({
                  id: programmingId,
                  name: programming.name,
                  start_date: programming.startDate,
                  end_date: programming.endDate,
                  experiment: programming.experiment,
                })
                .select('id')
                .single();
                
              if (programmingError) throw programmingError;
              
              if (!createdProgramming || !createdProgramming.id) {
                throw new Error("Failed to get programming ID after insertion");
              }
              
              // Insert the resources associated with this programming
              if (programming.resources && programming.resources.length > 0) {
                const resourcesData = programming.resources.map((resource: any) => ({
                  id: uuidv4(), // Generate a new UUID for each resource
                  programming_id: createdProgramming.id, // Use the confirmed programming ID
                  type: resource.type,
                  category_value: resource.categoryValue,
                  item: resource.item,
                  fields: resource.fields || {},
                }));
                
                console.log("Inserting resources for new programming:", createdProgramming.id);
                console.log("Resources data:", resourcesData);
                
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
