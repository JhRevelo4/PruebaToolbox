import { API_BASE_URL, AUTH_ENDPOINT, LOGIN_SUB } from './ApiConstants';

/**
 * login
 */
const createRemoteAuthDataSource = () => ({
  login: async (sub = LOGIN_SUB) => {
    const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINT}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sub }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `Login failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      token: data.token,
      type: data.type || 'Bearer',
    };
  },
});

export default createRemoteAuthDataSource;
