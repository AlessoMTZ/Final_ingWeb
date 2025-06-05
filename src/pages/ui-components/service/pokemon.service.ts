import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../../../app/models/pokemon.model';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  constructor(private http: HttpClient) {}

  getPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

  getPokemonByID(pokemonID: string): Observable<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
    return this.http.get<Pokemon>(url);

  }
} 


