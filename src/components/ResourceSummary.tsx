
import React from 'react';
import { ResourceType, resourceTypeOptions } from '@/data/resourceOptions';
import { getCategoryOptions, getItemOptions, getOptionLabel } from '@/utils/resourceUtils';

type ResourceSummaryProps = {
  resourceType: ResourceType | '';
  resourceCategory: string;
  resourceItem: string;
  resourceFields: Record<string, string>;
};

const ResourceSummary = ({
  resourceType,
  resourceCategory,
  resourceItem,
  resourceFields
}: ResourceSummaryProps) => {
  if (!resourceType || !resourceCategory || !resourceItem) return null;
  
  const categoryOptions = getCategoryOptions(resourceType);
  const itemOptions = getItemOptions(resourceType, resourceCategory);
  
  const categoryLabel = getOptionLabel(categoryOptions, resourceCategory);
  const itemLabel = getOptionLabel(itemOptions, resourceItem);
  
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md border animate-fade-in">
      <h4 className="font-medium text-sm mb-2">Resumo do recurso a ser adicionado:</h4>
      <div className="text-sm space-y-1">
        <p><span className="font-medium">Tipo:</span> {getOptionLabel(resourceTypeOptions, resourceType)}</p>
        <p><span className="font-medium">Categoria:</span> {categoryLabel}</p>
        <p><span className="font-medium">Item:</span> {itemLabel}</p>
        {Object.entries(resourceFields).map(([key, value]) => (
          <p key={key}><span className="font-medium">{key}:</span> {value}</p>
        ))}
      </div>
    </div>
  );
};

export default ResourceSummary;
