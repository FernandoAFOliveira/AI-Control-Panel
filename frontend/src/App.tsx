// frontend/src/App.tsx
import BackgroundPanel from './components/BackgroundPanel';
import ControlPanelLayout from './components/ControlPanelLayout';

export default function App() {
  return (
    <BackgroundPanel>
      <ControlPanelLayout />
    </BackgroundPanel>
  );
}
