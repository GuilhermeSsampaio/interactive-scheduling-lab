
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DatePicker from './DatePicker';
import Select from './Select';
import { Check, Plus, X } from 'lucide-react';
import { Programming, Resource } from '@/types/programmingTypes';
import { ResourceType, resourceTypeOptions } from '@/data/resourceOptions';
import { getCategoryOptions, getItemOptions } from '@/utils/resourceUtils';
import ResourceFieldsForm from './ResourceFieldsForm';
import ResourceList from './ResourceList';
import { v4 as uuidv4 } from 'uuid';

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
  const [resources, setResources] = useState<Resource[]>(editingProgramming?.resources || []);
  
  // Resource selection state
  const [resourceType, setResourceType] = useState<ResourceType | ''>('');
  const [resourceCategory, setResourceCategory] = useState('');
  const [resourceItem, setResourceItem] = useState('');
  const [resourceFields, setResourceFields] = useState<Record<string, string>>({});
  
  // Reset form when editing programming changes
  useEffect(() => {
    if (editingProgramming) {
      setName(editingProgramming.name);
      setStartDate(editingProgramming.startDate);
      setEndDate(editingProgramming.endDate);
      setResources(editingProgramming.resources);
    } else {
      // Only reset when not editing
      setName('');
      setStartDate(undefined);
      setEndDate(undefined);
      setResources([]);
    }
  }, [editingProgramming, open]);

  const resetResourceForm = () => {
    setResourceType('');
    setResourceCategory('');
    setResourceItem('');
    setResourceFields({});
  };

  const handleSave = () => {
    if (name && startDate && endDate) {
      const programmingId = editingProgramming?.id || uuidv4();
      
      onSave({
        id: programmingId,
        name,
        startDate,
        endDate,
        resources: resources.map(resource => ({
          ...resource,
          id: resource.id || uuidv4()
        })),
      });
      
      onOpenChange(false);
    }
  };

  const handleAddResource = () => {
    if (resourceType && resourceCategory && resourceItem) {
      const newResource: Resource = {
        id: uuidv4(),
        type: resourceType,
        categoryValue: resourceCategory,
        item: resourceItem,
        fields: resourceFields,
      };
      
      console.log("Adding resource:", newResource);
      setResources([...resources, newResource]);
      resetResourceForm();
    }
  };

  const handleRemoveResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        if (!open) resetResourceForm();
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editingProgramming ? 'Editar Programação' : 'Adicionar Nova Programação'}
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

          <div className="border-t pt-6">
            <h3 className="text-base font-medium mb-4">Adicionar Recursos</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tipo de Recurso</label>
                <Select
                  options={resourceTypeOptions}
                  value={resourceType}
                  onChange={(value) => {
                    setResourceType(value as ResourceType);
                    setResourceCategory('');
                    setResourceItem('');
                    setResourceFields({});
                  }}
                  placeholder="Selecione o tipo de recurso"
                />
              </div>

              {resourceType && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-sm font-medium text-gray-700">Recurso</label>
                  <Select
                    options={getCategoryOptions(resourceType)}
                    value={resourceCategory}
                    onChange={(value) => {
                      setResourceCategory(value);
                      setResourceItem('');
                      setResourceFields({});
                    }}
                    placeholder="Selecione o recurso"
                  />
                </div>
              )}

              {resourceType && resourceCategory && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-sm font-medium text-gray-700">
                    {resourceCategory === 'pessoas' ? 'Função' : 
                     resourceCategory === 'implementos' ? 'Implemento Agrícola' :
                     resourceCategory === 'servicos' ? 'Serviço' :
                     resourceCategory === 'maquinas' ? 'Máquina Agrícola' :
                     resourceCategory === 'area' ? 'Área' :
                     resourceCategory === 'cultura' ? 'Cultura' :
                     resourceCategory === 'viagens' ? 'Veículo' :
                     resourceCategory === 'analises' ? 'Análise' : 'Item'}
                  </label>
                  <Select
                    options={getItemOptions(resourceType, resourceCategory)}
                    value={resourceItem}
                    onChange={(value) => {
                      setResourceItem(value);
                      setResourceFields({});
                    }}
                    placeholder="Selecione um item"
                  />
                </div>
              )}

              <ResourceFieldsForm
                resourceType={resourceType}
                resourceCategory={resourceCategory}
                resourceItem={resourceItem}
                resourceFields={resourceFields}
                setResourceFields={setResourceFields}
              />

              {resourceType && resourceCategory && resourceItem && (
                <div className="mt-4 flex justify-start animate-fade-in">
                  <Button
                    type="button"
                    onClick={handleAddResource}
                    variant="resource"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Recurso
                  </Button>
                </div>
              )}
            </div>
          </div>

          <ResourceList 
            resources={resources} 
            onRemoveResource={handleRemoveResource} 
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="cancel"
            onClick={() => onOpenChange(false)}
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            variant="save"
            disabled={!name || !startDate || !endDate}
          >
            <Check className="mr-2 h-4 w-4" />
            {editingProgramming ? 'Salvar' : 'Adicionar Programação'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgrammingModal;
