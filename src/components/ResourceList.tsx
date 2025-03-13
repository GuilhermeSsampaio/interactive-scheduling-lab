
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Eye } from "lucide-react";
import { Resource } from "@/types/programmingTypes";
import { resourceTypeOptions } from "@/data/resourceOptions";
import {
  getCategoryOptions,
  getItemOptions,
  getOptionLabel,
} from "@/utils/resourceUtils";

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
  if (!resources.length) return null;

  return (
    <div className="border-t pt-4 animate-fade-in">
      <h3 className="text-base font-medium mb-2">
        Recursos Adicionados ({resources.length})
      </h3>
      <div className="space-y-2">
        {resources.map((resource) => {
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

          return (
            <div
              key={resource.id}
              className="flex justify-between items-center p-2 border rounded-md bg-gray-50"
            >
              <div className="text-sm">
                <div className="font-medium">{itemLabel}</div>
                <div className="text-gray-600">
                  {typeLabel} • {categoryLabel}
                  {resource.fields && Object.entries(resource.fields).map(([key, value]) => (
                    <span key={key}>
                      {" "}
                      • {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
              {!readOnly && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveResource(resource.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {readOnly && <Eye className="h-4 w-4 text-gray-400" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceList;
