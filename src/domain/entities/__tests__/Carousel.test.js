/**
 * Test unitario básico: entidad Carousel
 */
import createCarousel from '../Carousel';
import createCarouselItem from '../CarouselItem';

describe('Carousel entity', () => {
  it('crea un carrusel con valores por defecto', () => {
    const carousel = createCarousel({});
    expect(carousel.title).toBe('');
    expect(carousel.type).toBe('thumb');
    expect(carousel.items).toEqual([]);
  });

  it('crea un carrusel con título y tipo', () => {
    const carousel = createCarousel({
      title: 'Carrusel Thumb',
      type: 'thumb',
      items: [],
    });
    expect(carousel.title).toBe('Carrusel Thumb');
    expect(carousel.type).toBe('thumb');
    expect(carousel.items).toEqual([]);
  });

  it('crea un carrusel tipo poster con ítems', () => {
    const items = [
      createCarouselItem({ title: 'Movie 1', imageUrl: 'http://example.com/1.jpg' }),
      createCarouselItem({ title: 'Movie 2', imageUrl: 'http://example.com/2.jpg' }),
    ];
    const carousel = createCarousel({
      title: 'Carrusel Poster',
      type: 'poster',
      items,
    });
    expect(carousel.title).toBe('Carrusel Poster');
    expect(carousel.type).toBe('poster');
    expect(carousel.items).toHaveLength(2);
    expect(carousel.items[0].title).toBe('Movie 1');
    expect(carousel.items[1].title).toBe('Movie 2');
  });

  it('normaliza items no array a array vacío', () => {
    const carousel = createCarousel({ title: 'Test', type: 'thumb', items: null });
    expect(carousel.items).toEqual([]);
  });
});
