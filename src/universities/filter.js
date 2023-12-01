import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const Filter = () => {
  const [search, setSearch] = useState({
    university: '',
    state: '',
    region: '',
    category: '',
  });
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get('/api/v1/universities', {
      params: {
        university: search.university,
        state: search.state,
        region: search.region,
        category: search.category
        }
      });
      console.log('API Response:', response.data);

      // Use Array.isArray(data) ? data : [] para garantir que filter seja sempre uma matriz
      setFilter(Array.isArray(response.data) ? response.data : []);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setSearch({ ...search, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);  // Dependência atualizada para 'search'

  return (
    <div className="filter-container">
      <h1 className="filter-title">Write an attribute and find the college athletic</h1>
      <label>University:</label>
      <input
        type="text"
        name="university"
        value={search.university}
        onChange={handleInputChange}
      />

      <label>State:</label>
      <input
        type="text"
        name="state"
        value={search.state}
        onChange={handleInputChange}
      />

      <label>Region:</label>
      <input
        type="text"
        name="region"
        value={search.region}
        onChange={handleInputChange}
      />

      <label>Category:</label>
      <input
        type="text"
        name="category"
        value={search.category}
        onChange={handleInputChange}
      />

      {/* Add a button to trigger the data fetching based on filters */}
      <button onClick={fetchData} disabled={loading}>
        Apply Filters
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the filtered data */}
      <ul>
        {filter.map((item) => (
          <li key={item.id}>{/* Display filtered data items */}</li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
