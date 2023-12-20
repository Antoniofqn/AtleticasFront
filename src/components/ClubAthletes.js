import React, { useState } from 'react';
import { FaPencilAlt, FaPlus, FaTimes } from 'react-icons/fa';
import AthleteEditModal from './AthleteEditModal';
import CreateAthleteModal from './CreateAthleteModal';

const ClubAthletes = ({ athletes, clubId, onAthleteUpdated, onAthleteCreated, onAthleteDeleted }) => {
  const [editingAthlete, setEditingAthlete] = useState(null);
  const [creatingAthlete, setCreatingAthlete] = useState(false);

  const handleEditClick = (athlete) => {
    setEditingAthlete(athlete);
  };

  const handleModalClose = () => {
    setEditingAthlete(null);
  };

  const openCreateModal = () => {
    setCreatingAthlete(true);
  };

  const closeCreateModal = () => {
    setCreatingAthlete(false);
  };

  if (!athletes || athletes.length === 0) {
    return <p className="text-center">Lista vazia</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-orange-600">Atletas</h2>
        <FaPlus className="cursor-pointer text-green-600 hover:text-green-800" onClick={openCreateModal} />
      </div>
      <ul className="space-y-4 p-1">
        {athletes.map(athlete => (
          <li key={athlete.id} className="border border-gray-200 rounded-lg p-4 grid grid-cols-2 gap-4 items-center relative">
            <div className="flex items-center space-x-2 col-span-1">
              <span className="font-bold text-gray-700">{athlete.attributes.name}</span>
              <FaPencilAlt onClick={() => handleEditClick(athlete)} className="cursor-pointer text-gray-500 hover:text-gray-700" />
            </div>
            <div className="text-gray-600 col-span-1">
              <p className="break-words">{athlete.attributes.achievements}</p>
              <p>{athlete.attributes.joined_at.split('-')[0]}{athlete.attributes.left_at && ` - ${athlete.attributes.left_at.split('-')[0]}`}</p>
            </div>
            <FaTimes
              onClick={() => onAthleteDeleted(athlete.id)}
              className="absolute top-1 right-1 cursor-pointer text-red-500 hover:text-red-700 text-sm"
            />
          </li>
        ))}
      </ul>
      {editingAthlete && (
        <AthleteEditModal
          athlete={editingAthlete}
          clubId={clubId}
          onClose={handleModalClose}
          onAthleteUpdated={onAthleteUpdated}
        />
      )}
      {creatingAthlete && (
        <CreateAthleteModal
          clubId={clubId}
          onClose={closeCreateModal}
          onAthleteCreated={onAthleteCreated}
        />
      )}
    </div>
  );
};

export default ClubAthletes;
