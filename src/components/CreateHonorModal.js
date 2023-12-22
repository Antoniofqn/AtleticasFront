import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const CreateHonorModal = ({ clubId, onClose, onHonorCreated }) => {
  const [newHonor, setNewHonor] = useState({
    title: '',
    year: new Date().getFullYear(),
    description: '',
  });

  const handleChange = (e) => {
    setNewHonor({ ...newHonor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/api/v1/clubs/${clubId}/club_honors`, newHonor);
      onHonorCreated(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating honor:', error);
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
            <h3 className="pt-4 text-xl font-bold text-green-700">Adicionar Novo Título</h3>
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-bold text-gray-700">Nome:</label>
              <input type="text" name="title" value={newHonor.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label htmlFor="year" className="block mb-2 text-sm font-bold text-gray-700">Ano:</label>
              <input type="number" name="year" value={newHonor.year} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">Descrição:</label>
              <textarea name="description" value={newHonor.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateHonorModal;
