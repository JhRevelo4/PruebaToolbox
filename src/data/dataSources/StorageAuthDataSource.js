const AUTH_STORAGE_KEY = '@toolbox_auth';

/**
 * Datos local, persistencia del token 
 */
const createStorageAuthDataSource = (storage = null) => {
  let inMemoryAuth = null;

  const getStorage = () => {
    if (storage) return storage;
    if (globalThis.global !== undefined && globalThis.global.authStorage) return globalThis.global.authStorage;
    return {
      getItem: () => inMemoryAuth ? JSON.stringify(inMemoryAuth) : null,
      setItem: (_, value) => { inMemoryAuth = JSON.parse(value); },
      removeItem: () => { inMemoryAuth = null; },
    };
  };

  return {
    getAuth: () => {
      const raw = getStorage().getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : inMemoryAuth;
    },
    setAuth: (auth) => {
      inMemoryAuth = auth;
      try {
        getStorage().setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
      } catch (e) {
        console.warn('StorageAuthDataSource: setItem failed', e?.message ?? e);
      }
    },
    clearAuth: () => {
      inMemoryAuth = null;
      try {
        getStorage().removeItem(AUTH_STORAGE_KEY);
      } catch (e) {
        console.warn('StorageAuthDataSource: removeItem failed', e?.message ?? e);
      }
    },
  };
};

export default createStorageAuthDataSource;
