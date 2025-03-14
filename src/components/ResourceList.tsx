
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Resource } from "@/types/programmingTypes";
import { resourceTypeOptions } from "@/data/resourceOptions";
import {
  getCategoryOptions,
  getItemOptions,
  getOptionLabel,
} from "@/utils/resourceUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ResourceListProps = {
  resources: Resource[];
  onRemoveResource: (id: string) => void;
  readOnly?: boolean;
};

const ResourceList = ({
  resources,
  onRemoveResource,
  readOnly = false,
}: ResourceListProps) => {
  if (!resources || !resources.length) return null;

  return (
    <div className="pt-4 animate-fade-in">
      <h3 className="text-base font-medium mb-2">
        Recursos Adicionados ({resources.length})
      </h3>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Detalhes</TableHead>
              {!readOnly && <TableHead className="w-24">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => {
              // Make sure we have valid data before trying to render
              if (!resource || !resource.type || !resource.categoryValue) {
                console.warn("Invalid resource data:", resource);
                return null;
              }
              
              const categoryOptions = getCategoryOptions(resource.type);
              const itemOptions = getItemOptions(
                resource.type,
                resource.categoryValue
              );

              const categoryLabel = getOptionLabel(
                categoryOptions,
                resource.categoryValue
              );
              const itemLabel = getOptionLabel(itemOptions, resource.item);
              const typeLabel = getOptionLabel(resourceTypeOptions, resource.type);

              // Prepare details fields
              const detailsContent = resource.fields 
                ? Object.entries(resource.fields)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")
                : "";

              return (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{itemLabel}</TableCell>
                  <TableCell>{typeLabel}</TableCell>
                  <TableCell>{categoryLabel}</TableCell>
                  <TableCell className="text-sm text-gray-600">{detailsContent}</TableCell>
                  {!readOnly && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveResource(resource.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Remover</span>
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResourceList;
