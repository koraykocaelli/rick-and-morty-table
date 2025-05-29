import { useEffect, useState } from 'react';
import { getCharacters } from '../services/api';
import CharacterDetail from './CharacterDetail';

function CharacterTable() {
  const [characters, setCharacters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: ''
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let allCharacters = [];
        for (let i = 1; i <= 13; i++) {
          const data = await getCharacters(i);
          allCharacters = [...allCharacters, ...data.results];
          if (allCharacters.length >= 250) break;
        }
        setCharacters(allCharacters.slice(0, 250));
      } catch {
        setError('Failed to fetch characters.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const filteredData = characters.filter((char) => {
      return (
        char.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.status === '' || char.status === filters.status) &&
        (filters.species === '' || char.species === filters.species) &&
        (filters.gender === '' || char.gender === filters.gender)
      );
    });
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [filters, characters]);

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentCharacters = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / pageSize);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full mt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by name"
          className="bg-gray-700 text-white px-2 py-1 rounded"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <select
          className="bg-gray-700 text-white px-2 py-1 rounded"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <input
          type="text"
          placeholder="Filter by species"
          className="bg-gray-700 text-white px-2 py-1 rounded"
          value={filters.species}
          onChange={(e) => setFilters({ ...filters, species: e.target.value })}
        />
        <select
          className="bg-gray-700 text-white px-2 py-1 rounded"
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="pageSize" className="text-white">Results per page:</label>
        <select
          id="pageSize"
          className="bg-gray-700 text-white px-2 py-1 rounded"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {currentCharacters.length === 0 ? (
        <p className="text-yellow-300">No characters found for selected filters.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Species</th>
                  <th className="border px-4 py-2">Gender</th>
                </tr>
              </thead>
              <tbody>
                {currentCharacters.map((char) => (
                  <tr
                    key={char.id}
                    className="hover:bg-gray-700 cursor-pointer"
                    onClick={() =>
                      setSelectedCharacter(
                        selectedCharacter && selectedCharacter.id === char.id ? null : char
                      )
                    }
                  >
                    <td className="border px-4 py-2">{char.name}</td>
                    <td className="border px-4 py-2">{char.status}</td>
                    <td className="border px-4 py-2">{char.species}</td>
                    <td className="border px-4 py-2">{char.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-blue-500' : 'bg-gray-700'
                } text-white`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
    </div>
  );
}

export default CharacterTable;
