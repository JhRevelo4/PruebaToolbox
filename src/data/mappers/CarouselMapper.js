import createCarousel from '../../domain/entities/Carousel';
import createCarouselItem from '../../domain/entities/CarouselItem';

/**
 * Mapea la respuesta del API al dominio
 */
const mapItemFromApi = (raw) =>
  createCarouselItem({
    title: raw.title,
    imageUrl: raw.imageUrl,
    videoUrl: raw.videoUrl,
    description: raw.description,
  });

const mapCarouselFromApi = (raw) =>
  createCarousel({
    title: raw.title,
    type: raw.type || 'thumb',
    items: (raw.items || []).map(mapItemFromApi),
  });

export const mapCarouselsFromApi = (rawList) =>
  Array.isArray(rawList) ? rawList.map(mapCarouselFromApi) : [];

export default mapCarouselsFromApi;
