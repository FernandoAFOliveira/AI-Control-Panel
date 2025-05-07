// src/App.tsx
function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <p>If you see a red box, Tailwind is working.</p>
      <div className="bg-red-500 w-32 h-32 mt-4 border-4 border-white"></div> {/* Red box */}
    </div>
  );
}

export default App;
