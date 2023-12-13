import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import ClubAthletes from './ClubAthletes'

const ClubShow = () => {
  const { clubHashid } = useParams();
  const [clubData, setClubData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/clubs/${clubHashid}`);
        setClubData(response.data.data.attributes);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching club data:', err);
        setError("An error occurred while fetching club data");
        setIsLoading(false);
      }
    };

    fetchClubData();
  }, [clubHashid]);

  if (isLoading) {
    return <div className="text-center py-5">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-5">Erro: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">{clubData.name}</h1>
      <hr className="mb-6" />

      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-3/4 pr-4">
          <section className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Conteúdo</h2>
            <p className="text-gray-700">{clubData.club_content.data.attributes.content || 'No content available.'}</p>
            <hr className="my-4" />
          </section>

          <ClubAthletes athletes={clubData?.club_athletes?.data} />

          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Títulos</h2>
            <ul className="list-disc pl-5">
              {clubData.club_honors.data.map(honor => (
                <li key={honor.id} className="mb-2 text-gray-700">
                  <span className="font-bold">{honor.attributes.title}</span> ({honor.attributes.year}): {honor.attributes.description}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="w-full md:w-1/4 pt-4 md:pt-0">
          <div className="bg-white shadow rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">{clubData.name}</h2>
            <p><strong>Fundado em:</strong> {clubData.year_of_foundation || ''}</p>
            <p><strong>Resumo:</strong> {clubData.description || ''}</p>
            <p><strong>Universidade:</strong> {clubData.university.name}</p>
          </div>
        </aside>
      </div>
    </div>
  );

};

export default ClubShow;
