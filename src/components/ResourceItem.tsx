
import React from 'react';
import { Resource } from './ResourceModal';
import { Button } from './ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ResourceItemProps = {
  resource: Resource;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  className?: string;
};

const ResourceItem = ({ resource, onEdit, onDelete, className }: ResourceItemProps) => {
  // Get the type display name
  const getResourceTypeName = (type: string): string => {
    const types: Record<string, string> = {
      'campo': 'Campo',
      'infra': 'Infraestrutura',
      'lab': 'Laboratório',
    };
    
    return types[type] || type;
  };

  return (
    <div className={cn(
      "flex justify-between items-start p-3 border rounded-md bg-white shadow-sm",
      className
    )}>
      <div className="space-y-1">
        <div className="font-medium">{resource.item}</div>
        <div className="text-sm text-gray-600">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-app-lightBlue text-app-blue mr-2">
            {getResourceTypeName(resource.type)}
          </span>
          {resource.fields?.['Quantidade'] && 
            <span className="text-gray-600 mr-2">Quantidade: {resource.fields['Quantidade']}</span>
          }
          {resource.fields?.['Quilometragem'] && 
            <span className="text-gray-600 mr-2">Quilometragem: {resource.fields['Quilometragem']} km</span>
          }
          {resource.fields?.['Diárias'] && 
            <span className="text-gray-600">Diárias: {resource.fields['Diárias']}</span>
          }
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(resource.id)}
          className="h-8 w-8 p-0 text-gray-500 hover:text-app-blue hover:bg-app-lightBlue"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(resource.id)}
          className="h-8 w-8 p-0 text-gray-500 hover:text-app-orange hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
      </div>
    </div>
  );
};

export default ResourceItem;
