/**
 * token de autenticación (datos retornados por el servicio de login)
 */
const createAuthToken = ({ sub, token, type }) => ({
  sub: sub ?? '',
  token,
  type: type || 'Bearer',
});

export default createAuthToken;
