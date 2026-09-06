import { Component, inject, linkedSignal, signal } from '@angular/core';
import { GameHubSignalStore } from '../stores/game-hub-signal-store';
import { Card } from '../shared/card/card';
import HttpResourcesGameHubStore from '../stores/http-resources-game-hub-store';
import RxResourceGameHubStore from '../stores/rx-resource-game-hub.-store';
import { RatingStars } from '../shared/rating-stars/rating-stars';
import { Platform } from '../types/Games';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  simpleLinux,
  simplePlaystation,
  simpleSteam,
  simpleAndroid,
  simpleGooglechrome,
  simpleApple,
} from '@ng-icons/simple-icons';
import { faBrandXbox } from '@ng-icons/font-awesome/brands';
import { faSolidGamepad } from '@ng-icons/font-awesome/solid';

const PLATFORM_ICON_MAP: Partial<Record<string, string>> = {
  pc: 'simpleSteam',
  ps: 'simplePlaystation',
  xbox: 'faBrandXbox',
  mac: 'simpleApple',
  linux: 'simpleLinux',
  android: 'simpleAndroid',
  web: 'simpleGooglechrome',
  nintendo: 'faSolidGamepad',
};

@Component({
  imports: [Card, RatingStars, NgIcon],
  selector: 'app-game-list',
  templateUrl: './game-list.html',
  providers: [
    provideIcons({
      simpleSteam,
      simpleLinux,
      simplePlaystation,
      simpleAndroid,
      simpleGooglechrome,
      simpleApple,
      faBrandXbox,
      faSolidGamepad,
    }),
  ],
  host: {
    class: 'grid grid-cols-3 items-stretch justify-between gap-4 p-4',
  },
})
export class GameList {
  // Signal store
  // private store = inject(GameHubSignalStore);
  // protected games = linkedSignal(() => this.store.getGames());

  // Http resource store
  // protected store = inject(HttpResourcesGameHubStore);

  // Rx resource store
  protected store = inject(RxResourceGameHubStore);

  protected normalizePlatformIcons(platforms: readonly Platform[]): string[] {
    const normalized = platforms
      .map((platform) => {
        if (platform.slug.includes('playstation')) {
          return 'ps';
        }
        if (platform.slug.includes('windows')) {
          return 'pc';
        }
        if (platform.slug.includes('macos')) {
          return 'mac';
        }
        if (platform.slug.includes('nintendo')) {
          return 'nintendo';
        }
        if (platform.slug.includes('xbox')) {
          return 'xbox';
        }
        if (platform.slug.includes('android')) {
          return 'android';
        }
        if (platform.slug.includes('web')) {
          return 'web';
        }
        if (platform.slug.includes('linux')) {
          return 'linux';
        }
        return '';
      })
      .filter((p) => p.trim() !== '' || !Object.keys(PLATFORM_ICON_MAP).includes(p))
      .map((p) => PLATFORM_ICON_MAP[p])
      .filter((p) => p !== undefined);
    return [...new Set(normalized)];
  }
}
