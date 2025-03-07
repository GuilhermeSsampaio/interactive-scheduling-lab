
import { ResourceType } from '@/data/resourceOptions';
import * as resourceOptions from '@/data/resourceOptions';

// Get category options based on resource type
export const getCategoryOptions = (resourceType: ResourceType | '') => {
  switch (resourceType) {
    case 'campo':
      return resourceOptions.campoResourceOptions;
    case 'infra':
      return resourceOptions.infraResourceOptions;
    case 'lab':
      return resourceOptions.labResourceOptions;
    default:
      return [];
  }
};

// Get item options based on resource type and category
export const getItemOptions = (resourceType: ResourceType | '', resourceCategory: string) => {
  if (resourceType === 'campo') {
    switch (resourceCategory) {
      case 'pessoas':
        return resourceOptions.campoPessoasOptions;
      case 'implementos':
        return resourceOptions.campoImplementosOptions;
      case 'servicos':
        return resourceOptions.campoServicosOptions;
      case 'maquinas':
        return resourceOptions.campoMaquinasOptions;
      case 'area':
        return resourceOptions.campoAreaOptions;
      case 'cultura':
        return resourceOptions.campoCulturaOptions;
      default:
        return [];
    }
  } else if (resourceType === 'infra') {
    switch (resourceCategory) {
      case 'pessoas':
        return resourceOptions.infraPessoasOptions;
      case 'viagens':
        return resourceOptions.infraViagensOptions;
      default:
        return [];
    }
  } else if (resourceType === 'lab') {
    switch (resourceCategory) {
      case 'analises':
        return resourceOptions.labAnalisesOptions;
      default:
        return [];
    }
  }
  
  return [];
};

// Get option label from value
export const getOptionLabel = (options: { label: string; value: string }[], value: string) => {
  const option = options.find(opt => opt.value === value);
  return option ? option.label : value;
};
