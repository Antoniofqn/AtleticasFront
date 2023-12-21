import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { BRAZILIAN_STATES, BRAZILIAN_REGIONS } from '../constants';
import { useNavigate } from 'react-router-dom';


const CreateUniversity = () => {
  const [universityData, setUniversityData] = useState({
    name: '',
    state: '',
    abbreviation: '',
    category: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setUniversityData({ ...universityData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/v1/universities', universityData);
      navigate(`/?state=${encodeURIComponent(universityData.state)}`); // Redirect with state as query parameter
    } catch (error) {
      console.error('Error creating university:', error);
      alert('Erro ao criar universidade');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-green-700 mb-4">Criar Universidade</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold text-orange-700">Nome:</label>
            <input type="text" name="name" value={universityData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-bold text-gray-700">Estado:</label>
            <select name="state" value={universityData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
              <option value="">Selecione um estado</option>
              {BRAZILIAN_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="abbreviation" className="block text-sm font-bold text-orange-700">Abreviação:</label>
            <input type="text" name="abbreviation" value={universityData.abbreviation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-bold text-orange-700">Categoria:</label>
            <select name="category" value={universityData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
              <option value="">Selecione uma categoria</option>
              <option value="public">Pública</option>
              <option value="private">Privada</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-orange-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Criar</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUniversity;
