import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pokemon-detail" *ngIf="pokemon">
      <div class="pokemon-header">
        <a routerLink="/" class="back-button">← Volver</a>
        <h1>{{ pokemon.name | titlecase }}</h1>
      </div>
      
      <div class="pokemon-content">
        <div class="pokemon-images">
          <img [src]="pokemon.sprites.front_default" [alt]="pokemon.name + ' front'">
          <img [src]="pokemon.sprites.back_default" [alt]="pokemon.name + ' back'">
        </div>

        <div class="pokemon-info">
          <div class="info-section">
            <h2>Tipos</h2>
            <div class="types">
              <span *ngFor="let type of pokemon.types" class="type-badge" [class]="type.type.name">
                {{ type.type.name }}
              </span>
            </div>
          </div>

          <div class="info-section">
            <h2>Características</h2>
            <p><strong>Altura:</strong> {{ pokemon.height / 10 }}m</p>
            <p><strong>Peso:</strong> {{ pokemon.weight / 10 }}kg</p>
          </div>

          <div class="info-section">
            <h2>Habilidades</h2>
            <ul>
              <li *ngFor="let ability of pokemon.abilities">
                {{ ability.ability.name | titlecase }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pokemon-detail {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .pokemon-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 30px;
    }

    .back-button {
      text-decoration: none;
      color: #4CAF50;
      font-size: 1.2em;
      padding: 5px 10px;
      border: 2px solid #4CAF50;
      border-radius: 5px;
      transition: all 0.3s;
    }

    .back-button:hover {
      background-color: #4CAF50;
      color: white;
    }

    .pokemon-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .pokemon-images {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .pokemon-images img {
      width: 200px;
      height: 200px;
      object-fit: contain;
    }

    .pokemon-info {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .info-section {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 10px;
    }

    .info-section h2 {
      margin-top: 0;
      color: #333;
      border-bottom: 2px solid #4CAF50;
      padding-bottom: 10px;
    }

    .types {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .type-badge {
      padding: 5px 15px;
      border-radius: 20px;
      color: white;
      font-size: 0.9em;
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

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      padding: 5px 0;
      border-bottom: 1px solid #ddd;
    }

    li:last-child {
      border-bottom: none;
    }
  `]
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = params['name'];
      this.pokemonService.getPokemonDetails(name).subscribe((pokemon: any) => {
        this.pokemon = pokemon;
      });
    });
  }
} 