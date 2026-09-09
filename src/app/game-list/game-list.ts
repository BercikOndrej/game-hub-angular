import { Component, inject, linkedSignal, signal } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
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
import { Tooltip } from '../directives/tooltip';
import { MultiselectBox } from '../shared/muiltiselect-box/multiselect-box';

const PLATFORM_ICON_MAP: Partial<Record<string, string>> = {
  Pc: 'simpleSteam',
  Plastation: 'simplePlaystation',
  Xbox: 'faBrandXbox',
  MacOs: 'simpleApple',
  Linux: 'simpleLinux',
  Android: 'simpleAndroid',
  Web: 'simpleGooglechrome',
  Nintendo: 'faSolidGamepad',
};

@Component({
  imports: [Card, RatingStars, NgIcon, Tooltip, KeyValuePipe, MultiselectBox],
  selector: 'app-game-list',
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
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
})
export class GameList {
  // Signal store
  // private store = inject(GameHubSignalStore);
  // protected games = linkedSignal(() => this.store.getGames());

  // Http resource store
  // protected store = inject(HttpResourcesGameHubStore);

  // Rx resource store
  protected store = inject(RxResourceGameHubStore);

  protected changeSelectedPlatforms = (values: number[]): void => {
    this.store.setSeledctedPlatformIds(values);
  };

  protected normalizePlatformIcons(platforms: readonly Platform[]): Record<string, string> {
    return platforms
      .map((platform) => {
        if (platform.slug.includes('playstation')) {
          return 'Playstation';
        }
        if (platform.slug.includes('windows')) {
          return 'Pc';
        }
        if (platform.slug.includes('macos')) {
          return 'MacOs';
        }
        if (platform.slug.includes('nintendo')) {
          return 'Nintendo';
        }
        if (platform.slug.includes('xbox')) {
          return 'Xbox';
        }
        if (platform.slug.includes('android')) {
          return 'Android';
        }
        if (platform.slug.includes('web')) {
          return 'Web';
        }
        if (platform.slug.includes('linux')) {
          return 'Linux';
        }
        return '';
      })
      .filter((key) => key in PLATFORM_ICON_MAP)
      .reduce<Record<string, string>>((icons, key) => {
        const icon = PLATFORM_ICON_MAP[key];
        if (icon) {
          icons[key] = icon;
        }
        return icons;
      }, {});
  }
}
