import React, { useState } from "react";
import { Programming } from "@/types/programmingTypes";
import { Button } from "./ui/button";
import { format } from "date-fns";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ResourceList from "./ResourceList";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

type ProgrammingListProps = {
  programmings: Programming[];
  onAddProgramming: () => void;
  onEditProgramming: (programming: Programming) => void;
  onDeleteProgramming: (id: string) => void;
  className?: string;
  hideAddButton?: boolean;
};

const ProgrammingList = ({
  programmings,
  onAddProgramming,
  onEditProgramming,
  onDeleteProgramming,
  className,
  hideAddButton = false,
}: ProgrammingListProps) => {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={cn("space-y-4", className)}>
      {!hideAddButton && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Programações do Plano Operacional
          </h3>
          <Button onClick={onAddProgramming} className="btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Criar Nova Programação
          </Button>
        </div>
      )}

      {programmings.length > 0 ? (
        <div className="grid gap-4 animate-fade-in">
          {programmings.map((programming) => (
            <Collapsible
              key={programming.id}
              open={expandedCards[programming.id]}
              onOpenChange={() => toggleCard(programming.id)}
              className="border rounded-lg bg-white overflow-hidden"
            >
              <div className="p-4 flex justify-between items-center">
                <div className="space-y-2">
                  <h4 className="font-medium text-lg flex items-center">
                    {programming.name}
                    {programming.resources.length > 0 && (
                      <span className="ml-2 text-sm text-gray-600">
                        (Recursos: {programming.resources.length})
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {format(programming.startDate, "dd/MM/yyyy")} até{" "}
                      {format(programming.endDate, "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditProgramming(programming)}
                    className="h-9 justify-center gap-1.5"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteProgramming(programming.id)}
                    className="h-9 justify-center gap-1.5 text-app-orange border-app-orange hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <CollapsibleTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 justify-center gap-1.5"
                    >
                      {expandedCards[programming.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>

              <CollapsibleContent>
                <div className="border-t">
                  <div className="p-4">
                    {programming.resources.length > 0 ? (
                      <ResourceList
                        resources={programming.resources}
                        onRemoveResource={() => {}} // Empty function as we're just viewing
                        readOnly={true}
                      />
                    ) : (
                      <div className="text-center py-6 border border-dashed rounded-md bg-gray-50">
                        <p className="text-gray-500">
                          Nenhum recurso adicionado para esta programação
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed rounded-md bg-gray-50">
          <p className="text-gray-500">Nenhuma programação adicionada</p>
          <Button onClick={onAddProgramming} variant="outline" className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Criar Nova Programação
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProgrammingList;
