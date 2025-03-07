
import React from 'react';
import { format } from 'date-fns';
import { OperationalPlan } from '@/store/operationalPlansStore';
import { FileText, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { toast } from '@/components/ui/use-toast';

type OperationalPlansListProps = {
  plans: OperationalPlan[];
  onNew: () => void;
  onEdit: (plan: OperationalPlan) => void;
  onDelete: (id: string) => void;
};

const OperationalPlansList = ({ plans, onNew, onEdit, onDelete }: OperationalPlansListProps) => {
  const [planToDelete, setPlanToDelete] = React.useState<OperationalPlan | null>(null);

  const handleDeleteClick = (plan: OperationalPlan) => {
    setPlanToDelete(plan);
  };

  const confirmDelete = () => {
    if (planToDelete) {
      onDelete(planToDelete.id);
      toast({
        title: "Plano excluído",
        description: "O plano operacional foi excluído com sucesso.",
        duration: 3000,
      });
      setPlanToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-app-blue">Planos Operacionais</h2>
        <Button onClick={onNew} className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Novo Plano
        </Button>
      </div>

      {plans.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          <FileText className="mx-auto h-12 w-12 mb-2 opacity-20" />
          <p>Nenhum plano operacional encontrado.</p>
          <p className="text-sm">Clique em "Novo Plano" para criar um plano operacional.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center">
              <div>
                <h3 className="font-medium">{plan.title || "Plano sem título"}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <span>Tipo: {plan.projectType ? plan.projectType : "Não especificado"}</span>
                  {plan.executionStartDate && (
                    <span className="ml-4">
                      Período: {format(plan.executionStartDate, 'dd/MM/yyyy')}
                      {plan.executionEndDate && ` até ${format(plan.executionEndDate, 'dd/MM/yyyy')}`}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Atualizado em: {format(plan.updatedAt, 'dd/MM/yyyy HH:mm')}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(plan)}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(plan)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!planToDelete} onOpenChange={(open) => !open && setPlanToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir o plano "{planToDelete?.title || "sem título"}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OperationalPlansList;
