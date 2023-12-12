import React from 'react';
import { Link } from 'react-router-dom';

const ClubCard = ({ club }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border-orange-100 border-solid border-2 bg-white hover:bg-orange-100 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-green-600 mb-2">
          <Link to={`/clubs/${club.id}`} className="text-green-600 text-base">
            {`${club.attributes.name}`}
          </Link>
          <br></br>
          <span className="font-light text-sm text-gray-500">{`${club.attributes.university.name} - ${club.attributes.university.abbreviation}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
