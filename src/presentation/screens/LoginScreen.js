import React, { useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setAuth } from '../../store/slices/authSlice';
import styles from '../styles/LoginScreen.styles';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const { loginUseCase } = require('../../di/container');
      const auth = await loginUseCase.execute();
      if (auth && auth.token) {
        setLoading(false);
        dispatch(setAuth(auth));
        return;
      }
      setError('No se recibió token de sesión');
    } catch (e) {
      setError(e.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <Text style={styles.title}>Toolbox Mobile</Text>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="small" color="#94a3b8" style={styles.loading} />}
      {error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
};

export default LoginScreen;
