// frontend/src/ConfigPage.tsx
import { useEffect, useState } from 'react'

export function ConfigPage() {
  const [cfg, setCfg] = useState<any>(null)
  const [raw, setRaw] = useState<string>('')

  useEffect(() => {
    fetch('/config')
      .then(r => r.json())
      .then(data => {
        setCfg(data)
        setRaw(JSON.stringify(data, null, 2))
      })
  }, [])

  const save = () => {
    fetch('/config', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: raw
    }).then(() => alert('Saved!'))
  }

  if (!cfg) return <div style={{ color: '#fff' }}>Loading config…</div>
  return (
    <div style={{ color: '#fff', padding: '2rem' }}>
      <h1>Config</h1>
      <textarea
        value={raw}
        onChange={e => setRaw(e.target.value)}
        style={{ width: '100%', height: '60vh', background: '#333', color: '#fff' }}
      />
      <button onClick={save}>Save</button>
    </div>
  )
}
