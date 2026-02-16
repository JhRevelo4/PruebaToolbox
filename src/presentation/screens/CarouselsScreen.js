import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authRepository, getCarouselsUseCase } from '../../di/container';
import CarouselSection from '../components/CarouselSection';
import VideoModal from '../components/VideoModal';
import styles from '../styles/CarouselsScreen.styles';

const CarouselsScreen = ({ onLogout }) => {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoModal, setVideoModal] = useState({
    visible: false,
    videoUrl: null,
    title: '',
    description: '',
  });

  const loadCarousels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCarouselsUseCase.execute();
      setCarousels(data);
    } catch (e) {
      setError(e.message || 'Error al cargar los carruseles');
      if (e.message && e.message.includes('sesión')) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    loadCarousels();
  }, [loadCarousels]);

  const handleItemPress = (item) => {
    setVideoModal({
      visible: true,
      videoUrl: item.videoUrl || null,
      title: item.title || '',
      description: item.description || '',
    });
  };

  const closeVideo = () => {
    setVideoModal((prev) => ({ ...prev, visible: false }));
  };

  const handleLogout = () => {
    authRepository.clearAuth();
    onLogout();
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loading]} edges={['top', 'left', 'right', 'bottom']}>
        <ActivityIndicator size="large" color="#3b82f6" />        
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <TouchableOpacity style={styles.logoutTouch} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <TouchableOpacity style={styles.logoutTouch} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {carousels.map((carousel) => (
          <CarouselSection
            key={carousel.title + carousel.type}
            carousel={carousel}
            onItemPress={handleItemPress}
          />
        ))}
      </ScrollView>
      <VideoModal
        visible={videoModal.visible}
        videoUrl={videoModal.videoUrl}
        title={videoModal.title}
        description={videoModal.description}
        onClose={closeVideo}
      />
    </SafeAreaView>
  );
};

export default CarouselsScreen;
