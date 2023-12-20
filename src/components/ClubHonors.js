import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import CreateHonorsModal from './CreateHonorModal';
import axiosInstance from '../axiosInstance';

const ClubHonors = ({ honors, clubId, onHonorCreated, onHonorDeleted }) => {
  const [creatingHonor, setCreatingHonor] = useState(false);

  const openCreateModal = () => setCreatingHonor(true);
  const closeCreateModal = () => setCreatingHonor(false);

  const handleDeleteHonor = async (honorId) => {
    if (window.confirm("Tem certeza de que deseja deletar esse título?")) {
      try {
        await axiosInstance.delete(`/api/v1/clubs/${clubId}/club_honors/${honorId}`);
        onHonorDeleted(honorId);
      } catch (error) {
        console.error('Error deleting honor:', error);
      }
    }
  };

  return (
    <section className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-orange-600">Títulos</h2>
        <FaPlus className="cursor-pointer text-green-600 hover:text-green-800" onClick={openCreateModal} />
      </div>
      <ul className="list-disc pl-5">
        {honors.map(honor => (
          <li key={honor.id} className="mb-2 text-gray-700 flex justify-between items-center">
            <span>
              <span className="font-bold">{honor.attributes.title}</span> ({honor.attributes.year}): {honor.attributes.description}
            </span>
            <FaTimes
              className="cursor-pointer text-red-500 hover:text-red-700 text-xs"
              onClick={() => handleDeleteHonor(honor.id)}
            />
          </li>
        ))}
      </ul>
      {creatingHonor && (
        <CreateHonorsModal
          clubId={clubId}
          onClose={closeCreateModal}
          onHonorCreated={onHonorCreated}
        />
      )}
    </section>
  );
};

export default ClubHonors;
