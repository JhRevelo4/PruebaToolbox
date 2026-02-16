import React from 'react';
import { View, Text } from 'react-native';
import CarouselThumb from './CarouselThumb';
import CarouselPoster from './CarouselPoster';
import styles from '../styles/CarouselsScreen.styles';

const CAROUSEL_TYPE_POSTER = 'poster';

const CarouselSection = ({ carousel, onItemPress }) => {
  const isPoster = carousel.type === CAROUSEL_TYPE_POSTER;
  const CarouselComponent = isPoster ? CarouselPoster : CarouselThumb;
  // Si type no es 'poster' ni 'thumb', se usa CarouselThumb por defecto.

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{carousel.title}</Text>
      <CarouselComponent items={carousel.items} onItemPress={onItemPress} />
    </View>
  );
};

export default CarouselSection;
