import { AnyHandler, http, HttpResponse } from 'msw';
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
    platforms: [{ platform: { id: 1, name: 'PC', slug: 'pc' }, released_at: null }],
  },
  {
    id: 2,
    slug: 'test-game-2',
    name: 'test game 2',
    released: '01-01-2000',
    background_image: '',
    rating: 1,
    platforms: [
      { platform: { id: 2, name: 'PlayStation', slug: 'playstation' }, released_at: null },
    ],
  },
];

const TEST_PLATFORMS = [
  { id: 1, name: 'PC', slug: 'pc' },
  { id: 2, name: 'PlayStation', slug: 'playstation' },
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
    await setup();

    await expect.element(page.getByText('test game 1')).toBeVisible();
    await expect.element(page.getByText('test game 2')).toBeVisible();
  });

  it('should display info message when no games are unvailable', async () => {
    worker.use(
      http.get('https://api.rawg.io/api/games', () =>
        HttpResponse.json({
          count: 0,
          results: [],
        }),
      ),
    );
    await setup();

    await expect.element(page.getByText('No games are available')).toBeVisible();
  });

  it('should display warning message while error occures during games loading', async () => {
    worker.use(http.get('https://api.rawg.io/api/games', () => HttpResponse.error()));

    await setup();

    await expect.element(page.getByText(/Error occures:/)).toBeVisible();
  });

  it('should display warning message while error occures during platforms loading', async () => {
    worker.use(
      http.get('https://api.rawg.io/api/platforms/lists/parents', () => HttpResponse.error()),
    );

    await setup();

    await expect.element(page.getByText(/Error occures:/)).toBeVisible();
  });

  it('should display only games for selected platform after filtering', async () => {
    const gamesRequestSpy = vi.fn<(platformIds: string | null) => void>();

    const handlers: AnyHandler[] = [
      http.get('https://api.rawg.io/api/platforms/lists/parents', () =>
        HttpResponse.json({ count: TEST_PLATFORMS.length, results: TEST_PLATFORMS }),
      ),
      http.get('https://api.rawg.io/api/games', ({ request }) => {
        const platformIds: string | null = new URL(request.url).searchParams.get(
          'parent_platforms',
        );
        gamesRequestSpy(platformIds);
        const results = platformIds === '2' ? [TEST_GAMES[1]] : TEST_GAMES;
        return HttpResponse.json({ count: results.length, results });
      }),
    ];
    worker.use(...handlers);

    await setup();

    await expect.element(page.getByText('test game 1')).toBeVisible();
    await expect.element(page.getByText('test game 2')).toBeVisible();

    await page.getByRole('button', { name: 'Select platforms' }).click();
    await expect.element(page.getByRole('listbox', { name: 'Platforms' })).toBeVisible();
    await page.getByRole('option', { name: 'PlayStation' }).click();
    await closeOverlay();
    // Label switches from "Select platforms" to "N platforms selected"
    await expect
      .element(page.getByRole('button', { name: '1 platforms selected' }))
      .toHaveAttribute('aria-expanded', 'false');
    await page.getByRole('button', { name: 'Filter', exact: true }).click();

    await vi.waitFor(() => expect(gamesRequestSpy).toHaveBeenLastCalledWith('2'));
    await expect.element(page.getByText('test game 1', { exact: true })).not.toBeInTheDocument();
    await expect.element(page.getByText('test game 2', { exact: true })).toBeVisible();
  });
});

async function setup() {
  await render(GameList, { providers: [provideHttpClient()] });
}

async function closeOverlay(): Promise<void> {
  // CDK backdrop covers the trigger while open, so close it the way a user would
  const backdrop = document.querySelector('.cdk-overlay-backdrop');
  if (!(backdrop instanceof HTMLElement)) {
    throw new Error('Overlay backdrop not found');
  }
  await page.elementLocator(backdrop).click({ position: { x: 1, y: 1 } });
}
