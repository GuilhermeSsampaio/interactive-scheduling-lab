
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Select from './Select';
import { Check, X, Plus } from 'lucide-react';

type ResourceType = 'campo' | 'infra' | 'lab';

// Mock data for the resources
const resourceOptions = [
  { label: 'Campo', value: 'campo' },
  { label: 'Infra', value: 'infra' },
  { label: 'Lab', value: 'lab' },
];

const resourceItems: Record<ResourceType, { label: string; value: string }[]> = {
  campo: [
    { label: 'Trator', value: 'trator' },
    { label: 'Colheitadeira', value: 'colheitadeira' },
    { label: 'Semeadeira', value: 'semeadeira' },
  ],
  infra: [
    { label: 'Galpão', value: 'galpao' },
    { label: 'Silo', value: 'silo' },
    { label: 'Armazém', value: 'armazem' },
  ],
  lab: [
    { label: 'Microscópio', value: 'microscopio' },
    { label: 'Estufa', value: 'estufa' },
    { label: 'Incubadora', value: 'incubadora' },
  ],
};

// Additional fields based on resource type
const additionalFields: Record<string, { type: string; label: string; placeholder?: string }[]> = {
  trator: [
    { type: 'number', label: 'Quantidade', placeholder: 'Ex: 1' },
    { type: 'text', label: 'Modelo', placeholder: 'Ex: John Deere 6120R' },
    { type: 'number', label: 'Quilometragem', placeholder: 'Ex: 50 km' },
  ],
  colheitadeira: [
    { type: 'number', label: 'Quantidade', placeholder: 'Ex: 1' },
    { type: 'text', label: 'Modelo', placeholder: 'Ex: Case IH 8120' },
  ],
  semeadeira: [
    { type: 'number', label: 'Quantidade', placeholder: 'Ex: 1' },
    { type: 'text', label: 'Tipo', placeholder: 'Ex: Pneumática' },
  ],
  galpao: [
    { type: 'text', label: 'Localização', placeholder: 'Ex: Setor Norte' },
    { type: 'number', label: 'Área (m²)', placeholder: 'Ex: 500' },
  ],
  microscopio: [
    { type: 'number', label: 'Quantidade', placeholder: 'Ex: 2' },
    { type: 'text', label: 'Tipo', placeholder: 'Ex: Óptico' },
  ],
};

export type Resource = {
  id: string;
  type: ResourceType;
  item: string;
  fields: Record<string, string>;
};

type ResourceModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddResource: (resource: Resource) => void;
};

const ResourceModal = ({ open, onOpenChange, onAddResource }: ResourceModalProps) => {
  const [resourceType, setResourceType] = useState<ResourceType | ''>('');
  const [resourceItem, setResourceItem] = useState('');
  const [fields, setFields] = useState<Record<string, string>>({});

  const resetForm = () => {
    setResourceType('');
    setResourceItem('');
    setFields({});
  };

  const handleAddResource = () => {
    if (resourceType && resourceItem) {
      onAddResource({
        id: Date.now().toString(),
        type: resourceType as ResourceType,
        item: resourceItem,
        fields,
      });
      resetForm();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Adicionar Recurso</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Categoria de Recurso</label>
            <Select
              options={resourceOptions}
              value={resourceType}
              onChange={(value) => {
                setResourceType(value as ResourceType);
                setResourceItem('');
                setFields({});
              }}
              placeholder="Selecione uma categoria"
            />
          </div>

          {resourceType && (
            <div className="space-y-2 animate-fade-in">
              <label className="text-sm font-medium text-gray-700">Item</label>
              <Select
                options={resourceItems[resourceType as ResourceType] || []}
                value={resourceItem}
                onChange={(value) => {
                  setResourceItem(value);
                  setFields({});
                }}
                placeholder="Selecione um item"
              />
            </div>
          )}

          {resourceItem && additionalFields[resourceItem] && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-medium text-gray-700">Informações Adicionais</h3>
              <div className="grid gap-4">
                {additionalFields[resourceItem].map((field, index) => (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="input-field"
                      value={fields[field.label] || ''}
                      onChange={(e) => setFields({ ...fields, [field.label]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
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
            onClick={handleAddResource}
            className="btn-primary"
            disabled={!resourceType || !resourceItem}
          >
            <Check className="mr-2 h-4 w-4" />
            Adicionar Recurso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceModal;
