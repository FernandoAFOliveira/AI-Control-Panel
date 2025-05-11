// Control-Panel/frontend/src/Nav.tsx
import { Link } from 'react-router-dom'
export function Nav() {
  return (
    <nav style={{ color: '#fff', textAlign: 'center', margin: '1rem 0' }}>
      <Link to="/">Status</Link> | <Link to="/config">Config</Link> |{' '}
      <Link to="/logs">Logs</Link>
    </nav>
  )
}
