import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const EditClubModal = ({ clubData, clubId, onClose, onClubUpdated }) => {
  const [editedClub, setEditedClub] = useState({
    name: clubData.name,
    description: clubData.description || '',
    year_of_foundation: clubData.year_of_foundation || '',
  });

  const handleChange = (e) => {
    setEditedClub({ ...editedClub, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(clubData)
      const response = await axiosInstance.put(`/api/v1/clubs/${clubId}`, editedClub);
      onClubUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating club:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-gray-100 rounded-lg shadow">
          <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <span>&times;</span>
          </button>
          <form onSubmit={handleSubmit} className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
            <h3 className="pt-5 text-xl font-bold text-green-700">Editar Atlética</h3>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700">Nome:</label>
              <input type="text" name="name" value={editedClub.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label htmlFor="year_of_foundation" className="block mb-2 text-sm font-bold text-gray-700">Ano de Fundação:</label>
              <input type="number" name="year_of_foundation" value={editedClub.year_of_foundation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">Descrição:</label>
              <textarea name="description" value={editedClub.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"></textarea>
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-green-600">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClubModal;
