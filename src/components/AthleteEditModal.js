import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const AthleteEditModal = ({ athlete, clubId, onClose, onAthleteUpdated }) => {
  const initialJoinedYear = athlete.attributes.joined_at ? (new Date(athlete.attributes.joined_at).getFullYear()).toString() : '';
  const initialLeftYear = athlete.attributes.left_at ? (new Date(athlete.attributes.left_at).getFullYear()).toString() : '';

  const [editedAthlete, setEditedAthlete] = useState({
    ...athlete.attributes,
    joined_at: initialJoinedYear,
    left_at: initialLeftYear,
  });

  const handleChange = (e) => {
    setEditedAthlete({ ...editedAthlete, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editedAthlete,
        joined_at: editedAthlete.joined_at ? `${editedAthlete.joined_at}-02-02` : null, // 02-02 is a dummy date, we only care about the year
        left_at: editedAthlete.left_at ? `${editedAthlete.left_at}-02-02` : null,
      };

      await axiosInstance.put(`/api/v1/clubs/${clubId}/club_athletes/${athlete.id}`, payload);
      onAthleteUpdated(athlete.id, payload);
      onClose();
    } catch (error) {
      alert("Erro ao editar Atleta");
      console.error('Error updating athlete:', error);
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
            <h3 className="pt-4 text-xl font-bold text-green-500">Editar Informações de Atleta</h3>
            <div>
              <label className="block mb-2 text-sm font-bold text-orange-500">Nome:</label>
              <input type="text" name="name" value={editedAthlete.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-orange-500">Conquistas:</label>
              <textarea name="achievements" value={editedAthlete.achievements} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-orange-500">Entrou em:</label>
              <select name="joined_at" value={editedAthlete.joined_at} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="">Selecione um ano</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-orange-500">Saiu em:</label>
              <select name="left_at" value={editedAthlete.left_at} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="">Selecione um ano</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full text-white bg-orange-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AthleteEditModal;
