import createAuthToken from '../../domain/entities/AuthToken';
import createRemoteAuthDataSource from '../dataSources/RemoteAuthDataSource';
import createStorageAuthDataSource from '../dataSources/StorageAuthDataSource';
import { isJwtExpired } from '../utils/jwtUtils';

/**
 * Implementación del repositorio de autenticación
 */
const createAuthRepositoryImpl = (deps = {}) => {
  const remote = deps.remoteAuthDataSource || createRemoteAuthDataSource();
  const storage = deps.storageAuthDataSource || createStorageAuthDataSource(deps.storage);
  return {
    login: async (sub) => {
      const raw = await remote.login(sub);
      const auth = createAuthToken({
        sub: raw.sub,
        token: raw.token,
        type: raw.type,
      });
      storage.setAuth(auth);
      return auth;
    },

    getStoredAuth: () => storage.getAuth(),

    isTokenExpired: () => {
      const auth = storage.getAuth();
      if (!auth || !auth.token) return true;
      return isJwtExpired(auth.token);
    },

    clearAuth: () => storage.clearAuth(),
  };
};

export default createAuthRepositoryImpl;
