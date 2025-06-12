import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private pokemonCache: any[] = [];
  private cacheLoaded = false;

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number = 20): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${name}`);
  }

  getPokemonSpecies(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${name}`);
  }

  preloadAllPokemon(): Observable<any[]> {
    if (this.cacheLoaded) {
      return new Observable(observer => {
        observer.next(this.pokemonCache);
        observer.complete();
      });
    }
    // La PokéAPI tiene 1010+ Pokémon, los traemos todos de una vez
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=1010`).pipe(
      map((response: any) => response.results),
      switchMap((results: any[]) => {
        return forkJoin(results.map(poke => this.getPokemonDetails(poke.name)));
      }),
      tap((allPokemon: any[]) => {
        this.pokemonCache = allPokemon;
        this.cacheLoaded = true;
      })
    );
  }

  getCachedPokemon(): any[] {
    return this.pokemonCache;
  }
} 