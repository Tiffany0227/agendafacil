import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({})
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    const novosErros = {}
    if (!email.trim()) novosErros.email = 'Digite seu email.'
    if (!senha.trim()) novosErros.senha = 'Digite sua senha.'
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return }

    setLoading(true)
    setErros({})

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })

    if (error) {
      setErros({ senha: 'Email ou senha incorretos.' })
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <span style={styles.logoIcone}>📅</span>
          <span style={styles.logoNome}>AgendaFácil</span>
        </div>

        <h2 style={styles.titulo}>Entrar na sua conta</h2>
        <p style={styles.subtitulo}>Bem-vindo de volta!</p>

        <form onSubmit={handleLogin}>
          <div style={styles.campo}>
            <label style={styles.label}>Email</label>
            <input
              style={{ ...styles.input, border: erros.email ? '1px solid #e05c5c' : '1px solid #2a2a2a' }}
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErros(p => ({ ...p, email: null })) }}
              placeholder="seu@email.com"
            />
            {erros.email && <p style={styles.erroInline}>{erros.email}</p>}
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Senha</label>
            <input
              style={{ ...styles.input, border: erros.senha ? '1px solid #e05c5c' : '1px solid #2a2a2a' }}
              type="password"
              value={senha}
              onChange={e => { setSenha(e.target.value); setErros(p => ({ ...p, senha: null })) }}
              placeholder="••••••••"
            />
            {erros.senha && <p style={styles.erroInline}>{erros.senha}</p>}
          </div>

          <button style={styles.btnPrimario} type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <button
          style={styles.btnEsqueci}
          onClick={async () => {
            if (!email.trim()) { setErros({ email: 'Digite seu email primeiro.' }); return }
            await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${window.location.origin}/redefinir-senha`,
            })
            alert('Email de redefinição enviado!')
          }}
        >
          Esqueci minha senha
        </button>

        <p style={styles.linkCadastro}>
          Não tem conta?{' '}
          <span style={styles.link} onClick={() => navigate('/cadastro')}>
            Criar conta grátis
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' },
  card: { backgroundColor: '#161616', borderRadius: '16px', padding: '2.5rem 2rem', width: '100%', maxWidth: '400px', border: '1px solid #242424' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' },
  logoIcone: { fontSize: '1.5rem' },
  logoNome: { fontSize: '1.2rem', fontWeight: '800', color: '#C9A84C' },
  titulo: { margin: '0 0 0.25rem', fontSize: '1.4rem', fontWeight: '700', color: '#fff', textAlign: 'center' },
  subtitulo: { margin: '0 0 1.5rem', fontSize: '0.85rem', color: '#666', textAlign: 'center' },
  campo: { marginBottom: '1rem' },
  label: { display: 'block', fontWeight: '600', fontSize: '0.8rem', marginBottom: '0.4rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' },
  input: { width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box', backgroundColor: '#1a1a1a', color: '#f0f0f0', outline: 'none' },
  erroInline: { color: '#e05c5c', fontSize: '0.8rem', marginTop: '0.3rem', marginBottom: 0 },
  btnPrimario: { width: '100%', padding: '0.85rem', border: 'none', borderRadius: '10px', backgroundColor: '#C9A84C', color: '#0d0d0d', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', marginTop: '0.5rem' },
  btnEsqueci: { width: '100%', padding: '0.6rem', border: 'none', backgroundColor: 'transparent', color: '#666', cursor: 'pointer', fontSize: '0.85rem', marginTop: '0.25rem' },
  linkCadastro: { textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#555' },
  link: { color: '#C9A84C', cursor: 'pointer', fontWeight: '600' },
}