// import { inject, Injectable, signal, WritableSignal } from '@angular/core';
// import { Game, Genre } from '../types/Games';
// import { ApiService } from '../services/api-service';
// import { catchError, of } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';

// export interface GameHubStoreModel {
//   games: Game[];
//   genres: Genre[];
// }

// @Injectable({ providedIn: 'root' })
// export class GameHubSignalStore {
//   private apiService = inject(ApiService);

//   private state: WritableSignal<GameHubStoreModel> = signal({
//     games: [],
//     genres: [],
//   });

//   public getGames = (): Game[] => this.state().games;
//   public getGenres = (): Genre[] => this.state().genres;
//   public getGame = (id: number): Game | undefined => this.state().games.find((g) => g.id === id);
//   public getGenre = (id: number): Genre | undefined => this.state().genres.find((g) => g.id === id);

//   public updateGames(games: Game[]): void {
//     this.state.update((prev: GameHubStoreModel) => ({
//       ...prev,
//       games,
//     }));
//   }

//   public updateGenres(genres: Genre[]): void {
//     this.state.update((prev: GameHubStoreModel) => ({
//       ...prev,
//       genres,
//     }));
//   }

//   public addGame(game: Game): void {
//     this.state.update((prev) => ({
//       ...prev,
//       games: [...prev.games, game],
//     }));
//   }

//   public addGenre(genre: Genre): void {
//     this.state.update((prev) => ({
//       ...prev,
//       genres: [...prev.genres, genre],
//     }));
//   }

//   public loadGames() {
//     this.apiService
//       // This empty array is only workaround to NOT implement filtering in this type of store
//       .loadGames([])
//       .pipe(
//         catchError((err: HttpErrorResponse) => {
//           console.error('Api error during games loading: ', err.message);
//           return of([]);
//         }),
//       )
//       .subscribe((games) => this.updateGames(games));
//   }

//   public loadGenres() {
//     this.apiService
//       .loadGenres()
//       .pipe(
//         catchError((err: HttpErrorResponse) => {
//           console.error('Api error during genres loading: ', err.message);
//           return of([]);
//         }),
//       )
//       .subscribe((genres) => this.updateGenres(genres));
//   }
// }
