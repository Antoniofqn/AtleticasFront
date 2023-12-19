import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import ClubAthletes from './ClubAthletes'
import ClubHonors from './ClubHonors';
import ClubContent from './ClubContent';

const ClubShow = () => {
  const { clubHashid } = useParams();
  const [clubData, setClubData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleContentUpdated = (newContent) => {
    setClubData(prevClubData => ({
      ...prevClubData,
      club_content: {
        ...prevClubData.club_content,
        data: {
          ...prevClubData.club_content.data,
          attributes: {
            ...prevClubData.club_content.data.attributes,
            content: newContent
          }
        }
      }
    }));
  };
  const handleAthleteUpdated = (athleteId, updatedAthlete) => {
    setClubData(prevClubData => {
      const updatedAthletes = prevClubData.club_athletes.data.map(athlete => {
        if (athlete.id === athleteId) {
          return { ...athlete, attributes: updatedAthlete };
        }
        return athlete;
      });

      return {
        ...prevClubData,
        club_athletes: {
          ...prevClubData.club_athletes,
          data: updatedAthletes
        }
      };
    });
  };

  const handleAthleteCreated = (newAthleteData) => {
    setClubData(prevClubData => {
      // Use newAthleteData.data to get the athlete's details
      const newAthlete = {
        id: newAthleteData.data.id,
        type: newAthleteData.data.type,
        attributes: newAthleteData.data.attributes
      };

      const updatedAthletes = [...prevClubData.club_athletes.data, newAthlete];

      return {
        ...prevClubData,
        club_athletes: {
          ...prevClubData.club_athletes,
          data: updatedAthletes
        }
      };
    });
  };

  const handleDeleteClick = async (athleteId) => {
    if (window.confirm("Tem certeza que gostaria de deletar esse Atleta?")) {
      try {
        await axiosInstance.delete(`/api/v1/clubs/${clubHashid}/club_athletes/${athleteId}`);
        setClubData(prevClubData => {
          const updatedAthletes = prevClubData.club_athletes.data.filter(athlete => athlete.id !== athleteId);
          return {
            ...prevClubData,
            club_athletes: {
              ...prevClubData.club_athletes,
              data: updatedAthletes
            }
          };
        });
      } catch (error) {
        alert("Erro ao deletar Atleta");
        console.error('Error deleting athlete:', error);
      }
    }
  };

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
        <ClubContent
          content={clubData?.club_content?.data}
          clubId={clubHashid}
          onContentUpdated={handleContentUpdated}
        />
          <ClubAthletes
            athletes={clubData?.club_athletes?.data}
            clubId={clubHashid}
            onAthleteUpdated={handleAthleteUpdated}
            onAthleteCreated={handleAthleteCreated}
            onAthleteDeleted={handleDeleteClick}
          />
          <ClubHonors honors={clubData?.club_honors?.data} />
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
