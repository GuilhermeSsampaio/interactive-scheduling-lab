
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DatePicker from './DatePicker';
import Select from './Select';
import { Check, Plus, X } from 'lucide-react';

// Resource type and options data
type ResourceType = 'campo' | 'infra' | 'lab';

const resourceTypeOptions = [
  { label: 'Recursos de Campo', value: 'campo' },
  { label: 'Recursos de Infraestrutura', value: 'infra' },
  { label: 'Recursos de Laboratório', value: 'lab' },
];

// Campo options
const campoResourceOptions = [
  { label: 'Pessoas', value: 'pessoas' },
  { label: 'Implementos Agrícolas', value: 'implementos' },
  { label: 'Serviços Gerais', value: 'servicos' },
  { label: 'Máquinas Agrícolas', value: 'maquinas' },
  { label: 'Área de cultivo', value: 'area' },
  { label: 'Tipo Cultura', value: 'cultura' },
];

// Campo - Pessoas options
const campoPessoasOptions = [
  { label: 'Tratorista', value: 'tratorista' },
  { label: 'Técnico de Campo', value: 'tecnico' },
  { label: 'Motorista de Caminhão', value: 'motorista-caminhao' },
  { label: 'Assistente de Campo', value: 'assistente' },
  { label: 'Operário', value: 'operario' },
  { label: 'Pesquisador', value: 'pesquisador' },
];

// Campo - Implementos Agrícolas options
const campoImplementosOptions = [
  { label: 'Arado', value: 'arado' },
  { label: 'Grade niveladora', value: 'grade-niveladora' },
  { label: 'Semeadora', value: 'semeadora' },
  { label: 'Pulverizador', value: 'pulverizador' },
  { label: 'Colheitadeira', value: 'colheitadeira' },
  { label: 'Subsolador', value: 'subsolador' },
  { label: 'Enxada rotativa', value: 'enxada-rotativa' },
  { label: 'Roçadeira', value: 'rocadeira' },
  { label: 'Adubadora', value: 'adubadora' },
  { label: 'Cultivador', value: 'cultivador' },
  { label: 'Empacotadora de feno', value: 'empacotadora' },
  { label: 'Distribuidor de esterco', value: 'distribuidor-esterco' },
  { label: 'Aplicador de calcário', value: 'aplicador-calcario' },
  { label: 'Plantadeira de precisão', value: 'plantadeira' },
  { label: 'Carreta agrícola', value: 'carreta' },
];

// Campo - Serviços Gerais options
const campoServicosOptions = [
  { label: 'Coleta de Amostras de Solo', value: 'coleta-solo' },
  { label: 'Plantio Experimental', value: 'plantio' },
  { label: 'Monitoramento de Pragas e Doenças', value: 'monitoramento-pragas' },
  { label: 'Aplicação de Defensivos e Fertilizantes', value: 'aplicacao-defensivos' },
  { label: 'Irrigação e Manejo Hídrico', value: 'irrigacao' },
  { label: 'Coleta de Dados Meteorológicos', value: 'coleta-dados' },
  { label: 'Avaliação de Crescimento e Produtividade de Culturas', value: 'avaliacao-culturas' },
  { label: 'Manejo de Animais em Projetos Pecuários', value: 'manejo-animais' },
  { label: 'Instalação e Manutenção de Equipamentos Agrícolas', value: 'manutencao-equipamentos' },
  { label: 'Coleta e Análise de Dados em Sistemas Agroflorestais', value: 'coleta-agroflorestais' },
  { label: 'Monitoramento e Recuperação de Áreas Degradadas', value: 'areas-degradadas' },
  { label: 'Testes de Novas Variedades de Culturas', value: 'testes-variedades' },
  { label: 'Controle de Ervas Daninhas', value: 'ervas-daninhas' },
  { label: 'Apoio em Treinamentos e Transferência de Tecnologia', value: 'treinamentos' },
  { label: 'Análise e Processamento de Dados Agronômicos', value: 'analise-dados' },
];

