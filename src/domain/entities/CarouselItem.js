/**
 * ítem de un carrusel
 */
const createCarouselItem = ({ title, imageUrl, videoUrl, description }) => ({
  title: title || '',
  imageUrl: imageUrl || '',
  videoUrl: videoUrl || '',
  description: description || '',
});

export default createCarouselItem;
