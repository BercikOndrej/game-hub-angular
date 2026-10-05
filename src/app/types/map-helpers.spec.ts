import { GameDto, GenreDto } from './dtos';
import { dtoToGame, dtoToGenre } from './map-helpers';

describe('dtoToGame', () => {
  it('maps background_image to backgroundImage and flattens platforms', () => {
    const dto: GameDto = {
      id: 1,
      slug: 'cyberpunk-2077',
      name: 'Cyberpunk 2077',
      released: '2020-12-10',
      background_image: 'https://example.com/image.jpg',
      rating: 4.5,
      platforms: [
        { platform: { id: 1, name: 'PC', slug: 'pc' }, released_at: '2020-12-10' },
        { platform: { id: 2, name: 'PlayStation', slug: 'playstation' }, released_at: null },
      ],
    };

    const result = dtoToGame(dto);

    expect(result).toMatchObject({
      id: 1,
      slug: 'cyberpunk-2077',
      name: 'Cyberpunk 2077',
      released: '2020-12-10',
      backgroundImage: 'https://example.com/image.jpg',
      rating: 4.5,
      platforms: [
        { id: 1, name: 'PC', slug: 'pc' },
        { id: 2, name: 'PlayStation', slug: 'playstation' },
      ],
    });
  });
});

describe('dtoToGenre', () => {
  it('maps all properties from snake naming to camel case naming', () => {
    const dto: GenreDto = {
      id: 1,
      slug: 'strategy',
      name: 'Cyberpunk 2077',
      games_count: 1000,
      image_background: 'https://example.com/image.jpg',
      description: 'test description',
    };

    const result = dtoToGenre(dto);

    expect(result).toMatchObject({
      id: 1,
      slug: 'strategy',
      name: 'Cyberpunk 2077',
      gamesCount: 1000,
      backgroundImage: 'https://example.com/image.jpg',
      description: 'test description',
    });
  });
});
