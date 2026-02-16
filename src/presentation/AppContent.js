/**
 * Contenedor que maneja qué pantalla mostrar.
 * Usa Redux (selectIsLoggedIn) para decidir la pantalla.
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, setAuth, clearAuth } from '../store/slices/authSlice';
import { authRepository } from '../di/container';
import LoginScreen from './screens/LoginScreen';
import CarouselsScreen from './screens/CarouselsScreen';

export default function AppContent() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const stored = authRepository.getStoredAuth();
    if (stored && stored.token) {
      dispatch(setAuth(stored));
    }
  }, [dispatch]);

  const handleLogout = () => {
    authRepository.clearAuth();
    dispatch(clearAuth());
  };

  if (isLoggedIn) {
    return <CarouselsScreen onLogout={handleLogout} />;
  }

  return <LoginScreen />;
}
