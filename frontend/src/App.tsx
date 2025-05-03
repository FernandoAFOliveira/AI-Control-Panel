function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="text-center px-6 py-10 rounded-2xl shadow-xl bg-white max-w-lg w-full border border-gray-200">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          🧠 AI Assistant Control Panel
        </h1>
        <p className="text-gray-700 text-lg">
          Your frontend is configured and running with <span className="font-semibold">React</span>, <span className="font-semibold">Vite</span>, and <span className="font-semibold">TailwindCSS</span>.
        </p>
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
