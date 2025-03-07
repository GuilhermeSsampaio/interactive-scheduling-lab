
import React, { useState } from 'react';
import OperationalPlanForm from '@/components/OperationalPlanForm';
import OperationalPlansList from '@/components/OperationalPlansList';
import { toast } from '@/components/ui/use-toast';
import { useOperationalPlans, OperationalPlan } from '@/store/operationalPlansStore';

const Index = () => {
  const { plans, addPlan, updatePlan, deletePlan } = useOperationalPlans();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<OperationalPlan | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const handleNewPlan = () => {
    setCurrentPlan(null);
    setIsEditing(false);
    setShowForm(true);
  };
  
  const handleEditPlan = (plan: OperationalPlan) => {
    setCurrentPlan(plan);
    setIsEditing(true);
    setShowForm(true);
  };
  
  const handleSubmit = (data: any) => {
    if (isEditing && currentPlan) {
      // Update existing plan
      updatePlan(currentPlan.id, {
        title: data.projectSummary.substring(0, 50) || "Plano sem título",
        projectType: data.projectType,
        executionStartDate: data.executionStartDate,
        executionEndDate: data.executionEndDate,
      });
      
      toast({
        title: "Plano operacional atualizado",
        description: "O plano operacional foi atualizado com sucesso!",
        duration: 3000,
      });
    } else {
      // Add new plan
      addPlan({
        title: data.projectSummary.substring(0, 50) || "Plano sem título",
        projectType: data.projectType,
        executionStartDate: data.executionStartDate,
        executionEndDate: data.executionEndDate,
      });
      
      toast({
        title: "Plano operacional cadastrado",
        description: "O plano operacional foi cadastrado com sucesso!",
        duration: 3000,
      });
    }
    
    // Return to list view
    setShowForm(false);
  };
  
  const handleCancel = () => {
    setShowForm(false);
    
    toast({
      title: "Operação cancelada",
      description: "O cadastro do plano operacional foi cancelado.",
      variant: "destructive",
      duration: 3000,
    });
  };

  const handleDeletePlan = (id: string) => {
    deletePlan(id);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {showForm ? (
          <OperationalPlanForm 
            initialData={currentPlan}
            isEditing={isEditing}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <OperationalPlansList
            plans={plans}
            onNew={handleNewPlan}
            onEdit={handleEditPlan}
            onDelete={handleDeletePlan}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
