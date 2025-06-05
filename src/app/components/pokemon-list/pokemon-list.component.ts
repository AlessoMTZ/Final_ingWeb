import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, PokemonListResponse } from '../../models/pokemon.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pokemon-grid">
      <div *ngFor="let pokemon of pokemonList" class="pokemon-card">
        <img [src]="pokemon.sprites.front_default" [alt]="pokemon.name">
        <h3>{{ pokemon.name | titlecase }}</h3>
        <div class="types">
          <span *ngFor="let type of pokemon.types" class="type-badge" [class]="type.type.name">
            {{ type.type.name }}
          </span>
        </div>
        <a [routerLink]="['/pokemon', pokemon.name]" class="details-link">Ver detalles</a>
      </div>
    </div>
    <div class="pagination">
      <button (click)="previousPage()" [disabled]="!hasPrevious">Anterior</button>
      <button (click)="nextPage()" [disabled]="!hasNext">Siguiente</button>
    </div>
  `,
  styles: [`
    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .pokemon-card {
      background: white;
      border-radius: 10px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .pokemon-card:hover {
      transform: translateY(-5px);
    }

    .pokemon-card img {
      width: 120px;
      height: 120px;
    }

    .types {
      display: flex;
      gap: 5px;
      justify-content: center;
      margin: 10px 0;
    }

    .type-badge {
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 0.8em;
      color: white;
    }

    .normal { background-color: #A8A878; }
    .fire { background-color: #F08030; }
    .water { background-color: #6890F0; }
    .electric { background-color: #F8D030; }
    .grass { background-color: #78C850; }
    .ice { background-color: #98D8D8; }
    .fighting { background-color: #C03028; }
    .poison { background-color: #A040A0; }
    .ground { background-color: #E0C068; }
    .flying { background-color: #A890F0; }
    .psychic { background-color: #F85888; }
    .bug { background-color: #A8B820; }
    .rock { background-color: #B8A038; }
    .ghost { background-color: #705898; }
    .dragon { background-color: #7038F8; }
    .dark { background-color: #705848; }
    .steel { background-color: #B8B8D0; }
    .fairy { background-color: #EE99AC; }

    .details-link {
      display: inline-block;
      margin-top: 10px;
      padding: 5px 10px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }

    .pagination {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
    }

    .pagination button {
      padding: 10px 20px;
      border: none;
      background-color: #4CAF50;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }

    .pagination button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  offset = 0;
  limit = 20;
  hasNext = false;
  hasPrevious = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe((response: PokemonListResponse) => {
      this.hasNext = !!response.next;
      this.hasPrevious = !!response.previous;
      
      response.results.forEach(pokemon => {
        this.pokemonService.getPokemonDetails(pokemon.name).subscribe((details: Pokemon) => {
          this.pokemonList.push(details);
        });
      });
    });
  }

  nextPage() {
    if (this.hasNext) {
      this.offset += this.limit;
      this.pokemonList = [];
      this.loadPokemon();
    }
  }

  previousPage() {
    if (this.hasPrevious) {
      this.offset -= this.limit;
      this.pokemonList = [];
      this.loadPokemon();
    }
  }
} 