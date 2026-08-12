import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Agenda from './dashboard/Agenda'
import Servicos from './dashboard/Servicos'
import Configuracoes from './dashboard/Configuracoes'
import Inicio from './dashboard/Inicio'

const MENU = [
  { id: 'inicio', label: 'Início', icone: '🏠' },
  { id: 'agenda', label: 'Agenda', icone: '📅' },
  { id: 'servicos', label: 'Serviços', icone: '✂️' },
  { id: 'configuracoes', label: 'Configurações', icone: '⚙️' },
]

export default function Dashboard() {
  const { profile, barbershop, signOut } = useAuth()
  const [tela, setTela] = useState('inicio')
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.btnHamburguer} onClick={() => setMenuAberto(m => !m)}>
          {menuAberto ? '✕' : '☰'}
        </button>
        <span style={styles.headerTitulo}>
          {MENU.find(m => m.id === tela)?.icone} {MENU.find(m => m.id === tela)?.label}
        </span>
        <span style={styles.headerNome}>{profile?.full_name?.split(' ')[0]}</span>
      </div>

      {/* Overlay */}
      {menuAberto && <div style={styles.overlay} onClick={() => setMenuAberto(false)} />}

      {/* Sidebar */}
      <div style={{ ...styles.sidebar, transform: menuAberto ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div style={styles.sidebarHeader}>
          <span style={{ fontSize: '1.3rem' }}>📅</span>
          <div>
            <p style={styles.logoNome}>AgendaFácil</p>
            <p style={styles.salonNome}>{barbershop?.name}</p>
          </div>
        </div>

        <nav style={styles.nav}>
          {MENU.map(item => (
            <button
              key={item.id}
              onClick={() => { setTela(item.id); setMenuAberto(false) }}
              style={{
                ...styles.navItem,
                backgroundColor: tela === item.id ? '#C9A84C15' : 'transparent',
                color: tela === item.id ? '#C9A84C' : '#888',
                borderLeft: tela === item.id ? '3px solid #C9A84C' : '3px solid transparent',
              }}
            >
              <span style={styles.navIcone}>{item.icone}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={styles.avatar}>{profile?.full_name?.charAt(0)}</div>
            <div>
              <p style={styles.perfilNome}>{profile?.full_name?.split(' ')[0]}</p>
              <p style={styles.perfilLink}>agendafacil.app/{barbershop?.slug}</p>
            </div>
          </div>
          <button style={styles.btnSair} onClick={signOut}>Sair</button>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={styles.conteudo}>
        {tela === 'inicio' && <Inicio />}
        {tela === 'agenda' && <Agenda />}
        {tela === 'servicos' && <Servicos />}
        {tela === 'configuracoes' && <Configuracoes />}
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0d0d0d', fontFamily: 'sans-serif' },
  header: { position: 'fixed', top: 0, left: 0, right: 0, height: '56px', backgroundColor: '#111', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', zIndex: 200 },
  btnHamburguer: { width: '36px', height: '36px', border: 'none', backgroundColor: 'transparent', color: '#C9A84C', fontSize: '1.3rem', cursor: 'pointer', borderRadius: '8px' },
  headerTitulo: { fontSize: '0.95rem', fontWeight: '600', color: '#f0f0f0' },
  headerNome: { fontSize: '0.85rem', color: '#888' },
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 300, top: '56px' },
  sidebar: { position: 'fixed', top: '56px', left: 0, bottom: 0, width: '260px', backgroundColor: '#111', borderRight: '1px solid #1e1e1e', zIndex: 400, transition: 'transform 0.25s ease', display: 'flex', flexDirection: 'column' },
  sidebarHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 1rem', borderBottom: '1px solid #1e1e1e' },
  logoNome: { margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#C9A84C' },
  salonNome: { margin: 0, fontSize: '0.75rem', color: '#555' },
  nav: { flex: 1, padding: '0.75rem 0' },
  navItem: { width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.15s', textAlign: 'left' },
  navIcone: { fontSize: '1.1rem' },
  sidebarFooter: { padding: '1rem', borderTop: '1px solid #1e1e1e' },
  avatar: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#C9A84C', color: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0 },
  perfilNome: { margin: 0, fontSize: '0.85rem', fontWeight: '600', color: '#f0f0f0' },
  perfilLink: { margin: 0, fontSize: '0.7rem', color: '#555' },
  btnSair: { width: '100%', padding: '0.6rem', border: '1px solid #2a2a2a', borderRadius: '8px', backgroundColor: 'transparent', color: '#666', cursor: 'pointer', fontSize: '0.85rem' },
  conteudo: { paddingTop: '56px', minHeight: '100vh' },
}