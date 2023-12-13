import React from 'react';

const ClubAthletes = ({ athletes }) => {
  if (!athletes || athletes.length === 0) {
    return <p>Lista vazia</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">Atletas</h2>
      <ul className="list-disc pl-5">
        {athletes.map(athlete => (
          <li key={athlete.id} className="mb-2 text-gray-700">
            <span className="font-bold">{athlete.attributes.name}</span>
            <br />
            <span>{athlete.attributes.achievements}</span>
            <br />
            <span>{athlete.attributes.joined_at.split('-')[0]}</span>
            {athlete.attributes.left_at && <span> - {athlete.attributes.left_at.split('-')[0]}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubAthletes;
