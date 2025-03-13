
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

export type OperationalPlan = {
  id: string;
  name: string;
  project_type: string;
  has_available_resources: boolean;
  annual_budget: number | null;
  consumption_materials: number | null;
  investments: number | null;
  fuel: number | null;
  allowances: number | null;
  insurance: number | null;
  resource_execution_date: string | null;
  execution_start_date: string | null;
  execution_end_date: string | null;
  needs_assistance: boolean;
  assistance_details: string | null;
  project_summary: string | null;
  created_at: string;
};
