/**
 * Test unitario: mapper de carruseles desde API
 */
import { mapCarouselsFromApi } from '../CarouselMapper';

describe('CarouselMapper', () => {
  it('mapea lista vacía a array vacío', () => {
    expect(mapCarouselsFromApi([])).toEqual([]);
    expect(mapCarouselsFromApi(null)).toEqual([]);
  });

  it('mapea un carrusel desde la respuesta del API', () => {
    const raw = [
      {
        title: 'carrusel Thumb',
        type: 'thumb',
        items: [
          {
            title: 'Movie 1',
            imageUrl: 'http://placeimg.com/640/480/any',
            videoUrl: 'https://example.com/video.m3u8',
            description: 'Lorem ipsum',
          },
        ],
      },
    ];
    const result = mapCarouselsFromApi(raw);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('carrusel Thumb');
    expect(result[0].type).toBe('thumb');
    expect(result[0].items).toHaveLength(1);
    expect(result[0].items[0].title).toBe('Movie 1');
    expect(result[0].items[0].imageUrl).toBe('http://placeimg.com/640/480/any');
    expect(result[0].items[0].videoUrl).toBe('https://example.com/video.m3u8');
  });

  it('mapea tipo por defecto a thumb si no viene type', () => {
    const raw = [{ title: 'Sin tipo', items: [] }];
    const result = mapCarouselsFromApi(raw);
    expect(result[0].type).toBe('thumb');
  });
});
