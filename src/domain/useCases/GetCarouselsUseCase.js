/**
 * Caso de uso: obtener carruseles con token válido
 */
const createGetCarouselsUseCase = (carouselRepository, authRepository) => ({
  execute: async () => {
    const auth = authRepository.getStoredAuth();
    if (!auth) {
      throw new Error('No hay sesión. Debe iniciar sesión.');
    }
    if (authRepository.isTokenExpired && authRepository.isTokenExpired()) {
      authRepository.clearAuth();
      throw new Error('Sesión expirada. Inicie sesión de nuevo.');
    }
    const carousels = await carouselRepository.getCarousels(auth);
    return carousels;
  },
});

export default createGetCarouselsUseCase;
