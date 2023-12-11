import React, { useState } from 'react';

const UniversityCard = ({ university }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { name, abbreviation, clubs } = university.attributes;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg border-orange-100 border-solid border-2 bg-white hover:bg-orange-100 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
      onClick={toggleExpand}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-green-600 mb-2">{abbreviation}</div>
        <p className="text-gray-700 text-base">{name}</p>
      </div>
      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50">
          <ul className="list-disc list-inside">
            {clubs.map((club, index) => (
              <li key={index} className="text-gray-700 text-base">{club.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UniversityCard;
