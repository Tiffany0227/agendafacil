import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { profile, barbershop, signOut } = useAuth()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', fontFamily: 'sans-serif', color: '#f0f0f0' }}>
      <div style={{ backgroundColor: '#111', borderBottom: '1px solid #1e1e1e', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>📅</span>
          <span style={{ fontWeight: '800', color: '#C9A84C' }}>AgendaFácil</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>Olá, {profile?.full_name?.split(' ')[0]}</span>
          <button onClick={signOut} style={{ padding: '0.4rem 0.75rem', border: '1px solid #2a2a2a', borderRadius: '6px', backgroundColor: 'transparent', color: '#666', cursor: 'pointer', fontSize: '0.8rem' }}>Sair</button>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#161616', borderRadius: '12px', padding: '1.5rem', border: '1px solid #C9A84C33', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: '0 0 0.5rem', color: '#C9A84C' }}>🎉 Bem-vindo ao AgendaFácil!</h2>
          <p style={{ margin: '0 0 1rem', color: '#888' }}>
            Seu salão <strong style={{ color: '#f0f0f0' }}>{barbershop?.name}</strong> está configurado.
          </p>
          <div style={{ backgroundColor: '#1a1a0a', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid #C9A84C22' }}>
            <p style={{ margin: '0 0 0.2rem', fontSize: '0.75rem', color: '#888' }}>Seu link de agendamento</p>
            <p style={{ margin: 0, fontWeight: '700', color: '#C9A84C' }}>agendafacil.app/{barbershop?.slug}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {[
            { icone: '📅', titulo: 'Agenda', desc: 'Gerencie seus agendamentos' },
            { icone: '⚙️', titulo: 'Configurações', desc: 'Configure seu salão' },
            { icone: '👥', titulo: 'Equipe', desc: 'Gerencie seus profissionais' },
            { icone: '💰', titulo: 'Financeiro', desc: 'Controle suas finanças' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#161616', borderRadius: '12px', padding: '1.25rem', border: '1px solid #242424', cursor: 'pointer' }}>
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{item.icone}</span>
              <h3 style={{ margin: '0 0 0.25rem', color: '#f0f0f0', fontSize: '1rem' }}>{item.titulo}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}