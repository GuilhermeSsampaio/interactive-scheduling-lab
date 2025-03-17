
import { OperationalPlan, Programming, Resource } from "@/types/programmingTypes";
import { v4 as uuidv4 } from 'uuid';

// Initialize local storage with empty arrays if not exists
export const initializeLocalStorage = () => {
  if (!localStorage.getItem('operational_plans')) {
    localStorage.setItem('operational_plans', JSON.stringify([]));
  }
  if (!localStorage.getItem('programmings')) {
    localStorage.setItem('programmings', JSON.stringify([]));
  }
  if (!localStorage.getItem('resources')) {
    localStorage.setItem('resources', JSON.stringify([]));
  }
};

// Get all plans
export const getPlans = (): OperationalPlan[] => {
  initializeLocalStorage();
  return JSON.parse(localStorage.getItem('operational_plans') || '[]');
};

// Get a single plan by ID
export const getPlanById = (id: string): OperationalPlan | null => {
  const plans = getPlans();
  return plans.find(plan => plan.id === id) || null;
};

// Get programmings for a plan
export const getProgrammingsByPlanId = (planId: string) => {
  initializeLocalStorage();
  const programmings = JSON.parse(localStorage.getItem('programmings') || '[]');
  return programmings.filter((prog: any) => prog.plan_id === planId);
};

// Get resources for a programming
export const getResourcesByProgrammingId = (programmingId: string) => {
  initializeLocalStorage();
  const resources = JSON.parse(localStorage.getItem('resources') || '[]');
  return resources.filter((res: any) => res.programming_id === programmingId);
};

// Save a new plan
export const savePlan = (planData: Omit<OperationalPlan, 'id' | 'created_at'>) => {
  const plans = getPlans();
  const newPlan = {
    ...planData,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  
  plans.push(newPlan);
  localStorage.setItem('operational_plans', JSON.stringify(plans));
  return newPlan;
};

// Update an existing plan
export const updatePlan = (id: string, planData: Partial<OperationalPlan>) => {
  const plans = getPlans();
  const index = plans.findIndex(plan => plan.id === id);
  
  if (index !== -1) {
    plans[index] = {
      ...plans[index],
      ...planData
    };
    localStorage.setItem('operational_plans', JSON.stringify(plans));
    return plans[index];
  }
  return null;
};

// Delete a plan and its associated programmings and resources
export const deletePlan = (id: string) => {
  // Delete the plan
  const plans = getPlans();
  const filteredPlans = plans.filter(plan => plan.id !== id);
  localStorage.setItem('operational_plans', JSON.stringify(filteredPlans));
  
  // Get programmings for this plan
  const allProgrammings = JSON.parse(localStorage.getItem('programmings') || '[]');
  const planProgrammings = allProgrammings.filter((prog: any) => prog.plan_id === id);
  const programmingIds = planProgrammings.map((prog: any) => prog.id);
  
  // Delete those programmings
  const remainingProgrammings = allProgrammings.filter((prog: any) => prog.plan_id !== id);
  localStorage.setItem('programmings', JSON.stringify(remainingProgrammings));
  
  // Delete resources associated with those programmings
  const allResources = JSON.parse(localStorage.getItem('resources') || '[]');
  const remainingResources = allResources.filter(
    (res: any) => !programmingIds.includes(res.programming_id)
  );
  localStorage.setItem('resources', JSON.stringify(remainingResources));
  
  return true;
};

// Save programmings and their resources
export const saveProgrammings = (
  planId: string, 
  experimentProgrammings: Record<string, Programming[]>
) => {
  const allProgrammings = JSON.parse(localStorage.getItem('programmings') || '[]');
  const allResources = JSON.parse(localStorage.getItem('resources') || '[]');
  
  // First, find existing programmings for this plan to potentially remove them
  const existingProgrammingIds = allProgrammings
    .filter((prog: any) => prog.plan_id === planId)
    .map((prog: any) => prog.id);
  
  // Remove existing resources for these programmings
  const remainingResources = allResources.filter(
    (res: any) => !existingProgrammingIds.includes(res.programming_id)
  );
  
  // Remove existing programmings for this plan
  const remainingProgrammings = allProgrammings.filter(
    (prog: any) => prog.plan_id !== planId
  );
  
  // Process new programmings and resources
  const newProgrammings: any[] = [];
  const newResources: any[] = [];
  
  for (const experimentId in experimentProgrammings) {
    const programmings = experimentProgrammings[experimentId];
    
    for (const programming of programmings) {
      const programmingId = programming.id || uuidv4();
      
      // Add programming
      newProgrammings.push({
        id: programmingId,
        name: programming.name,
        start_date: programming.startDate.toISOString(),
        end_date: programming.endDate.toISOString(),
        experiment: programming.experiment,
        plan_id: planId,
        created_at: new Date().toISOString()
      });
      
      // Add resources
      if (programming.resources) {
        for (const resource of programming.resources) {
          newResources.push({
            id: resource.id || uuidv4(),
            programming_id: programmingId,
            type: resource.type,
            category_value: resource.categoryValue,
            item: resource.item,
            fields: resource.fields || {},
            created_at: new Date().toISOString()
          });
        }
      }
    }
  }
  
  // Save updated data
  localStorage.setItem('programmings', JSON.stringify([...remainingProgrammings, ...newProgrammings]));
  localStorage.setItem('resources', JSON.stringify([...remainingResources, ...newResources]));
  
  return true;
};
