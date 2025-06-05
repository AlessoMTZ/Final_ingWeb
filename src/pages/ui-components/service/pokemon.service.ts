import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  constructor(private http: HttpClient) {}

  getPokemon(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPokemonByID(pokemonID: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
    return this.http.get<any>(url);
  }
} 


