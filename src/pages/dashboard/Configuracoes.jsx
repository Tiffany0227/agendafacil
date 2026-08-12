import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../contexts/AuthContext'

const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

function Secao({ titulo, icone, children }) {
  const [aberta, setAberta] = useState(false)
  return (
    <div style={{ backgroundColor: '#161616', borderRadius: '12px', border: '1px solid #242424', marginBottom: '0.75rem', overflow: 'hidden' }}>
      <div onClick={() => setAberta(a => !a)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.1rem' }}>{icone}</span>
          <span style={{ fontWeight: '600', color: '#f0f0f0', fontSize: '0.95rem' }}>{titulo}</span>
        </div>
        <span style={{ color: '#C9A84C', fontSize: '0.8rem' }}>{aberta ? '▲' : '▼'}</span>
      </div>
      {aberta && (
        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #242424' }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default function Configuracoes() {
  const { barbershop } = useAuth()
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState('')

  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [telefone, setTelefone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [fotoPreview, setFotoPreview] = useState(null)
  const [foto, setFoto] = useState(null)
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
    if (barbershop) {
      setNome(barbershop.name || '')
      setEndereco(barbershop.address || '')
      setTelefone(barbershop.phone || '')
      setInstagram(barbershop.instagram || '')
      setLogoUrl(barbershop.logo_url || '')
      const h = Array.from({ length: 7 }, (_, i) => ({
        open: barbershop.opening_hours?.[i]?.open || false,
        open_time: barbershop.opening_hours?.[i]?.open_time || '08:00',
        close_time: barbershop.opening_hours?.[i]?.close_time || '18:00',
      }))
      setHorarios(h)
      setLoading(false)
    }
  }, [barbershop])

  async function comprimirImagem(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = 400
          canvas.height = 400
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, 400, 400)
          canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.85)
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  async function handleSalvar() {
    setSalvando(true)
    let novaLogoUrl = logoUrl

    if (foto) {
      const fotoComprimida = await comprimirImagem(foto)
      const caminho = `barbearia/${barbershop.id}.jpg`
      const { error } = await supabase.storage.from('images').upload(caminho, fotoComprimida, { upsert: true, contentType: 'image/jpeg' })
      if (!error) {
        const { data } = supabase.storage.from('images').getPublicUrl(caminho)
        novaLogoUrl = `${data.publicUrl}?t=${Date.now()}`
      }
    }

    const openingHours = {}
    horarios.forEach((h, i) => { openingHours[i] = h })

    await supabase.from('barbershops').update({
      name: nome,
      address: endereco,
      phone: telefone,
      instagram: instagram || null,
      logo_url: novaLogoUrl,
      opening_hours: openingHours,
    }).eq('id', barbershop.id)

    setLogoUrl(novaLogoUrl)
    setFoto(null)
    setFotoPreview(null)
    setSucesso('Salvo com sucesso!')
    setTimeout(() => setSucesso(''), 3000)
    setSalvando(false)
  }

  if (loading) return <p style={{ padding: '2rem', color: '#888' }}>Carregando...</p>

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.titulo}>⚙️ Configurações</h1>
      </div>
      <div style={styles.conteudo}>
        {sucesso && <p style={styles.sucesso}>{sucesso}</p>}

        <Secao titulo="Perfil do salão" icone="🏪">
          <div style={{ paddingTop: '1rem' }}>
            {/* Logo */}
            <div style={styles.campo}>
              <label style={styles.label}>Foto de perfil</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={styles.logoPreview}>
                  {fotoPreview || logoUrl
                    ? <img src={fotoPreview || logoUrl} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: '2rem' }}>🏪</span>}
                </div>
                <label style={styles.btnFoto}>
                  📷 Alterar foto
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                    const file = e.target.files[0]
                    if (!file) return
                    setFoto(file)
                    setFotoPreview(URL.createObjectURL(file))
                  }} />
                </label>
              </div>
            </div>
            <div style={styles.campo}>
              <label style={styles.label}>Nome do salão</label>
              <input style={styles.input} type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Studio João Silva" />
            </div>
            <div style={styles.campo}>
              <label style={styles.label}>Endereço</label>
              <input style={styles.input} type="text" value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Ex: Rua das Flores, 123" />
            </div>
            <div style={styles.campo}>
              <label style={styles.label}>Telefone / WhatsApp</label>
              <input style={styles.input} type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Ex: (51) 99999-9999" />
            </div>
            <div style={styles.campo}>
              <label style={styles.label}>Instagram</label>
              <input style={styles.input} type="text" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="Ex: @meuStudio" />
            </div>
            <button style={styles.btnPrimario} onClick={handleSalvar} disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar perfil'}
            </button>
          </div>
        </Secao>

        <Secao titulo="Horários de atendimento" icone="🕐">
          <div style={{ paddingTop: '1rem' }}>
            {DIAS_SEMANA.map((dia, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid #1e1e1e' }}>
                <div
                  onClick={() => setHorarios(prev => prev.map((h, idx) => idx === i ? { ...h, open: !h.open } : h))}
                  style={{ width: '44px', height: '24px', borderRadius: '12px', padding: '2px', backgroundColor: horarios[i]?.open ? '#C9A84C' : '#2a2a2a', position: 'relative', flexShrink: 0, cursor: 'pointer' }}
                >
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '2px', left: horarios[i]?.open ? '22px' : '2px', transition: 'left 0.15s' }} />
                </div>
                <span style={{ width: '80px', fontSize: '0.85rem', color: horarios[i]?.open ? '#f0f0f0' : '#555', flexShrink: 0 }}>{dia}</span>
                {horarios[i]?.open ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                    <input type="time" value={horarios[i]?.open_time || '08:00'} onChange={e => setHorarios(prev => prev.map((h, idx) => idx === i ? { ...h, open_time: e.target.value } : h))} style={styles.inputTime} />
                    <span style={{ color: '#555', fontSize: '0.85rem' }}>até</span>
                    <input type="time" value={horarios[i]?.close_time || '18:00'} onChange={e => setHorarios(prev => prev.map((h, idx) => idx === i ? { ...h, close_time: e.target.value } : h))} style={styles.inputTime} />
                  </div>
                ) : (
                  <span style={{ fontSize: '0.85rem', color: '#444' }}>Fechado</span>
                )}
              </div>
            ))}
            <button style={{ ...styles.btnPrimario, marginTop: '1rem' }} onClick={handleSalvar} disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar horários'}
            </button>
          </div>
        </Secao>

        <Secao titulo="Meu link de agendamento" icone="🔗">
          <div style={{ paddingTop: '1rem' }}>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: '#888' }}>
              Compartilhe este link com seus clientes para que eles possam agendar online.
            </p>
            <div style={styles.linkBox}>
              <p style={styles.linkUrl}>agendafacil.app/{barbershop?.slug}</p>
              <button
                style={styles.btnCopiar}
                onClick={() => { navigator.clipboard.writeText(`https://agendafacil.app/${barbershop?.slug}`); alert('Link copiado!') }}
              >
                📋 Copiar
              </button>
            </div>
          </div>
        </Secao>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0d0d0d', fontFamily: 'sans-serif' },
  header: { backgroundColor: '#111', borderBottom: '1px solid #C9A84C33', padding: '1.25rem 1.5rem' },
  titulo: { margin: 0, fontSize: '1.2rem', color: '#fff' },
  conteudo: { padding: '1.5rem' },
  sucesso: { color: '#4ade80', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' },
  campo: { marginBottom: '1rem' },
  label: { display: 'block', fontWeight: '600', fontSize: '0.8rem', marginBottom: '0.4rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' },
  input: { width: '100%', padding: '0.7rem 0.8rem', borderRadius: '8px', border: '1px solid #2a2a2a', fontSize: '1rem', boxSizing: 'border-box', backgroundColor: '#1a1a1a', color: '#f0f0f0' },
  inputTime: { padding: '0.4rem 0.5rem', borderRadius: '6px', border: '1px solid #2a2a2a', backgroundColor: '#1a1a1a', color: '#f0f0f0', fontSize: '0.85rem' },
  btnPrimario: { width: '100%', padding: '0.85rem', border: 'none', borderRadius: '10px', backgroundColor: '#C9A84C', color: '#0d0d0d', cursor: 'pointer', fontSize: '1rem', fontWeight: '700' },
  logoPreview: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#1a1a1a', border: '2px solid #C9A84C44', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 },
  btnFoto: { padding: '0.5rem 1rem', border: '1px solid #2a2a2a', borderRadius: '8px', backgroundColor: '#1a1a1a', color: '#f0f0f0', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-block' },
  linkBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid #C9A84C33' },
  linkUrl: { margin: 0, fontWeight: '700', color: '#C9A84C', fontSize: '0.9rem' },
  btnCopiar: { padding: '0.4rem 0.75rem', border: '1px solid #C9A84C44', borderRadius: '6px', backgroundColor: 'transparent', color: '#C9A84C', cursor: 'pointer', fontSize: '0.8rem' },
}