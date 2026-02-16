/**
 * Caso de uso: realizar login y obtener token
 */
const createLoginUseCase = (authRepository) => ({
  execute: async (sub = 'ToolboxMobileTest') => {
    const auth = await authRepository.login(sub);
    return auth;
  },
});

export default createLoginUseCase;
