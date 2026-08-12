import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Sucesso() {
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('slug')
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ backgroundColor: '#161616', borderRadius: '16px', padding: '2.5rem 2rem', width: '100%', maxWidth: '440px', border: '1px solid #242424', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>Conta criada com sucesso!</h2>
        <p style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', color: '#666' }}>
          Seu período de teste de 14 dias começou agora. Explore todas as funcionalidades sem limitações.
        </p>
        <div style={{ backgroundColor: '#1a1a0a', borderRadius: '10px', padding: '1rem', border: '1px solid #C9A84C33', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.25rem', fontSize: '0.75rem', color: '#888' }}>Seu link de agendamento</p>
          <p style={{ margin: 0, fontWeight: '700', color: '#C9A84C', fontSize: '0.95rem' }}>agendafacil.app/{slug}</p>
        </div>
        <button
          style={{ width: '100%', padding: '0.85rem', border: 'none', borderRadius: '10px', backgroundColor: '#C9A84C', color: '#0d0d0d', cursor: 'pointer', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => navigate('/dashboard')}
        >
          Acessar meu painel →
        </button>
      </div>
    </div>
  )
}