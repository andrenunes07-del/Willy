import type { MedProduct } from '@/types/medSimData'

export const MED_PRODUCTS: MedProduct[] = [
  {
    id: 'telepsicologo',
    emoji: '🧠',
    nome: 'Telepsicólogo',
    precoCliente: 'R$ 35,00 / sessão',
    comissao: 10,
    base: 'Média de 10 sessões/mês por cliente ativo',
    desc: 'A cada sessão realizada, o parceiro recebe R$ 1,00 de comissão. Com a média de consumo do produto, cada cliente ativo gera R$ 10,00 mensais recorrentes.',
  },
  {
    id: 'telemedicina',
    emoji: '🩺',
    nome: 'Telemedicina',
    precoCliente: 'R$ 16,00 / mês',
    comissao: 1,
    base: 'Por vida ativa no plano',
    desc: 'Consultas médicas digitais a valor acessível. Alto potencial de adesão familiar — naturalmente multiplica vidas ativas na base.',
  },
  {
    id: 'dental',
    emoji: '🦷',
    nome: 'Plano Dental',
    precoCliente: 'R$ 29,00 / mês',
    comissao: 2,
    base: 'Por cliente ativo no plano',
    desc: 'A maior comissão individual do portfólio. Necessidade contínua do cliente garante alta retenção e comissão recorrente estável.',
  },
  {
    id: 'vida',
    emoji: '🛡️',
    nome: 'Seguro de Vida',
    precoCliente: 'R$ 10,00 / mês',
    comissao: 1,
    base: 'Por vida ativa no plano',
    desc: 'Alto apelo emocional e ticket acessível. Caráter protetivo mantém a permanência do cliente naturalmente alta.',
  },
  {
    id: 'funeral',
    emoji: '⚰️',
    nome: 'Assistência Funeral',
    precoCliente: 'R$ 10,00 / mês',
    comissao: 1,
    base: 'Por vida ativa no plano',
    desc: 'Contratação preventiva com forte senso de responsabilidade familiar. Baixo churn e base de clientes estável.',
  },
]
