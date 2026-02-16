/**
 * carrusel (lista de ítems con tipo thumb o poster)
 */
const createCarousel = ({ title, type, items }) => ({
  title: title || '',
  type: type || 'thumb',
  items: Array.isArray(items) ? items : [],
});

export default createCarousel;
