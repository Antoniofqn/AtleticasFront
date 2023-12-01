import React, { useState } from 'react';

const UniversityCard = ({ university }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="university-card" onClick={toggleExpand}>
      {university.attributes.logo_url && (
        <img src={university.attributes.logo_url} alt={`${university.attributes.name} logo`} />
      )}
      <h3>{university.attributes.abbreviation}</h3>
      <p>{university.attributes.name}</p>
      {isExpanded && (
        <ul>
          {university.attributes.clubs.map((club, index) => (
            <li key={index}>{club.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UniversityCard;
