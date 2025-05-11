// Control-Panel/frontend/src/App.tsx
import { useEffect, useState } from 'react'

interface Status {
  ai_model: string
  task_engine: string
  cpu: number
  ram: number
}

export function App() {
  const [status, setStatus] = useState<Status | null>(null)

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(err => console.error('Error fetching status:', err))
  }, [])

  if (!status) {
    return <div style={{ color: 'white', textAlign: 'center' }}>Loading status…</div>
  }

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',  // dark grey background
        color: '#fff',               // white text on dark bg
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>System Status</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>AI Model: {status.ai_model}</li>
        <li>Task Engine: {status.task_engine}</li>
        <li>CPU: {status.cpu.toFixed(1)}%</li>
        <li>RAM: {status.ram.toFixed(1)}%</li>
      </ul>
    </div>
  )
}
