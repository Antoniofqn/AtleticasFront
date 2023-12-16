import React from 'react';

const ClubHonors = ({ honors }) => {
  if (!honors || honors.length === 0) {
    return <p>Lista vazia.</p>;
  }

  return (
    <section className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">Títulos</h2>
      <ul className="list-disc pl-5">
        {honors.map(honor => (
          <li key={honor.id} className="mb-2 text-gray-700">
            <span className="font-bold">{honor.attributes.title}</span> ({honor.attributes.year}): {honor.attributes.description}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ClubHonors;
