export default function App() {
  return (
    <div style={{
      backgroundColor: 'black',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p>If you see this, React is rendering.</p>
      <div style={{
        backgroundColor: 'red',
        width: '128px',
        height: '128px',
        marginTop: '1rem',
        border: '4px solid white',
      }}></div>
    </div>
  );
}
