
// Simple store for saved operational plans
import { useState, useEffect } from 'react';

export type OperationalPlan = {
  id: string;
  title: string;
  projectType: string;
  executionStartDate?: Date;
  executionEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

// In-memory store
let plans: OperationalPlan[] = [];

export const useOperationalPlans = () => {
  const [operationalPlans, setOperationalPlans] = useState<OperationalPlan[]>(plans);

  // Load plans from localStorage on first render
  useEffect(() => {
    try {
      const savedPlans = localStorage.getItem('operationalPlans');
      if (savedPlans) {
        const parsedPlans = JSON.parse(savedPlans, (key, value) => {
          // Convert date strings back to Date objects
          if (key === 'executionStartDate' || key === 'executionEndDate' || key === 'createdAt' || key === 'updatedAt') {
            return value ? new Date(value) : undefined;
          }
          return value;
        });
        plans = parsedPlans;
        setOperationalPlans(parsedPlans);
      }
    } catch (error) {
      console.error("Failed to load operational plans:", error);
    }
  }, []);

  const addPlan = (plan: Omit<OperationalPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPlan: OperationalPlan = {
      ...plan,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    plans = [...plans, newPlan];
    setOperationalPlans(plans);
    
    // Save to localStorage
    localStorage.setItem('operationalPlans', JSON.stringify(plans));
    return newPlan;
  };

  const updatePlan = (id: string, updates: Partial<Omit<OperationalPlan, 'id' | 'createdAt'>>) => {
    const planIndex = plans.findIndex(p => p.id === id);
    if (planIndex === -1) return false;
    
    plans = plans.map(plan => 
      plan.id === id 
        ? { ...plan, ...updates, updatedAt: new Date() } 
        : plan
    );
    
    setOperationalPlans(plans);
    localStorage.setItem('operationalPlans', JSON.stringify(plans));
    return true;
  };

  const deletePlan = (id: string) => {
    plans = plans.filter(plan => plan.id !== id);
    setOperationalPlans(plans);
    localStorage.setItem('operationalPlans', JSON.stringify(plans));
  };

  return {
    plans: operationalPlans,
    addPlan,
    updatePlan,
    deletePlan
  };
};
