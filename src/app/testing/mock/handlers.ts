import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.rawg.io/api/genres', () => HttpResponse.json({ count: 0, results: [] })),
  http.get('https://api.rawg.io/api/games', () => HttpResponse.json({ count: 0, results: [] })),
  http.get('https://api.rawg.io/api/platforms/lists/parents', () =>
    HttpResponse.json({ count: 0, results: [] }),
  ),
];
