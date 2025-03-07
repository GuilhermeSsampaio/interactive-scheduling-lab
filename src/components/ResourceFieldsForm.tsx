
import React from 'react';
import { ResourceType } from '@/data/resourceOptions';

type ResourceFieldsFormProps = {
  resourceType: ResourceType | '';
  resourceCategory: string;
  resourceItem: string;
  resourceFields: Record<string, string>;
  setResourceFields: (fields: Record<string, string>) => void;
};

const ResourceFieldsForm = ({ 
  resourceType, 
  resourceCategory, 
  resourceItem,
  resourceFields,
  setResourceFields
}: ResourceFieldsFormProps) => {
  if (!resourceType || !resourceCategory || !resourceItem) return null;

  const fields = [];

  // Common fields for pessoas
  if (resourceCategory === 'pessoas') {
    fields.push(
      <div key="quantidade" className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Quantidade</label>
        <input
          type="number"
          value={resourceFields['Quantidade'] || ''}
          onChange={(e) => setResourceFields({...resourceFields, 'Quantidade': e.target.value})}
          className="input-field"
          placeholder="Quantidade necessária"
        />
      </div>
    );
    
    fields.push(
      <div key="diarias" className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Diárias</label>
        <input
          type="number"
          value={resourceFields['Diárias'] || ''}
          onChange={(e) => setResourceFields({...resourceFields, 'Diárias': e.target.value})}
          className="input-field"
          placeholder="Quantidade de diárias"
        />
      </div>
    );
  }

  // Fields for implementos agricolas
  if (resourceCategory === 'implementos') {
    fields.push(
      <div key="quantidade" className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Quantidade</label>
        <input
          type="number"
          value={resourceFields['Quantidade'] || ''}
          onChange={(e) => setResourceFields({...resourceFields, 'Quantidade': e.target.value})}
          className="input-field"
          placeholder="Quantidade necessária"
        />
      </div>
    );
  }

  // Fields for maquinas agricolas
  if (resourceCategory === 'maquinas') {
    fields.push(
      <div key="quilometragem" className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Quilometragem/Km</label>
        <input
          type="number"
          value={resourceFields['Quilometragem'] || ''}
          onChange={(e) => setResourceFields({...resourceFields, 'Quilometragem': e.target.value})}
          className="input-field"
          placeholder="Distância a ser percorrida"
        />
      </div>
    );
  }

  // Fields for viagens
  if (resourceCategory === 'viagens') {
    fields.push(
      <div key="quilometragem" className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Quilometragem/Km</label>
        <input
          type="number"
          value={resourceFields['Quilometragem'] || ''}
          onChange={(e) => setResourceFields({...resourceFields, 'Quilometragem': e.target.value})}
          className="input-field"
          placeholder="Distância a ser percorrida"
        />
      </div>
    );
  }

  // Fields for analises
  if (resourceCategory === 'analises') {
    fields.push(
      <div key="quantidade" className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Quantidade</label>
        <input
          type="number"
          value={resourceFields['Quantidade'] || ''}
          onChange={(e) => setResourceFields({...resourceFields, 'Quantidade': e.target.value})}
          className="input-field"
          placeholder="Quantidade de análises"
        />
      </div>
    );
  }

  return fields.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in mt-4">
      {fields}
    </div>
  ) : null;
};

export default ResourceFieldsForm;
