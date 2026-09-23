import { KeyValuePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { faBrandXbox } from '@ng-icons/font-awesome/brands';
import { faSolidGamepad } from '@ng-icons/font-awesome/solid';
import {
  simpleAndroid,
  simpleApple,
  simpleGooglechrome,
  simpleLinux,
  simplePlaystation,
  simpleSteam,
} from '@ng-icons/simple-icons';
import { Tooltip } from '../directives/tooltip/tooltip';
import { Card } from '../shared/card/card';
import { MultiselectBox } from '../shared/muiltiselect-box/multiselect-box';
import { RatingStars } from '../shared/rating-stars/rating-stars';
import RxResourceGameHubStore from '../stores/rx-resource-game-hub.-store';
import { Platform } from '../types/Games';
import { Button } from '../shared/button/button';

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
  imports: [Card, RatingStars, NgIcon, Tooltip, KeyValuePipe, MultiselectBox, Button],
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

  protected readonly selectedPlatformIds = signal<number[]>([]);

  protected changeSelectedPlatforms = (values: number[]): void => {
    this.selectedPlatformIds.set(values);
  };

  protected filterGames(): void {
    this.store.setSeledctedPlatformIds(this.selectedPlatformIds());
  }

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