// Campo - Máquinas Agrícolas options
const campoMaquinasOptions = [
  { label: 'Trator', value: 'trator' },
  { label: 'Retroescavadeira', value: 'retroescavadeira' },
  { label: 'Colheitadeira', value: 'colheitadeira' },
  { label: 'Plantadeira', value: 'plantadeira' },
  { label: 'Pulverizador agrícola', value: 'pulverizador' },
  { label: 'Grade aradora', value: 'grade-aradora' },
  { label: 'Grade niveladora', value: 'grade-niveladora' },
  { label: 'Enfardadeira', value: 'enfardadeira' },
  { label: 'Carreta agrícola', value: 'carreta' },
  { label: 'Semeadora', value: 'semeadora' },
  { label: 'Adubadora', value: 'adubadora' },
  { label: 'Roçadeira', value: 'rocadeira' },
  { label: 'Guincho agrícola', value: 'guincho' },
  { label: 'Distribuidor de calcário', value: 'distribuidor-calcario' },
  { label: 'Escarificador', value: 'escarificador' },
  { label: 'Subsolador', value: 'subsolador' },
  { label: 'Colhedora de forragem', value: 'colhedora-forragem' },
  { label: 'Transbordo agrícola', value: 'transbordo' },
  { label: 'Motocultivador', value: 'motocultivador' },
  { label: 'Triturador agrícola', value: 'triturador' },
];

// Campo - Área de cultivo options
const campoAreaOptions = [
  { label: 'Área do algodão', value: 'area-algodao' },
  { label: 'Área da cana-de-açúcar', value: 'area-cana' },
  { label: 'Área do girassol', value: 'area-girassol' },
  { label: 'Área da mandioca', value: 'area-mandioca' },
  { label: 'Área do café', value: 'area-cafe' },
  { label: 'Área do arroz', value: 'area-arroz' },
  { label: 'Área das hortaliças', value: 'area-hortalicas' },
  { label: 'Área do pomar', value: 'area-pomar' },
  { label: 'Área da pastagem', value: 'area-pastagem' },
  { label: 'Área experimental', value: 'area-experimental' },
  { label: 'Parcela 01', value: 'parcela-01' },
  { label: 'Parcela 02', value: 'parcela-02' },
  { label: 'Parcela 03', value: 'parcela-03' },
  { label: 'Parcela 04', value: 'parcela-04' },
];

// Campo - Tipo Cultura options
const campoCulturaOptions = [
  { label: 'Soja', value: 'soja' },
  { label: 'Milho', value: 'milho' },
  { label: 'Feijão', value: 'feijao' },
  { label: 'Trigo', value: 'trigo' },
  { label: 'Arroz', value: 'arroz' },
  { label: 'Algodão', value: 'algodao' },
  { label: 'Cana-de-açúcar', value: 'cana' },
  { label: 'Girassol', value: 'girassol' },
  { label: 'Mandioca', value: 'mandioca' },
  { label: 'Café', value: 'cafe' },
  { label: 'Hortaliças', value: 'hortalicas' },
  { label: 'Fruticultura (manga, maracujá, banana, etc.)', value: 'fruticultura' },
  { label: 'Pastagens', value: 'pastagens' },
  { label: 'Eucalipto', value: 'eucalipto' },
  { label: 'Sorgo', value: 'sorgo' },
  { label: 'Amendoim', value: 'amendoim' },
  { label: 'Batata-doce', value: 'batata-doce' },
  { label: 'Cacau', value: 'cacau' },
  { label: 'Uva', value: 'uva' },
  { label: 'Palma forrageira', value: 'palma' },
];

// Infraestrutura options
const infraResourceOptions = [
  { label: 'Pessoas', value: 'pessoas' },
  { label: 'Viagens', value: 'viagens' },
];

// Infra - Pessoas options
const infraPessoasOptions = [
  { label: 'Motorista de Ônibus', value: 'motorista-onibus' },
  { label: 'Motorista de Caminhão', value: 'motorista-caminhao' },
  { label: 'Tratorista', value: 'tratorista' },
  { label: 'Motorista Geral', value: 'motorista-geral' },
];

