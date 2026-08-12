import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  const [ciclo, setCiclo] = useState('mensal')

  const precoMensal = 29.90
  const precoAnual = 287.00
  const precoMensalAnual = (precoAnual / 12).toFixed(2)

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
          Sua agenda online em<br />
          <span style={styles.heroDestaque}>menos de 5 minutos</span>
        </h1>
        <p style={styles.heroSubtitulo}>
          Para barbeiros, manicures, esteticistas, tatuadores e qualquer profissional autônomo.
          Receba agendamentos 24h pelo celular.
        </p>
        <button style={styles.btnHero} onClick={() => navigate('/cadastro')}>
          Criar minha agenda grátis →
        </button>
        <p style={styles.heroSub}>Sem cartão de crédito • Cancele quando quiser</p>
      </div>

      {/* Como funciona */}
      <div style={styles.comoFunciona}>
        <h2 style={styles.secaoTitulo}>Como funciona</h2>
        <div style={styles.gridPassos}>
          {[
            { num: '1', titulo: 'Crie sua conta', desc: 'Cadastre-se em 2 minutos e configure seu perfil com seus serviços e horários.' },
            { num: '2', titulo: 'Compartilhe seu link', desc: 'Você recebe um link personalizado. Compartilhe no Instagram, WhatsApp e onde quiser.' },
            { num: '3', titulo: 'Receba agendamentos', desc: 'Seus clientes agendam pelo celular a qualquer hora, sem precisar te ligar.' },
          ].map((p, i) => (
            <div key={i} style={styles.cardPasso}>
              <div style={styles.passoNum}>{p.num}</div>
              <h3 style={styles.passoTitulo}>{p.titulo}</h3>
              <p style={styles.passoDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Funcionalidades */}
      <div style={styles.features}>
        <h2 style={styles.secaoTitulo}>Tudo que você precisa</h2>
        <div style={styles.gridFeatures}>
          {[
            { icone: '📅', titulo: 'Agendamento 24h', desc: 'Seus clientes agendam a qualquer hora, mesmo quando você está dormindo.' },
            { icone: '📱', titulo: 'Link personalizado', desc: 'Sua página em agendafacil.app/seu-nome para compartilhar em qualquer lugar.' },
            { icone: '🔔', titulo: 'Sem conflitos', desc: 'O sistema bloqueia horários já ocupados automaticamente.' },
            { icone: '📋', titulo: 'Histórico de clientes', desc: 'Veja todos os agendamentos anteriores e próximos de cada cliente.' },
            { icone: '⚙️', titulo: 'Fácil de configurar', desc: 'Configure seus serviços, preços, duração e horários de atendimento.' },
            { icone: '📊', titulo: 'Relatórios simples', desc: 'Acompanhe seus agendamentos e faturamento do mês.' },
          ].map((f, i) => (
            <div key={i} style={styles.cardFeature}>
              <span style={styles.featureIcone}>{f.icone}</span>
              <h3 style={styles.featureTitulo}>{f.titulo}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plano único */}
      <div style={styles.plano}>
        <h2 style={styles.secaoTitulo}>Um plano simples e justo</h2>
        <p style={styles.secaoSubtitulo}>Sem surpresas. Cancele quando quiser.</p>

        <div style={styles.toggleCiclo}>
          <button onClick={() => setCiclo('mensal')} style={{ ...styles.btnCiclo, backgroundColor: ciclo === 'mensal' ? '#fff' : 'transparent', color: ciclo === 'mensal' ? '#0d0d0d' : '#888' }}>
            Mensal
          </button>
          <button onClick={() => setCiclo('anual')} style={{ ...styles.btnCiclo, backgroundColor: ciclo === 'anual' ? '#fff' : 'transparent', color: ciclo === 'anual' ? '#0d0d0d' : '#888' }}>
            Anual <span style={styles.badgeDesconto}>-20%</span>
          </button>
        </div>

        <div style={styles.cardPlano}>
          <h3 style={styles.planoNome}>AgendaFácil</h3>
          <p style={styles.planoDesc}>Para profissionais autônomos</p>
          <div style={styles.planoPreco}>
            <span style={styles.precoValor}>
              R$ {ciclo === 'mensal' ? precoMensal.toFixed(2) : precoMensalAnual}
            </span>
            <span style={styles.precoLabel}>/mês</span>
          </div>
          {ciclo === 'anual' && (
            <p style={styles.precoAnual}>
              R$ {precoAnual.toFixed(2)}/ano — economia de R$ {(precoMensal * 12 - precoAnual).toFixed(2)}
            </p>
          )}
          <ul style={styles.listaRecursos}>
            {[
              '✅ 1 profissional',
              '✅ Agendamento online 24h',
              '✅ Link personalizado',
              '✅ Histórico de clientes',
              '✅ Configuração de serviços',
              '✅ Relatórios básicos',
              '✅ Suporte por email',
            ].map((r, i) => (
              <li key={i} style={styles.recursoItem}>{r}</li>
            ))}
          </ul>
          <button
            style={styles.btnAssinar}
            onClick={() => navigate(`/cadastro?ciclo=${ciclo}`)}
          >
            Começar 14 dias grátis
          </button>
          <p style={{ margin: '0.75rem 0 0', fontSize: '0.8rem', color: '#555', textAlign: 'center' }}>
            Sem cartão de crédito no período de teste
          </p>
        </div>
      </div>

      {/* Depoimentos */}
      <div style={styles.depoimentos}>
        <h2 style={styles.secaoTitulo}>Quem já usa o AgendaFácil</h2>
        <div style={styles.gridDepoimentos}>
          {[
            { nome: 'Carlos H.', segmento: 'Barbeiro', texto: 'Meus clientes adoraram poder agendar pelo celular. Reduzi muito as faltas!' },
            { nome: 'Ana P.', segmento: 'Manicure', texto: 'Super fácil de configurar. Em 10 minutos já estava recebendo agendamentos.' },
            { nome: 'Juliana M.', segmento: 'Esteticista', texto: 'Profissional demais. Meus clientes acham que tenho uma recepcionista!' },
          ].map((d, i) => (
            <div key={i} style={styles.cardDepoimento}>
              <p style={styles.depoimentoTexto}>"{d.texto}"</p>
              <div style={styles.depoimentoAutor}>
                <div style={styles.depoimentoAvatar}>{d.nome.charAt(0)}</div>
                <div>
                  <p style={styles.depoimentoNome}>{d.nome}</p>
                  <p style={styles.depoimentoSegmento}>{d.segmento}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div style={styles.ctaFinal}>
        <h2 style={{ margin: '0 0 0.75rem', fontSize: '2rem', fontWeight: '800', color: '#fff' }}>
          Pronto para começar?
        </h2>
        <p style={{ margin: '0 0 2rem', color: '#888', fontSize: '1rem' }}>
          14 dias grátis. Sem cartão. Sem compromisso.
        </p>
        <button style={styles.btnHero} onClick={() => navigate('/cadastro')}>
          Criar minha agenda grátis →
        </button>
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
  btnHero: { padding: '1rem 2.5rem', border: 'none', borderRadius: '12px', backgroundColor: '#C9A84C', color: '#0d0d0d', cursor: 'pointer', fontSize: '1.1rem', fontWeight: '700', display: 'inline-block' },
  heroSub: { margin: '0.75rem 0 0', fontSize: '0.8rem', color: '#555' },
  comoFunciona: { padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' },
  secaoTitulo: { textAlign: 'center', fontSize: '2rem', fontWeight: '700', marginBottom: '0.75rem', color: '#fff' },
  secaoSubtitulo: { textAlign: 'center', color: '#666', marginBottom: '2.5rem', fontSize: '1rem' },
  gridPassos: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' },
  cardPasso: { textAlign: 'center', padding: '1.5rem' },
  passoNum: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#C9A84C', color: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: '800', margin: '0 auto 1rem' },
  passoTitulo: { margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: '700', color: '#f0f0f0' },
  passoDesc: { margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.6 },
  features: { padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' },
  gridFeatures: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' },
  cardFeature: { backgroundColor: '#161616', borderRadius: '12px', padding: '1.5rem', border: '1px solid #242424' },
  featureIcone: { fontSize: '2rem', display: 'block', marginBottom: '0.75rem' },
  featureTitulo: { margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: '700', color: '#f0f0f0' },
  featureDesc: { margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.6 },
  plano: { padding: '4rem 2rem', maxWidth: '480px', margin: '0 auto' },
  toggleCiclo: { display: 'flex', backgroundColor: '#161616', borderRadius: '999px', padding: '4px', width: 'fit-content', margin: '0 auto 2rem', border: '1px solid #242424' },
  btnCiclo: { padding: '0.5rem 1.25rem', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.15s' },
  badgeDesconto: { backgroundColor: '#4ade8022', color: '#4ade80', padding: '0.1rem 0.4rem', borderRadius: '999px', fontSize: '0.75rem', marginLeft: '0.25rem' },
  cardPlano: { backgroundColor: '#161616', borderRadius: '16px', padding: '2rem', border: '2px solid #C9A84C' },
  planoNome: { margin: '0 0 0.25rem', fontSize: '1.5rem', fontWeight: '700', color: '#f0f0f0' },
  planoDesc: { margin: '0 0 1.5rem', fontSize: '0.85rem', color: '#666' },
  planoPreco: { display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' },
  precoValor: { fontSize: '2.5rem', fontWeight: '800', color: '#C9A84C' },
  precoLabel: { fontSize: '0.9rem', color: '#666' },
  precoAnual: { margin: '0 0 1.5rem', fontSize: '0.8rem', color: '#4ade80' },
  listaRecursos: { listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  recursoItem: { fontSize: '0.9rem', color: '#ccc' },
  btnAssinar: { width: '100%', padding: '0.85rem', border: 'none', borderRadius: '10px', backgroundColor: '#C9A84C', color: '#0d0d0d', cursor: 'pointer', fontSize: '1rem', fontWeight: '700' },
  depoimentos: { padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' },
  gridDepoimentos: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' },
  cardDepoimento: { backgroundColor: '#161616', borderRadius: '12px', padding: '1.5rem', border: '1px solid #242424' },
  depoimentoTexto: { margin: '0 0 1rem', fontSize: '0.9rem', color: '#ccc', lineHeight: 1.6, fontStyle: 'italic' },
  depoimentoAutor: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  depoimentoAvatar: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#C9A84C', color: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0 },
  depoimentoNome: { margin: 0, fontWeight: '600', color: '#f0f0f0', fontSize: '0.9rem' },
  depoimentoSegmento: { margin: 0, fontSize: '0.75rem', color: '#666' },
  ctaFinal: { padding: '5rem 2rem', textAlign: 'center', borderTop: '1px solid #1e1e1e', marginTop: '2rem' },
  footer: { padding: '2rem', borderTop: '1px solid #1e1e1e', textAlign: 'center' },
}