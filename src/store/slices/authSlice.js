/**
 * Redux slice: estado de autenticación
 */
const SET_AUTH = 'auth/setAuth';
const CLEAR_AUTH = 'auth/clearAuth';

export const setAuth = (auth) => ({
  type: SET_AUTH,
  payload: auth,
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

const initialState = {
  auth: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return { auth: action.payload };
    case CLEAR_AUTH:
      return { auth: null };
    default:
      return state;
  }
}

export const selectAuth = (state) => state.auth.auth;

export const selectIsLoggedIn = (state) => {
  const auth = state.auth.auth;
  if (!auth || !auth.token) return false;
  try {
    const { isJwtExpired } = require('../../data/utils/jwtUtils');
    return !isJwtExpired(auth.token);
  } catch (e) {
    console.warn('authSlice: isJwtExpired check failed', e?.message ?? e);
    return Boolean(auth.token);
  }
};
