// Control-Panel/frontend/src/main.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App as StatusPage } from './App'
import { ConfigPage } from './ConfigPage'
import { LogsPage } from './LogsPage'

ReactDOM.createRoot(...).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StatusPage />} />
      <Route path="/config" element={<ConfigPage />} />
      <Route path="/logs" element={<LogsPage />} />
    </Routes>
  </BrowserRouter>
)