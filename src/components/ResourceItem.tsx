
import { cn } from '@/lib/utils';
import { Edit2, Trash2 } from 'lucide-react';
import React from 'react';
import { Resource } from './ResourceModal';
import { Button } from './ui/button';

type ResourceItemProps = {
  resource: Resource;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  className?: string;
};

const ResourceItem = ({ resource, onEdit, onDelete, className }: ResourceItemProps) => {
  // Convert resource type to display name
  const resourceTypeNames: Record<string, string> = {
    campo: 'Campo',
    infra: 'Infraestrutura',
    lab: 'Laboratório',
  };

  // Get resource item name from its ID
  const getResourceItemName = (type: string, item: string): string => {
    const resourceItemNames: Record<string, string> = {
      trator: 'Trator',
      colheitadeira: 'Colheitadeira',
      semeadeira: 'Semeadeira',
      galpao: 'Galpão',
      silo: 'Silo',
      armazem: 'Armazém',
      microscopio: 'Microscópio',
      estufa: 'Estufa',
      incubadora: 'Incubadora',
    };
    
    return resourceItemNames[item] || item;
  };

  return (
    <div className={cn('border rounded-md p-4 bg-white', className)}>
      <div className="flex justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">{resourceTypeNames[resource.type]}</span>
            <span className="text-gray-400">•</span>
            <span className="text-sm">{getResourceItemName(resource.type, resource.item)}</span>
          </div>
          <div className="mt-2 grid gap-y-1">
            {Object.entries(resource.fields).map(([key, value]) => (
              <div key={key} className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-1">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(resource.id)}
            className="h-8 w-8 text-gray-500 hover:text-app-blue hover:bg-app-lightBlue"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(resource.id)}
            className="h-8 w-8 text-gray-500 hover:text-app-orange hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceItem;
