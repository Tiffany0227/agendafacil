import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../contexts/AuthContext'

export default function Servicos() {
  const { barbershop } = useAuth()
  const [servicos, setServicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erros, setErros] = useState({})
  const [editando, setEditando] = useState(null)

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [duracao, setDuracao] = useState('')

  useEffect(() => { if (barbershop) buscarServicos() }, [barbershop])

  async function buscarServicos() {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('barbershop_id', barbershop.id)
      .order('name')
    setServicos(data || [])
    setLoading(false)
  }

  function limparForm() {
    setNome('')
    setDescricao('')
    setPreco('')
    setDuracao('')
    setErros({})
    setEditando(null)
  }

  function abrirEdicao(s) {
    setEditando(s.id)
    setNome(s.name)
    setDescricao(s.description || '')
    setPreco(s.price.toString())
    setDuracao(s.duration_minutes.toString())
  }

  async function handleSalvar() {
    const novosErros = {}
    if (!nome.trim()) novosErros.nome = 'Digite o nome do serviço.'
    if (!preco || isNaN(preco) || Number(preco) <= 0) novosErros.preco = 'Digite um preço válido.'
    if (!duracao || isNaN(duracao) || Number(duracao) <= 0) novosErros.duracao = 'Digite uma duração válida.'
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return }

    setSalvando(true)

    if (editando) {
      await supabase.from('services').update({
        name: nome, description: descricao || null,
        price: Number(preco), duration_minutes: Number(duracao),
      }).eq('id', editando)
    } else {
      await supabase.from('services').insert({
        barbershop_id: barbershop.id,
        name: nome, description: descricao || null,
        price: Number(preco), duration_minutes: Number(duracao),
        active: true,
      })
    }

    limparForm()
    buscarServicos()
    setSalvando(false)
  }

  async function handleToggle(id, ativo) {
    await supabase.from('services').update({ active: !ativo }).eq('id', id)
    buscarServicos()
  }

  async function handleExcluir(id, nome) {
    if (!confirm(`Excluir "${nome}"?`)) return
    await supabase.from('services').delete().eq('id', id)
    buscarServicos()
  }

  if (loading) return <p style={{ padding: '2rem', color: '#888' }}>Carregando...</p>

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.titulo}>✂️ Meus Serviços</h1>
      </div>

      <div style={styles.conteudo}>
        {/* Formulário */}
        <div style={styles.card}>
          <h3 style={styles.cardTitulo}>{editando ? 'Editar serviço' : 'Novo serviço'}</h3>

          <div style={styles.campo}>
            <label style={styles.label}>Nome</label>
            <input style={{ ...styles.input, border: erros.nome ? '1px solid #e05c5c' : '1px solid #2a2a2a' }} type="text" value={nome} onChange={e => { setNome(e.target.value); setErros(p => ({ ...p, nome: null })) }} placeholder="Ex: Corte de cabelo" />
            {erros.nome && <p style={styles.erroInline}>{erros.nome}</p>}
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Descrição (opcional)</label>
            <input style={styles.input} type="text" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Ex: Corte masculino moderno" />
          </div>

          <div style={styles.duplosCampos}>
            <div style={styles.campo}>
              <label style={styles.label}>Preço (R$)</label>
              <input style={{ ...styles.input, border: erros.preco ? '1px solid #e05c5c' : '1px solid #2a2a2a' }} type="number" value={preco} onChange={e => { setPreco(e.target.value); setErros(p => ({ ...p, preco: null })) }} placeholder="Ex: 40.00" min="0" step="0.01" />
              {erros.preco && <p style={styles.erroInline}>{erros.preco}</p>}
            </div>
            <div style={styles.campo}>
              <label style={styles.label}>Duração (min)</label>
              <input style={{ ...styles.input, border: erros.duracao ? '1px solid #e05c5c' : '1px solid #2a2a2a' }} type="number" value={duracao} onChange={e => { setDuracao(e.target.value); setErros(p => ({ ...p, duracao: null })) }} placeholder="Ex: 30" min="0" />
              {erros.duracao && <p style={styles.erroInline}>{erros.duracao}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={styles.btnPrimario} onClick={handleSalvar} disabled={salvando}>
              {salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Adicionar serviço'}
            </button>
            {editando && (
              <button style={styles.btnCancelar} onClick={limparForm}>Cancelar</button>
            )}
          </div>
        </div>

        {/* Lista */}
        <h3 style={styles.secaoTitulo}>Serviços cadastrados</h3>
        {servicos.length === 0 ? (
          <p style={styles.vazio}>Nenhum serviço cadastrado ainda. Adicione seu primeiro serviço!</p>
        ) : (
          <div style={styles.lista}>
            {servicos.map(s => (
              <div key={s.id} style={{ ...styles.cardServico, opacity: s.active ? 1 : 0.5 }}>
                <div style={styles.servicoInfo}>
                  <p style={styles.servicoNome}>{s.name}</p>
                  {s.description && <p style={styles.servicoDesc}>{s.description}</p>}
                  <p style={styles.servicoMeta}>{s.duration_minutes}min • R$ {Number(s.price).toFixed(2)}</p>
                </div>
                <div style={styles.servicoAcoes}>
                  <button onClick={() => abrirEdicao(s)} style={styles.btnEditar}>Editar</button>
                  <button onClick={() => handleToggle(s.id, s.active)} style={{ ...styles.btnToggle, color: s.active ? '#4ade80' : '#e05c5c' }}>
                    {s.active ? 'Ativo' : 'Inativo'}
                  </button>
                  <button onClick={() => handleExcluir(s.id, s.name)} style={styles.btnExcluir}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0d0d0d', fontFamily: 'sans-serif' },
  header: { backgroundColor: '#111', borderBottom: '1px solid #C9A84C33', padding: '1.25rem 1.5rem' },
  titulo: { margin: 0, fontSize: '1.2rem', color: '#fff' },
  conteudo: { padding: '1.5rem' },
  card: { backgroundColor: '#161616', borderRadius: '12px', padding: '1.25rem', border: '1px solid #242424', marginBottom: '1.5rem' },
  cardTitulo: { margin: '0 0 1rem', fontSize: '1rem', color: '#C9A84C', fontWeight: '600' },
  campo: { marginBottom: '1rem', flex: 1 },
  duplosCampos: { display: 'flex', gap: '1rem' },
  label: { display: 'block', fontWeight: '600', fontSize: '0.8rem', marginBottom: '0.4rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' },
  input: { width: '100%', padding: '0.7rem 0.8rem', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box', backgroundColor: '#1a1a1a', color: '#f0f0f0' },
  erroInline: { color: '#e05c5c', fontSize: '0.8rem', marginTop: '0.3rem', marginBottom: 0 },
  btnPrimario: { flex: 1, padding: '0.85rem', border: 'none', borderRadius: '10px', backgroundColor: '#C9A84C', color: '#0d0d0d', cursor: 'pointer', fontSize: '1rem', fontWeight: '700' },
  btnCancelar: { padding: '0.85rem 1.25rem', border: '1px solid #2a2a2a', borderRadius: '10px', backgroundColor: 'transparent', color: '#666', cursor: 'pointer' },
  secaoTitulo: { margin: '0 0 0.75rem', fontSize: '0.7rem', color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '600' },
  lista: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  cardServico: { backgroundColor: '#161616', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #242424' },
  servicoInfo: { flex: 1 },
  servicoNome: { margin: '0 0 0.2rem', fontWeight: '600', color: '#f0f0f0', fontSize: '0.9rem' },
  servicoDesc: { margin: '0 0 0.2rem', fontSize: '0.75rem', color: '#555' },
  servicoMeta: { margin: 0, fontSize: '0.8rem', color: '#666' },
  servicoAcoes: { display: 'flex', gap: '0.5rem', flexShrink: 0 },
  btnEditar: { padding: '0.3rem 0.6rem', border: '1px solid #C9A84C44', borderRadius: '6px', backgroundColor: 'transparent', color: '#C9A84C', cursor: 'pointer', fontSize: '0.75rem' },
  btnToggle: { padding: '0.3rem 0.6rem', border: '1px solid #2a2a2a', borderRadius: '6px', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '0.75rem' },
  btnExcluir: { padding: '0.3rem 0.5rem', border: '1px solid #e05c5c44', borderRadius: '6px', backgroundColor: 'transparent', color: '#e05c5c', cursor: 'pointer', fontSize: '0.75rem' },
  vazio: { textAlign: 'center', color: '#555', padding: '2rem', backgroundColor: '#161616', borderRadius: '12px', border: '1px solid #242424' },
}