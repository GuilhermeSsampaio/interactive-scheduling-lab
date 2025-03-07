
// Resource types
export type ResourceType = 'campo' | 'infra' | 'lab';

export const resourceTypeOptions = [
  { label: 'Recursos de Campo', value: 'campo' },
  { label: 'Recursos de Infraestrutura', value: 'infra' },
  { label: 'Recursos de Laboratório', value: 'lab' },
];

// Campo options
export const campoResourceOptions = [
  { label: 'Pessoas', value: 'pessoas' },
  { label: 'Implementos Agrícolas', value: 'implementos' },
  { label: 'Serviços Gerais', value: 'servicos' },
  { label: 'Máquinas Agrícolas', value: 'maquinas' },
  { label: 'Área de cultivo', value: 'area' },
  { label: 'Tipo Cultura', value: 'cultura' },
];

// Campo - Pessoas options
export const campoPessoasOptions = [
  { label: 'Tratorista', value: 'tratorista' },
  { label: 'Técnico de Campo', value: 'tecnico' },
  { label: 'Motorista de Caminhão', value: 'motorista-caminhao' },
  { label: 'Assistente de Campo', value: 'assistente' },
  { label: 'Operário', value: 'operario' },
  { label: 'Pesquisador', value: 'pesquisador' },
];

// Campo - Implementos Agrícolas options
export const campoImplementosOptions = [
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
export const campoServicosOptions = [
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
export const campoMaquinasOptions = [
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
export const campoAreaOptions = [
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
export const campoCulturaOptions = [
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
export const infraResourceOptions = [
  { label: 'Pessoas', value: 'pessoas' },
  { label: 'Viagens', value: 'viagens' },
];

// Infra - Pessoas options
export const infraPessoasOptions = [
  { label: 'Motorista de Ônibus', value: 'motorista-onibus' },
  { label: 'Motorista de Caminhão', value: 'motorista-caminhao' },
  { label: 'Tratorista', value: 'tratorista' },
  { label: 'Motorista Geral', value: 'motorista-geral' },
];

// Infra - Viagens options
export const infraViagensOptions = [
  { label: 'Ônibus', value: 'onibus' },
  { label: 'Caminhonete', value: 'caminhonete' },
  { label: 'Carro de passeio', value: 'carro' },
  { label: 'Caminhão', value: 'caminhao' },
  { label: 'Utilitário', value: 'utilitario' },
  { label: 'Micro-ônibus', value: 'micro-onibus' },
];

// Laboratório options
export const labResourceOptions = [
  { label: 'Análises', value: 'analises' },
];

// Lab - Análises options
export const labAnalisesOptions = [
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
export const experimentOptions = [
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
