import createAuthRepositoryImpl from '../data/repositories/AuthRepositoryImpl';
import createCarouselRepositoryImpl from '../data/repositories/CarouselRepositoryImpl';
import createLoginUseCase from '../domain/useCases/LoginUseCase';
import createGetCarouselsUseCase from '../domain/useCases/GetCarouselsUseCase';

/**
 * Contenedor de dependencias
 */
const authRepository = createAuthRepositoryImpl();
const carouselRepository = createCarouselRepositoryImpl();

export const loginUseCase = createLoginUseCase(authRepository);
export const getCarouselsUseCase = createGetCarouselsUseCase(carouselRepository, authRepository);
export { authRepository };
