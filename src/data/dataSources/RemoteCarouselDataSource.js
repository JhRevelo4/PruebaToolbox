import { API_BASE_URL, DATA_ENDPOINT } from './ApiConstants';

/**
 * Carruseles
 */
const createRemoteCarouselDataSource = () => ({
  getCarousels: async (authToken) => {
    const authHeader = `${authToken.type} ${authToken.token}`;
    const response = await fetch(`${API_BASE_URL}${DATA_ENDPOINT}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token expirado o inválido.');
      }
      const error = await response.text();
      throw new Error(error || `Data failed: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  },
});

export default createRemoteCarouselDataSource;
