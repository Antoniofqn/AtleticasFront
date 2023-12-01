import axiosInstance from '../axiosInstance';

const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', { email, password });

    // Assuming the API returns tokens in headers
    const { uid, client, 'access-token': accessToken } = response.headers;

    // Store the tokens in localStorage
    localStorage.setItem('uid', uid);
    localStorage.setItem('client', client);
    localStorage.setItem('access-token', accessToken);

    // Set default headers for future requests
    axiosInstance.defaults.headers.common['uid'] = uid;
    axiosInstance.defaults.headers.common['client'] = client;
    axiosInstance.defaults.headers.common['access-token'] = accessToken;

    return true; // Indicate successful login
  } catch (error) {
    console.error('Login error:', error);
    return false; // Indicate failed login
  }
};

const logout = () => {
  // Remove the tokens from localStorage
  localStorage.removeItem('uid');
  localStorage.removeItem('client');
  localStorage.removeItem('access-token');

  // Reset Axios headers
  delete axiosInstance.defaults.headers.common['uid'];
  delete axiosInstance.defaults.headers.common['client'];
  delete axiosInstance.defaults.headers.common['access-token'];
};

const validateToken = async () => {
  try {
    // Retrieve the headers from local storage
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
    const accessToken = localStorage.getItem('access-token');

    // Check if all required tokens are present
    if (!uid || !client || !accessToken) {
      return false;
    }

    // Send a request to the token validation endpoint
    const response = await axiosInstance.get('/api/auth/validate_token', {
      headers: {
        'uid': uid,
        'client': client,
        'access-token': accessToken
      }
    });

    // The response should indicate whether the tokens are valid
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error validating token:', error);
    return false; // Assume the token is invalid if an error occurs
  }
};

export { login, logout, validateToken };
