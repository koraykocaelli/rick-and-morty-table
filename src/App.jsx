import CharacterTable from './components/CharacterTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center p-4">
      <div className="w-full max-w-screen-xl">
        <h1 className="text-4xl font-bold text-center mb-8">Rick and Morty Characters</h1>
        <CharacterTable />
      </div>
    </div>
  );
}

export default App;
