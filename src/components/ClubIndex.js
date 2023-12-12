import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust the import path
import ClubCard from './ClubCard';

const ClubIndex = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 24;

  // Function to fetch clubs based on search query
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        ...(searchQuery ? { query: searchQuery } : {}),
        page: currentPage,
        per_page: perPage,
      };

      const response = await axiosInstance.get('/api/v1/clubs', { params });
      setClubs(response.data.data);
      setTotalPages(response.data.meta.total_pages);
    } catch (err) {
      setError('Failed to fetch clubs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentPage, perPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mt-4 mx-auto px-4">
      <div className="filter-container p-4 bg-white shadow rounded-lg border-solid border-2 border-orange-200 mb-4">
        <h1 className="text-orange-700 text-2xl font-bold text-center mb-4">Atléticas</h1>
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center">Nome:</label>
            <input
              type="text"
              name="club"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>


      {loading && <p className="text-center text-blue-600">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        {!loading && !error && clubs.map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>

      <div className="pagination-controls flex justify-center space-x-2 my-10">
        {[...Array(totalPages)].map((_, index) => (
          <button
            className={`px-4 py-2 rounded ${index + 1 === currentPage ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClubIndex;
