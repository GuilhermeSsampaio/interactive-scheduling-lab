
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type OperationalPlan = {
  id: string;
  name: string;
  project_type: string;
  annual_budget: number;
  execution_start_date: string;
  execution_end_date: string;
  created_at: string;
};

const Home = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<OperationalPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('programmings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPlans(data || []);
    } catch (error: any) {
      console.error('Erro ao buscar planos operacionais:', error.message);
      toast({
        title: "Erro ao carregar planos",
        description: "Não foi possível carregar os planos operacionais.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePlan = () => {
    navigate('/create');
  };

  const handleEditPlan = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const confirmDelete = (id: string) => {
    setPlanToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeletePlan = async () => {
    if (!planToDelete) return;
    
    try {
      const { error } = await supabase
        .from('programmings')
        .delete()
        .eq('id', planToDelete);

      if (error) {
        throw error;
      }

      toast({
        title: "Plano operacional excluído",
        description: "O plano operacional foi excluído com sucesso.",
      });
      
      // Atualiza a lista de planos após exclusão
      setPlans(plans.filter(plan => plan.id !== planToDelete));
    } catch (error: any) {
      console.error('Erro ao excluir plano operacional:', error.message);
      toast({
        title: "Erro ao excluir plano",
        description: "Não foi possível excluir o plano operacional.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPlanToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (e) {
      return "-";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold text-app-blue">Planos Operacionais</CardTitle>
          <Button onClick={handleCreatePlan} className="btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Novo Plano Operacional
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Carregando planos operacionais...</p>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-8 border border-dashed rounded-md bg-gray-50">
              <p className="text-gray-500 mb-4">Nenhum plano operacional cadastrado</p>
              <Button onClick={handleCreatePlan} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Plano
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo de Projeto</TableHead>
                    <TableHead>Orçamento Anual</TableHead>
                    <TableHead>Início da Execução</TableHead>
                    <TableHead>Fim da Execução</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>{plan.project_type || "-"}</TableCell>
                      <TableCell>
                        {plan.annual_budget 
                          ? `R$ ${Number(plan.annual_budget).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                          : "-"}
                      </TableCell>
                      <TableCell>{formatDate(plan.execution_start_date)}</TableCell>
                      <TableCell>{formatDate(plan.execution_end_date)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditPlan(plan.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-app-orange border-app-orange hover:bg-red-50"
                            onClick={() => confirmDelete(plan.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Plano Operacional</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este plano operacional? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlan} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Home;
