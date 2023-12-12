import React, { useState } from 'react';
import { BRAZILIAN_STATES, BRAZILIAN_REGIONS } from '../constants';

const Filter = ({ onFilterChange }) => {
  const [search, setSearch] = useState({
    university: '',
    state: '',
    region: '',
    category: '',
  });

  const handleInputChange = (event) => {
    const newSearch = { ...search, [event.target.name]: event.target.value };
    setSearch(newSearch);
    onFilterChange(newSearch); // Notify the parent component of the filter change
  };

  return (
    <div className="filter-container p-4 bg-white shadow rounded-lg border-solid border-2 border-orange-200">
      <h1 className="text-orange-700 text-2xl font-bold mb-2">Filtre por Universidade</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Universidade:</label>
          <input
            type="text"
            name="university"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={search.university}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Estado:</label>
          <select
            name="state"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={search.state}
            onChange={handleInputChange}
          >
            <option value="">Estado</option>
            {BRAZILIAN_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Região:</label>
          <select
            name="region"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={search.region}
            onChange={handleInputChange}
          >
            <option value="">Região</option>
            {BRAZILIAN_REGIONS.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Tipo:</label>
          <select
            name="category"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={search.category}
            onChange={handleInputChange}
          >
            <option value="">Tipo</option>
            <option value="0">Pública</option>
            <option value="1">Privada</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
