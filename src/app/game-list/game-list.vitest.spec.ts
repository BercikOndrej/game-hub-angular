import { http, HttpResponse } from 'msw';
import { worker } from '../testing/mock/browser';
import { render } from 'vitest-browser-angular';
import { GameList } from './game-list';
import { provideHttpClient } from '@angular/common/http';
import { page } from 'vitest/browser';

const TEST_GAMES = [
  {
    id: 1,
    slug: 'test-game-1',
    name: 'test game 1',
    released: '01-01-2000',
    background_image: '',
    rating: 5,
    platforms: [],
  },
  {
    id: 2,
    slug: 'test-game-2',
    name: 'test game 2',
    released: '01-01-2000',
    background_image: '',
    rating: 1,
    platforms: [],
  },
];

describe('Game list', async () => {
  it('should display games', async () => {
    worker.use(
      http.get('https://api.rawg.io/api/games', () =>
        HttpResponse.json({
          count: 2,
          results: TEST_GAMES,
        }),
      ),
    );

    await render(GameList, { providers: [provideHttpClient()] });

    await expect.element(page.getByText('test game 1')).toBeVisible();
    await expect.element(page.getByText('test game 2')).toBeVisible();
  });

  it('should display info message when no games are unvailable', async () => {
    await expect.element(page.getByText('No games are available'));
  });
});
