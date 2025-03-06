
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DatePicker from './DatePicker';
import Select from './Select';
import { Resource } from './ResourceModal';
import ResourceItem from './ResourceItem';
import { Check, Plus, X } from 'lucide-react';
import ResourceModal from './ResourceModal';

// Mock data for experiments
const experimentOptions = [
  { label: 'Teste de novas variedades de culturas agrícolas', value: 'teste-variedades' },
  { label: 'Avaliação de resistência a pragas', value: 'resistencia-pragas' },
  { label: 'Análise de crescimento em diferentes solos', value: 'analise-solos' },
];

export type Programming = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  experiment: string;
  resources: Resource[];
};

type ProgrammingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (programming: Programming) => void;
  editingProgramming?: Programming;
};

const ProgrammingModal = ({ open, onOpenChange, onSave, editingProgramming }: ProgrammingModalProps) => {
  const [name, setName] = useState(editingProgramming?.name || '');
  const [startDate, setStartDate] = useState<Date | undefined>(editingProgramming?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(editingProgramming?.endDate);
  const [experiment, setExperiment] = useState(editingProgramming?.experiment || '');
  const [resources, setResources] = useState<Resource[]>(editingProgramming?.resources || []);
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setStartDate(undefined);
    setEndDate(undefined);
    setExperiment('');
    setResources([]);
  };

  const handleSave = () => {
    if (name && startDate && endDate && experiment) {
      onSave({
        id: editingProgramming?.id || Date.now().toString(),
        name,
        startDate,
        endDate,
        experiment,
        resources,
      });
      resetForm();
      onOpenChange(false);
    }
  };

  const handleAddResource = (resource: Resource) => {
    if (editingResourceId) {
      setResources(resources.map(r => r.id === editingResourceId ? resource : r));
      setEditingResourceId(null);
    } else {
      setResources([...resources, resource]);
    }
  };

  const handleEditResource = (id: string) => {
    setEditingResourceId(id);
    setResourceModalOpen(true);
  };

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const getEditingResource = () => {
    if (!editingResourceId) return undefined;
    return resources.find(r => r.id === editingResourceId);
  };

  return (
    <>
      <Dialog 
        open={open} 
        onOpenChange={(open) => {
          if (!open && !editingProgramming) resetForm();
          onOpenChange(open);
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingProgramming ? 'Editar Programação' : 'Criar Nova Programação'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome da Programação</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome da programação"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Data Inicial</label>
                <DatePicker 
                  date={startDate} 
                  onSelect={setStartDate} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Data Final</label>
                <DatePicker 
                  date={endDate} 
                  onSelect={setEndDate} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Selecione o Experimento</label>
              <Select
                options={experimentOptions}
                value={experiment}
                onChange={setExperiment}
                placeholder="Selecione um experimento"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Recursos</h3>
                <Button
                  type="button"
                  onClick={() => {
                    setEditingResourceId(null);
                    setResourceModalOpen(true);
                  }}
                  className="btn-primary"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Inserir recursos
                </Button>
              </div>

              {resources.length > 0 ? (
                <div className="grid gap-3 animate-fade-in">
                  {resources.map((resource) => (
                    <ResourceItem
                      key={resource.id}
                      resource={resource}
                      onEdit={handleEditResource}
                      onDelete={handleDeleteResource}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 border border-dashed rounded-md">
                  Nenhum recurso adicionado
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="btn-outline"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="btn-primary"
              disabled={!name || !startDate || !endDate || !experiment}
            >
              <Check className="mr-2 h-4 w-4" />
              {editingProgramming ? 'Salvar' : 'Salvar Programação'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ResourceModal
        open={resourceModalOpen}
        onOpenChange={setResourceModalOpen}
        onAddResource={handleAddResource}
      />
    </>
  );
};

export default ProgrammingModal;
