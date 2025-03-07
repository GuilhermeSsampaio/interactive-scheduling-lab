
export type Resource = {
  id: string;
  type: 'campo' | 'infra' | 'lab';
  categoryValue: string;
  item: string;
  fields: Record<string, string>;
};

export type Programming = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  experiment?: string;
  resources: Resource[];
};
