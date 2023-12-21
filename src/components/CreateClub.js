import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const CreateClub = () => {
  const [clubData, setClubData] = useState({
    name: '',
    description: '',
    year_of_foundation: '',
    university_id: '',
    university_search: ''
  });
  const [universities, setUniversities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUniversitySearchChange = async (e) => {
    const searchValue = e.target.value;
    setClubData({ ...clubData, university_search: searchValue });

    if (searchValue.length > 1) {
      try {
        const response = await axiosInstance.get(`/api/v1/universities?query=${encodeURIComponent(searchValue)}`);
        setUniversities(response.data.data);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    } else {
      setUniversities([]);
      setShowDropdown(false);
    }
  };

  const handleUniversitySelect = (university) => {
    setClubData({ ...clubData, university_id: university.id, university_search: university.attributes.name });
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    setClubData({ ...clubData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(clubData);
      const response = await axiosInstance.post('/api/v1/clubs', {
        club: {
          name: clubData.name,
          description: clubData.description,
          year_of_foundation: clubData.year_of_foundation,
          university_hashid: clubData.university_id
        }
      });
      navigate(`/clubs/${response.data.data.id}`); // Redirect to clubs index
    } catch (error) {
      console.error('Error creating club:', error);
      // Handle error, such as displaying an error message
    }
  };


  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-green-700 mb-4">Criar Atlética</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-orange-700">Nome:</label>
            <input type="text" name="name" value={clubData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-orange-700">Descrição:</label>
            <textarea name="description" value={clubData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-orange-700">Ano de Fundação:</label>
            <input type="number" name="year_of_foundation" value={clubData.year_of_foundation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-bold text-orange-700">Universidade:</label>
            <input type="text" name="university_search" value={clubData.university_search} onChange={handleUniversitySearchChange} className="w-full p-2 border border-gray-300 rounded" />
            {showDropdown && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1">
                {universities.map((university) => (
                  <div key={university.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleUniversitySelect(university)}>
                    {university.attributes.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="w-full bg-orange-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Criar</button>
        </form>
      </div>
    </div>
  );
};

export default CreateClub;
