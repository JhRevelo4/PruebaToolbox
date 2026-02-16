import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles/CarouselThumb.styles';
import PlaceholderImage from '../assets/images/placeholder.svg';

const Item = ({ item, onPress }) => {
  const [imageError, setImageError] = React.useState(false);
  const usePlaceholder = !item.imageUrl || imageError;

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)} activeOpacity={0.9}>
      {usePlaceholder ? (
        <PlaceholderImage width={200} height={140} style={styles.image} />
      ) : (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      )}
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const CarouselThumb = ({ title, items, onItemPress }) => {
  const keyExtractor = (i) => i.title + (i.imageUrl || '');
  const renderItem = ({ item }) => <Item item={item} onPress={onItemPress} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default CarouselThumb;
