import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Cadastro() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const plano = searchParams.get('plano') || 'pro'
  const ciclo = searchParams.get('ciclo') || 'mensal'

  const [etapa, setEtapa] = useState(1)
  const [loading, setLoading] = useState(false)
  const [erros, setErros] = useState({})

  // Etapa 1 — dados pessoais
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')

  // Etapa 2 — dados do salão
  const [nomeSalao, setNomeSalao] = useState('')
  const [segmento, setSegmento] = useState('')
  const [slug, setSlug] = useState('')
  const [slugDisponivel, setSlugDisponivel] = useState(null)
  const [verificandoSlug, setVerificandoSlug] = useState(false)

  const SEGMENTOS = [
    { id: 'barbearia', label: '✂️ Barbearia' },
    { id: 'salao', label: '💇 Salão de beleza' },
    { id: 'estetica', label: '💅 Estética' },
    { id: 'tatuagem', label: '🎨 Estúdio de tatuagem' },
    { id: 'outros', label: '🏪 Outros' },
  ]

  function gerarSlug(nome) {
    return nome.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  async function verificarSlug(valor) {
    if (!valor || valor.length < 3) { setSlugDisponivel(null); return }
    setVerificandoSlug(true)
    const { data } = await supabase.from('barbershops').select('id').eq('slug', valor).single()
    setSlugDisponivel(!data)
    setVerificandoSlug(false)
  }

  async function handleEtapa1() {
    const novosErros = {}
    if (!nome.trim()) novosErros.nome = 'Digite seu nome.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) novosErros.email = 'Digite um email válido.'
    if (senha.length < 6) novosErros.senha = 'Mínimo 6 caracteres.'
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return }
    setErros({})
    setEtapa(2)
  }

  async function handleCadastrar() {
    const novosErros = {}
    if (!nomeSalao.trim()) novosErros.nomeSalao = 'Digite o nome do salão.'
    if (!segmento) novosErros.segmento = 'Selecione o segmento.'
    if (!slug || slug.length < 3) novosErros.slug = 'Digite um endereço válido.'
    if (slugDisponivel === false) novosErros.slug = 'Este endereço já está em uso.'
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return }

    setLoading(true)
    setErros({})

    // Cria o usuário
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { full_name: nome, role: 'owner' } }
    })

    if (authError) {
      setErros({ geral: authError.message })
      setLoading(false)
      return
    }

    // Cria a barbearia
    const { data: barbershop, error: shopError } = await supabase
      .from('barbershops')
      .insert({
        name: nomeSalao,
        slug: slug,
        subscription_status: 'trial',
        opening_hours: {
          0: { open: false, open_time: '08:00', close_time: '18:00' },
          1: { open: true, open_time: '08:00', close_time: '18:00' },
          2: { open: true, open_time: '08:00', close_time: '18:00' },
          3: { open: true, open_time: '08:00', close_time: '18:00' },
          4: { open: true, open_time: '08:00', close_time: '18:00' },
          5: { open: true, open_time: '08:00', close_time: '18:00' },
          6: { open: true, open_time: '08:00', close_time: '13:00' },
        }
      })
      .select()
      .single()

    if (shopError) {
      setErros({ geral: 'Erro ao criar salão. Tente novamente.' })
      setLoading(false)
      return
    }

    // Atualiza o perfil do dono
    await supabase.from('profiles').update({
      barbershop_id: barbershop.id,
      role: 'owner',
      full_name: nome,
      phone: telefone,
    }).eq('id', authData.user.id)

    navigate(`/sucesso?slug=${slug}`)
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <span style={styles.logoIcone}>📅</span>
          <span style={styles.logoNome}>AgendaFácil</span>
        </div>

        {/* Progress */}
        <div style={styles.progress}>
          {[1, 2].map(n => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ ...styles.progressStep, backgroundColor: etapa >= n ? '#C9A84C' : '#2a2a2a', color: etapa >= n ? '#0d0d0d' : '#555' }}>{n}</div>
              {n < 2 && <div style={{ ...styles.progressLine, backgroundColor: etapa > n ? '#C9A84C' : '#2a2a2a' }} />}
            </div>
          ))}
        </div>

        {etapa === 1 && (
          <>
            <h2 style={styles.titulo}>Crie sua conta</h2>
            <p style={styles.subtitulo}>14 dias grátis, sem cartão de crédito</p>

            <div style={styles.campo}>
              <label style={styles.label}>Nome completo</label>
              <input style={{ ...styles.input, border: erros.nome ? '1px solid #e05c5c' : '1px solid #2a2a2a' }} type="text" value={nome} onChange={e => { setNome(e.target.value); setErros(p => ({ ...p, nome: null })) }} placeholder="Ex: João Silva" />
              {erros.nome && <p style={styles.erroInline}>{erros.nome}</p>}
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>Email</label>
              <input style={{ ...styles.input, border: erros.email ? '1px solid #e05c5c' : '1px solid #2a2a2a' }} type="email" value={email} onChange={e => { setEmail(e.target.value); setErros(p => ({ ...p, email: null })) }} placeholder="seu@email.com" />
              {erros.email && <p style={styles.erroInline}>{erros.email}</p>}
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>Telefone</label>
              <input style={styles.input} type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(51) 99999-9999" />
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>Senha</label>
              <input style={{ ...styles.input, border: erros.senha ? '1px solid #e05c5c' : '1px solid #2a2a2a' }} type="password" value={senha} onChange={e => { setSenha(e.target.value); setErros(p => ({ ...p, senha: null })) }} placeholder="Mínimo 6 caracteres" />
              {erros.senha && <p style={styles.erroInline}>{erros.senha}</p>}
            </div>

            <button style={styles.btnPrimario} onClick={handleEtapa1}>
              Continuar →
            </button>

            <p style={styles.linkLogin}>
              Já tem conta? <span style={styles.link} onClick={() => navigate('/login')}>Entrar</span>
            </p>
          </>
        )}

        {etapa === 2 && (
          <>
            <h2 style={styles.titulo}>Seu salão</h2>
            <p style={styles.subtitulo}>Configure as informações básicas</p>

            <div style={styles.campo}>
              <label style={styles.label}>Nome do salão</label>
              <input
                style={{ ...styles.input, border: erros.nomeSalao ? '1px solid #e05c5c' : '1px solid #2a2a2a' }}
                type="text"
                value={nomeSalao}
                onChange={e => {
                  setNomeSalao(e.target.value)
                  const s = gerarSlug(e.target.value)
                  setSlug(s)
                  setErros(p => ({ ...p, nomeSalao: null }))
                  verificarSlug(s)
                }}
                placeholder="Ex: Studio João Silva"
              />
              {erros.nomeSalao && <p style={styles.erroInline}>{erros.nomeSalao}</p>}
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>Segmento</label>
              <div style={styles.gridSegmentos}>
                {SEGMENTOS.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => { setSegmento(s.id); setErros(p => ({ ...p, segmento: null })) }}
                    style={{ ...styles.btnSegmento, border: segmento === s.id ? '2px solid #C9A84C' : '2px solid #2a2a2a', backgroundColor: segmento === s.id ? '#1a1a0a' : '#1a1a1a', color: segmento === s.id ? '#C9A84C' : '#888' }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {erros.segmento && <p style={styles.erroInline}>{erros.segmento}</p>}
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>Seu endereço no AgendaFácil</label>
              <div style={styles.slugContainer}>
                <span style={styles.slugPrefix}>agendafacil.app/</span>
                <input
                  style={{ ...styles.inputSlug, border: erros.slug ? '1px solid #e05c5c' : '1px solid #2a2a2a' }}
                  type="text"
                  value={slug}
                  onChange={e => {
                    const val = gerarSlug(e.target.value)
                    setSlug(val)
                    setErros(p => ({ ...p, slug: null }))
                    verificarSlug(val)
                  }}
                  placeholder="meu-salao"
                />
              </div>
              {verificandoSlug && <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.3rem' }}>Verificando...</p>}
              {!verificandoSlug && slugDisponivel === true && <p style={{ fontSize: '0.75rem', color: '#4ade80', marginTop: '0.3rem' }}>✅ Disponível!</p>}
              {!verificandoSlug && slugDisponivel === false && <p style={{ fontSize: '0.75rem', color: '#e05c5c', marginTop: '0.3rem' }}>❌ Já está em uso.</p>}
              {erros.slug && <p style={styles.erroInline}>{erros.slug}</p>}
            </div>

            {erros.geral && <p style={styles.erroInline}>{erros.geral}</p>}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={styles.btnVoltar} onClick={() => setEtapa(1)}>← Voltar</button>
              <button style={{ ...styles.btnPrimario, flex: 1 }} onClick={handleCadastrar} disabled={loading}>
                {loading ? 'Criando conta...' : 'Criar minha conta grátis'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' },
  card: { backgroundColor: '#161616', borderRadius: '16px', padding: '2.5rem 2rem', width: '100%', maxWidth: '440px', border: '1px solid #242424' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' },
  logoIcone: { fontSize: '1.5rem' },
  logoNome: { fontSize: '1.2rem', fontWeight: '800', color: '#C9A84C' },
  progress: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' },
  progressStep: { width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700' },
  progressLine: { width: '60px', height: '2px' },
  titulo: { margin: '0 0 0.25rem', fontSize: '1.4rem', fontWeight: '700', color: '#fff', textAlign: 'center' },
  subtitulo: { margin: '0 0 1.5rem', fontSize: '0.85rem', color: '#666', textAlign: 'center' },
  campo: { marginBottom: '1rem' },
  label: { display: 'block', fontWeight: '600', fontSize: '0.8rem', marginBottom: '0.4rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' },
  input: { width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box', backgroundColor: '#1a1a1a', color: '#f0f0f0', outline: 'none' },
  erroInline: { color: '#e05c5c', fontSize: '0.8rem', marginTop: '0.3rem', marginBottom: 0 },
  btnPrimario: { width: '100%', padding: '0.85rem', border: 'none', borderRadius: '10px', backgroundColor: '#C9A84C', color: '#0d0d0d', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', marginTop: '0.5rem' },
  btnVoltar: { padding: '0.85rem 1.25rem', border: '1px solid #2a2a2a', borderRadius: '10px', backgroundColor: 'transparent', color: '#666', cursor: 'pointer', fontSize: '1rem' },
  linkLogin: { textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#555' },
  link: { color: '#C9A84C', cursor: 'pointer', fontWeight: '600' },
  gridSegmentos: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' },
  btnSegmento: { padding: '0.6rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', textAlign: 'left' },
  slugContainer: { display: 'flex', alignItems: 'center', border: '1px solid #2a2a2a', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#1a1a1a' },
  slugPrefix: { padding: '0.75rem', fontSize: '0.85rem', color: '#555', whiteSpace: 'nowrap', borderRight: '1px solid #2a2a2a' },
  inputSlug: { flex: 1, padding: '0.75rem', border: 'none', backgroundColor: 'transparent', color: '#f0f0f0', fontSize: '1rem', outline: 'none' },
}