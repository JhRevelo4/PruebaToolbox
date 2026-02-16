import createRemoteCarouselDataSource from '../dataSources/RemoteCarouselDataSource';
import { mapCarouselsFromApi } from '../mappers/CarouselMapper';

/**
 * Implementación del repositorio de carruseles
 */
const createCarouselRepositoryImpl = (deps = {}) => {
  const remote = deps.remoteCarouselDataSource || createRemoteCarouselDataSource();

  return {
    getCarousels: async (authToken) => {
      const raw = await remote.getCarousels(authToken);
      return mapCarouselsFromApi(raw);
    },
  };
};

export default createCarouselRepositoryImpl;
