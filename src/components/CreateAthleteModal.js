import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const CreateAthleteModal = ({ clubId, onClose, onAthleteCreated }) => {
  const [newAthlete, setNewAthlete] = useState({
    name: '',
    achievements: '',
    joined_at: '',
    left_at: '',
  });

  const handleChange = (e) => {
    setNewAthlete({ ...newAthlete, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...newAthlete,
      joined_at: newAthlete.joined_at ? `${newAthlete.joined_at}-02-02` : null,
      left_at: newAthlete.left_at ? `${newAthlete.left_at}-02-02` : null,
    };
    try {
      const response = await axiosInstance.post(`/api/v1/clubs/${clubId}/club_athletes`, payload);
      onAthleteCreated(response.data);
      onClose();
    } catch (error) {
      alert("Erro ao criar novo Atleta");
      console.error('Error creating athlete:', error);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 1899), (val, index) => currentYear - index).map(String);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-gray-100 rounded-lg shadow">
          <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 112.414 1.414L12.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <form onSubmit={handleSubmit} className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
            <h3 className="pt-4 text-xl font-bold text-green-500">Criar Novo Atleta</h3>
            <div>
              <label className="block mb-2 text-sm font-bold text-orange-500">Nome:</label>
              <input type="text" name="name" value={newAthlete.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-orange-500">Conquistas:</label>
              <textarea name="achievements" value={newAthlete.achievements} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-orange-500">Entrou em:</label>
              <select name="joined_at" value={newAthlete.joined_at} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="">Selecione Ano</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-orange-500">Saiu em:</label>
              <select name="left_at" value={newAthlete.left_at} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="">Selecione Ano</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full text-white bg-orange-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Criar Atleta</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAthleteModal;
