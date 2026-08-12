import { useAuth } from '../../contexts/AuthContext'

export default function Inicio() {
  const { barbershop } = useAuth()

  return (
    <div style={styles.container}>
      <div style={styles.boas}>
        <h2 style={styles.titulo}>Bem-vindo! 👋</h2>
        <p style={styles.subtitulo}>Seu link de agendamento está ativo</p>
        <div style={styles.linkBox}>
          <p style={styles.linkLabel}>Compartilhe com seus clientes</p>
          <div style={styles.linkRow}>
            <p style={styles.link}>agendafacil.app/{barbershop?.slug}</p>
            <button
              style={styles.btnCopiar}
              onClick={() => { navigator.clipboard.writeText(`https://agendafacil.app/${barbershop?.slug}`); alert('Link copiado!') }}
            >
              📋 Copiar
            </button>
          </div>
        </div>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <p style={styles.cardLabel}>Agendamentos hoje</p>
          <p style={styles.cardValor}>0</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardLabel}>Este mês</p>
          <p style={styles.cardValor}>0</p>
        </div>
      </div>

      <div style={styles.dicas}>
        <p style={styles.dicasTitulo}>🚀 Próximos passos</p>
        <div style={styles.listaDicas}>
          {[
            { icone: '✂️', texto: 'Cadastre seus serviços e preços', link: 'servicos' },
            { icone: '🕐', texto: 'Configure seus horários de atendimento', link: 'configuracoes' },
            { icone: '📱', texto: 'Compartilhe seu link no Instagram', link: null },
          ].map((d, i) => (
            <div key={i} style={styles.dica}>
              <span style={{ fontSize: '1.1rem' }}>{d.icone}</span>
              <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{d.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { padding: '1.5rem' },
  boas: { backgroundColor: '#161616', borderRadius: '12px', padding: '1.5rem', border: '1px solid #C9A84C33', marginBottom: '1rem' },
  titulo: { margin: '0 0 0.25rem', fontSize: '1.3rem', color: '#f0f0f0', fontWeight: '700' },
  subtitulo: { margin: '0 0 1rem', fontSize: '0.85rem', color: '#666' },
  linkBox: { backgroundColor: '#0d0d0d', borderRadius: '8px', padding: '0.75rem 1rem' },
  linkLabel: { margin: '0 0 0.5rem', fontSize: '0.75rem', color: '#888' },
  linkRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' },
  link: { margin: 0, fontWeight: '700', color: '#C9A84C', fontSize: '0.9rem' },
  btnCopiar: { padding: '0.4rem 0.75rem', border: '1px solid #C9A84C44', borderRadius: '6px', backgroundColor: 'transparent', color: '#C9A84C', cursor: 'pointer', fontSize: '0.8rem', whiteSpace: 'nowrap' },
  cards: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' },
  card: { backgroundColor: '#161616', borderRadius: '10px', padding: '1rem', border: '1px solid #242424' },
  cardLabel: { margin: '0 0 0.25rem', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' },
  cardValor: { margin: 0, fontSize: '1.8rem', fontWeight: '700', color: '#C9A84C' },
  dicas: { backgroundColor: '#161616', borderRadius: '12px', padding: '1.25rem', border: '1px solid #242424' },
  dicasTitulo: { margin: '0 0 0.75rem', fontWeight: '600', color: '#f0f0f0', fontSize: '0.95rem' },
  listaDicas: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  dica: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid #1e1e1e' },
}