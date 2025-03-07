
import React, { useState } from 'react';
import OperationalPlanForm from '@/components/OperationalPlanForm';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasToasted, setHasToasted] = useState(false);
  
  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form data submitted:', data);
      
      // Only show toast once
      if (!hasToasted) {
        toast({
          title: "Plano operacional cadastrado",
          description: "O plano operacional foi cadastrado com sucesso!",
          duration: 3000,
        });
        setHasToasted(true);
      }
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleCancel = () => {
    // Handle cancel logic
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
        <OperationalPlanForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default Index;
