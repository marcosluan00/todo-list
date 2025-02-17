export type Prioridade = 'ALTA' | 'MEDIA' | 'BAIXA';

export interface Tarefa {
  id: number;
  usuarioId: string;
  titulo: string;
  descricao?: string;
  concluida: boolean;
  criadaEm: Date;
  prioridade: Prioridade;
}
