export const generateReport = (): string => {
  const relatorio = `
    Relatório de Mapeamento do Pátio
    Data: ${new Date().toLocaleString()}
    Número total de motos: 15
    Motos OK: 10
    Motos em manutenção: 3
    Motos prontas: 2
    Observações: Pátio mapeado com sucesso.
  `;
  return relatorio;
};

export const generateCompleteReport = (): string => {
  const relatorio = `
    Relatório Completo de Mapeamento do Pátio
    Data: ${new Date().toLocaleString()}

    Informações Gerais
    -------------------
    Número total de motos: 20
    Área total do pátio: 5000 m²
    Capacidade máxima de motos: 25

    Status das Motos
    -------------------
    Motos OK: 12
    Motos em manutenção: 5
    Motos prontas: 3

    Detalhes por Setor
    -------------------
    Setor A: 
      - Motos OK: 5
      - Motos em manutenção: 2
    Setor B:
      - Motos OK: 7
      - Motos em manutenção: 3
      - Motos prontas: 3

    Observações
    ----------
    Pátio mapeado com sucesso em 10/05/2024.
    Próxima inspeção agendada para 17/05/2024.
  `;
  return relatorio;
};
