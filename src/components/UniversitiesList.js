import React, { useState, useEffect, useCallback } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 20; // Number of records per page

  // Define fetchData using useCallback
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Construct the query parameter
      const queryParam = [filter.university, filter.state, filter.region].filter(Boolean).join(' ');
      const params = {
        ...(queryParam ? { query: queryParam } : {}),
        page: currentPage,
        per_page: perPage,
      };

      if (filter.category) {
        params.category = filter.category;
      }

      const response = await axiosInstance.get('/api/v1/universities', { params });
      console.log(response);
      setUniversities(response.data.data);
      setTotalPages(response.data.meta.total_pages); // Update total pages from response
    } catch (err) {
      setError('Failed to fetch universities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter, currentPage, perPage]); // Include dependencies here

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Now fetchData is a dependency

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto px-4">
      <Filter onFilterChange={handleFilterChange} />
      {loading && <p className="text-center text-blue-600">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {!loading && !error && universities.map(university => (
          <UniversityCard key={university.id} university={university} />
        ))}
      </div>
      <div className="pagination-controls flex justify-center space-x-2 my-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            className={`px-4 py-2 rounded ${index + 1 === currentPage ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UniversitiesList;
