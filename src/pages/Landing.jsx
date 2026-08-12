import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const PLANOS = [
  {
    nome: 'Starter',
    preco: 29.90,
    precoAnual: 287.00,
    desconto: '20% off',
    descricao: 'Para profissionais autônomos',
    recursos: [
      '1 profissional',
      'Agendamento online',
      'Perfil público',
      'Histórico de clientes',
    ],
    destaque: false,
  },
  {
    nome: 'Pro',
    preco: 59.90,
    precoAnual: 575.00,
    desconto: '20% off',
    descricao: 'Para salões com equipe',
    recursos: [
      'Até 5 profissionais',
      'Tudo do Starter',
      'Gestão financeira',
      'Relatórios completos',
      'Controle de estoque',
    ],
    destaque: true,
  },
  {
    nome: 'Business',
    preco: 99.90,
    precoAnual: 959.00,
    desconto: '20% off',
    descricao: 'Para salões maiores',
    recursos: [
      'Até 15 profissionais',
      'Tudo do Pro',
      'Multi-unidade',
      'Suporte prioritário',
    ],
    destaque: false,
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const [ciclo, setCiclo] = useState('mensal')

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcone}>📅</span>
          <span style={styles.logoNome}>AgendaFácil</span>
        </div>
        <div style={styles.headerAcoes}>
          <button style={styles.btnEntrar} onClick={() => navigate('/login')}>Entrar</button>
          <button style={styles.btnComecar} onClick={() => navigate('/cadastro')}>Começar grátis</button>
        </div>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.badge}>✨ 14 dias grátis, sem cartão</div>
        <h1 style={styles.heroTitulo}>
          Agendamento online para<br />
          <span style={styles.heroDestaque}>qualquer profissional</span>
        </h1>
        <p style={styles.heroSubtitulo}>
          Barbearias, salões, clínicas de estética, estúdios de tatuagem e muito mais.
          Organize sua agenda, gerencie sua equipe e cresça seu negócio.
        </p>
        <div style={styles.heroAcoes}>
          <button style={styles.btnHero} onClick={() => navigate('/cadastro')}>
            Criar minha conta grátis →
          </button>
          <p style={styles.heroSub}>Sem cartão de crédito • Cancele quando quiser</p>
        </div>
      </div>

      {/* Funcionalidades */}
      <div style={styles.features}>
        <h2 style={styles.secaoTitulo}>Tudo que você precisa em um só lugar</h2>
        <div style={styles.gridFeatures}>
          {[
            { icone: '📅', titulo: 'Agendamento online 24h', desc: 'Seus clientes agendam pelo celular a qualquer hora, sem precisar ligar.' },
            { icone: '💰', titulo: 'Gestão financeira', desc: 'Controle comissões, vales, fechamentos semanais e despesas.' },
            { icone: '✂️', titulo: 'Gestão de equipe', desc: 'Cadastre profissionais, defina comissões e permissões individuais.' },
            { icone: '📊', titulo: 'Relatórios completos', desc: 'Acompanhe faturamento, produtos vendidos e desempenho da equipe.' },
            { icone: '🛍️', titulo: 'Venda de produtos', desc: 'Registre vendas de produtos e controle seu estoque automaticamente.' },
            { icone: '📋', titulo: 'Perfil público', desc: 'Página personalizada com seus serviços, equipe e horários de funcionamento.' },
          ].map((f, i) => (
            <div key={i} style={styles.cardFeature}>
              <span style={styles.featureIcone}>{f.icone}</span>
              <h3 style={styles.featureTitulo}>{f.titulo}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Planos */}
      <div style={styles.planos}>
        <h2 style={styles.secaoTitulo}>Planos e preços</h2>
        <p style={styles.secaoSubtitulo}>Comece grátis por 14 dias. Sem cartão de crédito.</p>

        {/* Toggle mensal/anual */}
        <div style={styles.toggleCiclo}>
          <button
            onClick={() => setCiclo('mensal')}
            style={{ ...styles.btnCiclo, backgroundColor: ciclo === 'mensal' ? '#fff' : 'transparent', color: ciclo === 'mensal' ? '#0d0d0d' : '#888' }}
          >
            Mensal
          </button>
          <button
            onClick={() => setCiclo('anual')}
            style={{ ...styles.btnCiclo, backgroundColor: ciclo === 'anual' ? '#fff' : 'transparent', color: ciclo === 'anual' ? '#0d0d0d' : '#888' }}
          >
            Anual <span style={styles.badgeDesconto}>-20%</span>
          </button>
        </div>

        <div style={styles.gridPlanos}>
          {PLANOS.map((p, i) => (
            <div key={i} style={{ ...styles.cardPlano, border: p.destaque ? '2px solid #C9A84C' : '1px solid #2a2a2a' }}>
              {p.destaque && <div style={styles.badgeMaisPopular}>⭐ Mais popular</div>}
              <h3 style={styles.planoNome}>{p.nome}</h3>
              <p style={styles.planoDesc}>{p.descricao}</p>
              <div style={styles.planoPreco}>
                <span style={styles.precoValor}>
                  R$ {ciclo === 'mensal' ? p.preco.toFixed(2) : (p.precoAnual / 12).toFixed(2)}
                </span>
                <span style={styles.precoLabel}>/mês</span>
              </div>
              {ciclo === 'anual' && (
                <p style={styles.precoAnual}>R$ {p.precoAnual.toFixed(2)}/ano — economia de R$ {(p.preco * 12 - p.precoAnual).toFixed(2)}</p>
              )}
              <ul style={styles.listaRecursos}>
                {p.recursos.map((r, j) => (
                  <li key={j} style={styles.recursoItem}>✅ {r}</li>
                ))}
              </ul>
              <button
                style={{ ...styles.btnAssinar, backgroundColor: p.destaque ? '#C9A84C' : 'transparent', color: p.destaque ? '#0d0d0d' : '#C9A84C', border: p.destaque ? 'none' : '1px solid #C9A84C' }}
                onClick={() => navigate(`/cadastro?plano=${p.nome.toLowerCase()}&ciclo=${ciclo}`)}
              >
                Começar grátis
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={{ margin: 0, color: '#555', fontSize: '0.85rem' }}>
          © 2026 AgendaFácil · Todos os direitos reservados
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0d0d0d', fontFamily: 'sans-serif', color: '#f0f0f0' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: '1px solid #1e1e1e', position: 'sticky', top: 0, backgroundColor: '#0d0d0d', zIndex: 100 },
  logo: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoIcone: { fontSize: '1.5rem' },
  logoNome: { fontSize: '1.2rem', fontWeight: '800', color: '#C9A84C' },
  headerAcoes: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
  btnEntrar: { padding: '0.5rem 1rem', border: '1px solid #2a2a2a', borderRadius: '8px', backgroundColor: 'transparent', color: '#888', cursor: 'pointer', fontSize: '0.9rem' },
  btnComecar: { padding: '0.5rem 1.25rem', border: 'none', borderRadius: '8px', backgroundColor: '#C9A84C', color: '#0d0d0d', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700' },
  hero: { textAlign: 'center', padding: '5rem 2rem 4rem', maxWidth: '700px', margin: '0 auto' },
  badge: { display: 'inline-block', padding: '0.4rem 1rem', backgroundColor: '#1a1a0a', border: '1px solid #C9A84C44', borderRadius: '999px', fontSize: '0.85rem', color: '#C9A84C', marginBottom: '1.5rem' },
  heroTitulo: { fontSize: '3rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1.25rem', color: '#fff' },
  heroDestaque: { color: '#C9A84C' },
  heroSubtitulo: { fontSize: '1.1rem', color: '#888', lineHeight: 1.6, marginBottom: '2rem' },
  heroAcoes: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' },
  btnHero: { padding: '1rem 2.5rem', border: 'none', borderRadius: '12px', backgroundColor: '#C9A84C', color: '#0d0d0d', cursor: 'pointer', fontSize: '1.1rem', fontWeight: '700' },
  heroSub: { margin: 0, fontSize: '0.8rem', color: '#555' },
  features: { padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' },
  secaoTitulo: { textAlign: 'center', fontSize: '2rem', fontWeight: '700', marginBottom: '0.75rem', color: '#fff' },
  secaoSubtitulo: { textAlign: 'center', color: '#666', marginBottom: '2.5rem', fontSize: '1rem' },
  gridFeatures: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  cardFeature: { backgroundColor: '#161616', borderRadius: '12px', padding: '1.5rem', border: '1px solid #242424' },
  featureIcone: { fontSize: '2rem', display: 'block', marginBottom: '0.75rem' },
  featureTitulo: { margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: '700', color: '#f0f0f0' },
  featureDesc: { margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.6 },
  planos: { padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' },
  toggleCiclo: { display: 'flex', backgroundColor: '#161616', borderRadius: '999px', padding: '4px', width: 'fit-content', margin: '0 auto 2.5rem', border: '1px solid #242424' },
  btnCiclo: { padding: '0.5rem 1.25rem', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.15s' },
  badgeDesconto: { backgroundColor: '#4ade8022', color: '#4ade80', padding: '0.1rem 0.4rem', borderRadius: '999px', fontSize: '0.75rem', marginLeft: '0.25rem' },
  gridPlanos: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
  cardPlano: { backgroundColor: '#161616', borderRadius: '16px', padding: '2rem', position: 'relative' },
  badgeMaisPopular: { position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#C9A84C', color: '#0d0d0d', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap' },
  planoNome: { margin: '0 0 0.25rem', fontSize: '1.3rem', fontWeight: '700', color: '#f0f0f0' },
  planoDesc: { margin: '0 0 1.5rem', fontSize: '0.85rem', color: '#666' },
  planoPreco: { display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' },
  precoValor: { fontSize: '2.5rem', fontWeight: '800', color: '#C9A84C' },
  precoLabel: { fontSize: '0.9rem', color: '#666' },
  precoAnual: { margin: '0 0 1.5rem', fontSize: '0.8rem', color: '#4ade80' },
  listaRecursos: { listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  recursoItem: { fontSize: '0.9rem', color: '#ccc' },
  btnAssinar: { width: '100%', padding: '0.85rem', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', marginTop: '0.5rem' },
  footer: { padding: '2rem', borderTop: '1px solid #1e1e1e', textAlign: 'center', marginTop: '4rem' },
}