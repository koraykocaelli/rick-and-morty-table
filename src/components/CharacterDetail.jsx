function CharacterDetail({ character }) {
  return (
    <div className="mt-6 p-4 rounded bg-gray-800 text-white w-full max-w-2xl mx-auto shadow-md">
      <div className="flex items-center gap-6">
        <img src={character.image} alt={character.name} className="w-32 h-32 rounded-full border-4 border-gray-600" />
        <div>
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;