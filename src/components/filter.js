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
    <div className="filter-container">
      <h1 className="filter-title">Filtre por Universidade</h1>
      <label>Universidade:</label>
      <input
        type="text"
        name="university"
        value={search.university}
        onChange={handleInputChange}
      />

      <label>Estado:</label>
      <select
        name="state"
        value={search.state}
        onChange={handleInputChange}
      >
        <option value="">Estado</option>
        {BRAZILIAN_STATES.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <label>Região:</label>
      <select
        name="state"
        value={search.state}
        onChange={handleInputChange}
      >
        <option value="">Região</option>
        {BRAZILIAN_REGIONS.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <label>Tipo:</label>
      <select name="category" value={search.category} onChange={handleInputChange}>
        <option value="">Tipo</option>
        <option value="0">Pública</option>
        <option value="1">Privada</option>
      </select>
    </div>
  );
};

export default Filter;
