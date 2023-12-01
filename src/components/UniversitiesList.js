import React, { useState, useEffect } from 'react';
import UniversityCard from './UniversityCard';
import Filter from './filter';
import axiosInstance from '../axiosInstance';

const UniversitiesList = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    university: '',
    state: '',
    region: '',
    category: '',
  });

  useEffect(() => {
    fetchData();
  }, [filter]); // Dependency on 'filter' state

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construct the query parameter
      const queryParam = [filter.university, filter.state, filter.region].filter(Boolean).join(' ');
      const params = queryParam ? { query: queryParam } : {};

      if (filter.category) {
        params.category = filter.category;
      }

      const response = await axiosInstance.get('/api/v1/universities', { params });
      setUniversities(response.data.data); // Adjust depending on your API response structure
    } catch (err) {
      setError('Failed to fetch universities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="universities-list">
      <Filter onFilterChange={handleFilterChange} />
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && universities.map(university => (
        <UniversityCard key={university.id} university={university} />
      ))}
    </div>
  );
};

export default UniversitiesList;
