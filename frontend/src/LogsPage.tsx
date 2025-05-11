// frontend/src/LogsPage.tsx
import { useEffect, useState } from 'react'

export function LogsPage() {
  const [lines, setLines] = useState<string[]>([])
  useEffect(() => {
    const es = new EventSource('/logs/stream')
    es.onmessage = e => setLines(l => [...l, e.data])
    return () => es.close()
  }, [])
  return (
    <div style={{ color: '#fff', padding: '1rem', fontFamily: 'monospace' }}>
      <h1>Live Logs</h1>
      <div style={{ maxHeight: '70vh', overflow: 'auto', background: '#111', padding: '1rem' }}>
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  )
}