// Infra - Viagens options
const infraViagensOptions = [
  { label: 'Ônibus', value: 'onibus' },
  { label: 'Caminhonete', value: 'caminhonete' },
  { label: 'Carro de passeio', value: 'carro' },
  { label: 'Caminhão', value: 'caminhao' },
  { label: 'Utilitário', value: 'utilitario' },
  { label: 'Micro-ônibus', value: 'micro-onibus' },
];

// Laboratório options
const labResourceOptions = [
  { label: 'Análises', value: 'analises' },
];

// Lab - Análises options
const labAnalisesOptions = [
  { label: 'DETERMINAÇÃO DOS VALORES DE PARÂMETROS FÍSICO-QUÍMICOS DE ÁGUA', value: 'analise-agua' },
  { label: 'DETERMINAÇÃO DE LISOZIMA SÉRICA', value: 'lisozima' },
  { label: 'DETERMINAÇÃO DE LIPÍDIOS TOTAIS', value: 'lipidios' },
  { label: 'DETERMINAÇÃO DA ALCALINIDADE TOTAL NA ÁGUA', value: 'alcalinidade' },
  { label: 'PRODUÇÃO DE RAÇÃO PELETIZADA COM ADIÇÃO DE ÓXIDO DE CROMO III A 0,2%', value: 'racao-cromo' },
  { label: 'PRODUÇÃO DE RAÇÃO COM 17-Α-METIL-TESTOSTERONA', value: 'racao-testosterona' },
  { label: 'SEXAGEM DE TILÁPIAS', value: 'sexagem' },
  { label: 'ANÁLISE DE GLICOGÊNIO HEPÁTICO E MUSCULAR', value: 'glicogenio' },
  { label: 'DETERMINAÇÃO DE ATIVIDADE DA LIPASE INESPECÍFICA PELO MÉTODO DE ALBRO MODIFICADO', value: 'lipase' },
  { label: 'DETERMINAÇÃO DE ATIVIDADE DA QUIMIOTRIPSINA PELO MÉTODO DE HUMMEL MODIFICADO', value: 'quimiotripsina' },
  { label: 'DETERMINAÇÃO DE ATIVIDADE DA TRIPSINA PELO MÉTODO DE HUMMEL MODIFICADO', value: 'tripsina' },
  { label: 'DETERMINAÇÃO DE ATIVIDADE AMILOHIDROLÍTICA PELO MÉTODO DE BERNFELD MODIFICADO E CONCENTRAÇÃO DE GLICOSE LIVRE PELO MÉTODO DE PARK & JOHNSON', value: 'amilohidrolitica' },
  { label: 'DETERMINAÇÃO DE HOMOGENEIZAÇÃO PARA ANÁLISE DE ATIVIDADE ENZIMÁTICA EM TECIDOS', value: 'homogeneizacao' },
  { label: 'DETERMINAÇÃO DE ATIVIDADE DA PROTEASE INESPECÍFICA PELO MÉTODO DE WALTER MODIFICADO', value: 'protease' },
  { label: 'ANÁLISE MULTIRESÍDUO DE AGROTÓXICOS POR CROMATOGRAFIA LÍQUIDA DE ULTRAPERFORMANCE ACOPLADA A ESPECTROMETRIA DE MASSAS EM AMOSTRAS DE ÁGUA', value: 'multiresiduo-agua' },
  { label: 'DETERMINAÇÃO DE RESÍDUOS DE AGROTÓXICOS EM AMOSTRAS DE FOLHAS POR CROMATOGRAFIA LÍQUIDA DE ULTRAPERFORMANCE ACOPLADA À ESPECTROMETRIA DE MASSAS', value: 'residuos-folhas' },
  { label: 'ANÁLISE MULTIRESÍDUO DE INSETICIDAS POR CROMATOGRAFIA LÍQUIDA DE ULTRAPERFORMANCE', value: 'multiresiduo-inseticidas' },
  { label: 'ANÁLISES DE RESÍDUOS DE AGROTÓXICOS EM AMOSTRAS DE SOLOS', value: 'residuos-solos' },
  { label: 'ANÁLISES DE GASES DE EFEITO ESTUFA', value: 'gases-estufa' },
  { label: 'CRIAÇÃO MASSAL DE INSETOS', value: 'insetos' },
  { label: 'TESTE DE SANIDADE DE SEMENTES EM SUBSTRATO DE PAPEL', value: 'sanidade-sementes' },
  { label: 'INOCULAÇÃO DE SEMENTES COM OS PRINCIPAIS FUNGOS FITOPATOGÊNICOS', value: 'inoculacao' },
  { label: 'PRODUÇÃO DE INÓCULO DO FUNGO RHIZOCTONIA SOLANI', value: 'inoculo-fungo' },
  { label: 'DETERMINAÇÃO DE ALUMÍNIO, CÁLCIO E MAGNÉSIO TROCÁVEIS EM EXTRATO DE CLORETO DE POTÁSSIO', value: 'aluminio-calcio' },
  { label: 'DETERMINAÇÃO DE FÓSFORO, POTÁSSIO, SÓDIO, COBRE, FERRO, MANGANÊS E ZINCO EXTRAÇÃO POR MEHLICH 1, CAROLINA DO NORTE OU DO DUPLO ÁCIDO', value: 'fosforo-potassio' },
  { label: 'DETERMINAÇÃO DA ATIVIDADE DA ENZIMA Β-GLUCOSIDASE', value: 'glucosidase' },
  { label: 'PROCEDIMENTO PARA DETERMINAÇÃO DE CARBONO POR COLORIMETRIA', value: 'carbono' },
  { label: 'DETERMINAÇÃO DA ATIVIDADE DA ENZIMA ARILSULFATASE', value: 'arilsulfatase' },
];

