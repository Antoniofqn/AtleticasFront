import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <p className="text-orange-700 text-base">{name}</p>
      </div>
      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 border-t-2 border-orange-500">
          <ul className="list-disc list-inside">
            {clubs.map((club, index) => (
              <li key={index} className="text-green-700 text-base mb-1"> {/* Add li tag */}
                <Link to={`/clubs/${club.club_hashid}`}>{club.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UniversityCard;
