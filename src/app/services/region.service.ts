import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Region {
  id: number;
  name: string;
  pokemon_species: { name: string; url: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<any>(`${this.apiUrl}/region`).pipe(
      map(response => response.results.map((region: any, index: number) => ({
        id: index + 1,
        name: region.name,
        pokemon_species: []
      })))
    );
  }

  getRegionById(id: number): Observable<Region> {
    return this.http.get<any>(`${this.apiUrl}/region/${id}`).pipe(
      map(response => ({
        id: response.id,
        name: response.name,
        pokemon_species: response.pokemon_species
      }))
    );
  }

  getRegionByIdRaw(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/region/${id}`);
  }

  getPokedexByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokedex/${name}`);
  }
} 