// Mock data for experiments
const experimentOptions = [
  { label: 'Teste de novas variedades de culturas agrícolas', value: 'teste-variedades' },
  { label: 'Avaliação de resistência a pragas', value: 'resistencia-pragas' },
  { label: 'Análise de crescimento em diferentes solos', value: 'analise-solos' },
  { label: 'Avaliação de eficiência de fertilizantes e adubos', value: 'fertilizantes-adubos' },
  { label: 'Pesquisa sobre controle biológico de pragas', value: 'controle-pragas' },
  { label: 'Estudo de técnicas de irrigação para otimização do uso da água', value: 'tecnicas-irrigacao' },
  { label: 'Desenvolvimento de práticas de conservação do solo', value: 'conservacao-solo' },
  { label: 'Teste de cultivares resistentes a mudanças climáticas', value: 'cultivares-resistentes' },
  { label: 'Análise da qualidade nutricional de alimentos produzidos', value: 'qualidade-nutricional' },
];

export type Resource = {
  id: string;
  type: ResourceType;
  categoryValue: string;
  item: string;
  fields: Record<string, string>;
};

export type Programming = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  experiment: string;
  resources: Resource[];
};

type ProgrammingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (programming: Programming) => void;
  editingProgramming?: Programming;
};

const ProgrammingModal = ({ open, onOpenChange, onSave, editingProgramming }: ProgrammingModalProps) => {
  const [name, setName] = useState(editingProgramming?.name || '');
  const [startDate, setStartDate] = useState<Date | undefined>(editingProgramming?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(editingProgramming?.endDate);
  const [experiment, setExperiment] = useState(editingProgramming?.experiment || '');
  const [resources, setResources] = useState<Resource[]>(editingProgramming?.resources || []);
  
  // Resource selection state
  const [resourceType, setResourceType] = useState<ResourceType | ''>('');
  const [resourceCategory, setResourceCategory] = useState('');
  const [resourceItem, setResourceItem] = useState('');
  const [resourceFields, setResourceFields] = useState<Record<string, string>>({});
  
  // Reset form when editing programming changes
  useEffect(() => {
    if (editingProgramming) {
      setName(editingProgramming.name);
      setStartDate(editingProgramming.startDate);
      setEndDate(editingProgramming.endDate);
      setExperiment(editingProgramming.experiment);
      setResources(editingProgramming.resources);
    } else {
      // Only reset when not editing
      setName('');
      setStartDate(undefined);
      setEndDate(undefined);
      setExperiment('');
      setResources([]);
    }
  }, [editingProgramming, open]);

  const resetResourceForm = () => {
    setResourceType('');
    setResourceCategory('');
    setResourceItem('');
    setResourceFields({});
  };

  const handleSave = () => {
    if (name && startDate && endDate && experiment) {
      onSave({
        id: editingProgramming?.id || Date.now().toString(),
        name,
        startDate,
        endDate,
        experiment,
        resources,
      });
      onOpenChange(false);
    }
  };

  const handleAddResource = () => {
    if (resourceType && resourceCategory && resourceItem) {
      const newResource: Resource = {
        id: Date.now().toString(),
        type: resourceType,
        categoryValue: resourceCategory,
        item: resourceItem,
        fields: resourceFields,
      };
      
      setResources([...resources, newResource]);
      resetResourceForm();
    }
  };

  const handleRemoveResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  // Get category options based on resource type
  const getCategoryOptions = () => {
    switch (resourceType) {
      case 'campo':
        return campoResourceOptions;
      case 'infra':
        return infraResourceOptions;
      case 'lab':
        return labResourceOptions;
      default:
        return [];
    }
  };

  // Get item options based on resource type and category
  const getItemOptions = () => {
    if (resourceType === 'campo') {
      switch (resourceCategory) {
        case 'pessoas':
          return campoPessoasOptions;
        case 'implementos':
          return campoImplementosOptions;
        case 'servicos':
          return campoServicosOptions;
        case 'maquinas':
          return campoMaquinasOptions;
        case 'area':
          return campoAreaOptions;
        case 'cultura':
          return campoCulturaOptions;
        default:
          return [];
      }
    } else if (resourceType === 'infra') {
      switch (resourceCategory) {
        case 'pessoas':
          return infraPessoasOptions;
        case 'viagens':
          return infraViagensOptions;
        default:
          return [];
      }
    } else if (resourceType === 'lab') {
      switch (resourceCategory) {
        case 'analises':
          return labAnalisesOptions;
        default:
          return [];
      }
    }
    
    return [];
  };

  // Get additional fields based on resource category and item
  const renderAdditionalFields = () => {
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

  // Get option label from value
  const getOptionLabel = (options: { label: string; value: string }[], value: string) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  // Render resource summary for the resource being added
  const renderResourceSummary = () => {
    if (!resourceType || !resourceCategory || !resourceItem) return null;
    
    let categoryLabel = '';
    if (resourceType === 'campo') categoryLabel = getOptionLabel(campoResourceOptions, resourceCategory);
    if (resourceType === 'infra') categoryLabel = getOptionLabel(infraResourceOptions, resourceCategory);
    if (resourceType === 'lab') categoryLabel = getOptionLabel(labResourceOptions, resourceCategory);
    
    let itemLabel = getOptionLabel(getItemOptions(), resourceItem);
    
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

  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        if (!open) resetResourceForm();
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editingProgramming ? 'Editar Programação' : 'Adicionar Nova Programação'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nome da Programação</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome da programação"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Data Inicial</label>
              <DatePicker 
                date={startDate} 
                onSelect={setStartDate} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Data Final</label>
              <DatePicker 
                date={endDate} 
                onSelect={setEndDate} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Selecione o Experimento</label>
            <Select
              options={experimentOptions}
              value={experiment}
              onChange={setExperiment}
              placeholder="Selecione um experimento"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-base font-medium mb-4">Adicionar Recursos</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tipo de Recurso</label>
                <Select
                  options={resourceTypeOptions}
                  value={resourceType}
                  onChange={(value) => {
                    setResourceType(value as ResourceType);
                    setResourceCategory('');
                    setResourceItem('');
                    setResourceFields({});
                  }}
                  placeholder="Selecione o tipo de recurso"
                />
              </div>

              {resourceType && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-sm font-medium text-gray-700">Recurso</label>
                  <Select
                    options={getCategoryOptions()}
                    value={resourceCategory}
                    onChange={(value) => {
                      setResourceCategory(value);
                      setResourceItem('');
                      setResourceFields({});
                    }}
                    placeholder="Selecione o recurso"
                  />
                </div>
              )}

              {resourceType && resourceCategory && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-sm font-medium text-gray-700">
                    {resourceCategory === 'pessoas' ? 'Função' : 
                     resourceCategory === 'implementos' ? 'Implemento Agrícola' :
                     resourceCategory === 'servicos' ? 'Serviço' :
                     resourceCategory === 'maquinas' ? 'Máquina Agrícola' :
                     resourceCategory === 'area' ? 'Área' :
                     resourceCategory === 'cultura' ? 'Cultura' :
                     resourceCategory === 'viagens' ? 'Veículo' :
                     resourceCategory === 'analises' ? 'Análise' : 'Item'}
                  </label>
                  <Select
                    options={getItemOptions()}
                    value={resourceItem}
                    onChange={(value) => {
                      setResourceItem(value);
                      setResourceFields({});
                    }}
                    placeholder="Selecione um item"
                  />
                </div>
              )}

              {renderAdditionalFields()}
              {renderResourceSummary()}

              {resourceType && resourceCategory && resourceItem && (
                <div className="mt-4 flex justify-end animate-fade-in">
                  <Button
                    type="button"
                    onClick={handleAddResource}
                    className="btn-primary"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Recurso
                  </Button>
                </div>
              )}
            </div>
          </div>

          {resources.length > 0 && (
            <div className="border-t pt-6 animate-fade-in">
              <h3 className="text-base font-medium mb-4">Recursos Adicionados</h3>
              <div className="space-y-3">
                {resources.map((resource) => {
                  let categoryOptions = [];
                  if (resource.type === 'campo') categoryOptions = campoResourceOptions;
                  if (resource.type === 'infra') categoryOptions = infraResourceOptions;
                  if (resource.type === 'lab') categoryOptions = labResourceOptions;
                  
                  let itemOptions = [];
                  if (resource.type === 'campo') {
                    switch (resource.categoryValue) {
                      case 'pessoas': itemOptions = campoPessoasOptions; break;
                      case 'implementos': itemOptions = campoImplementosOptions; break;
                      case 'servicos': itemOptions = campoServicosOptions; break;
                      case 'maquinas': itemOptions = campoMaquinasOptions; break;
                      case 'area': itemOptions = campoAreaOptions; break;
                      case 'cultura': itemOptions = campoCulturaOptions; break;
                    }
                  } else if (resource.type === 'infra') {
                    switch (resource.categoryValue) {
                      case 'pessoas': itemOptions = infraPessoasOptions; break;
                      case 'viagens': itemOptions = infraViagensOptions; break;
                    }
                  } else if (resource.type === 'lab') {
                    switch (resource.categoryValue) {
                      case 'analises': itemOptions = labAnalisesOptions; break;
                    }
                  }
                  
                  const categoryLabel = getOptionLabel(categoryOptions, resource.categoryValue);
                  const itemLabel = getOptionLabel(itemOptions, resource.item);
                  const typeLabel = getOptionLabel(resourceTypeOptions, resource.type);
                  
                  return (
                    <div key={resource.id} className="flex justify-between items-start p-3 border rounded-md bg-gray-50">
                      <div>
                        <div className="font-medium">{itemLabel}</div>
                        <div className="text-sm text-gray-600">
                          {typeLabel} • {categoryLabel}
                          {Object.entries(resource.fields).map(([key, value]) => (
                            <span key={key}> • {key}: {value}</span>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveResource(resource.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="btn-outline"
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="btn-primary"
            disabled={!name || !startDate || !endDate || !experiment}
          >
            <Check className="mr-2 h-4 w-4" />
            {editingProgramming ? 'Salvar' : 'Adicionar Programação'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgrammingModal;
