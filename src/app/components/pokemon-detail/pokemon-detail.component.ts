import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokedexFrameComponent } from '../pokedex-frame/pokedex-frame.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, PokedexFrameComponent],
  template: `
    <app-pokedex-frame [id]="pokemon?.id">
      <div class="pokemon-header">
        <a routerLink="/regions" class="pokedex-button volver-btn">Volver</a>
        <h1>{{ pokemon.name | titlecase }}</h1>
      </div>
      <div class="pokemon-detail-content">
        <div class="pokemon-detail-imgs">
          <img [src]="pokemon.sprites.front_default" [alt]="pokemon.name + ' front'">
          <img [src]="pokemon.sprites.back_default" [alt]="pokemon.name + ' back'">
        </div>
        <div class="pokemon-detail-info">
          <div class="poke-types">
            <span *ngFor="let type of pokemon.types" class="type-badge" [class]="type.type.name">{{ type.type.name }}</span>
          </div>
          <div class="poke-characteristics">
            <span>Altura: {{ pokemon.height / 10 }} m</span> |
            <span>Peso: {{ pokemon.weight / 10 }} kg</span>
          </div>
          <div class="poke-abilities">
            <strong>Habilidades ({{ pokemon.abilities.length }}):</strong>
            <span *ngFor="let ab of pokemon.abilities">{{ ab.ability.name }} </span>
          </div>
          <div class="poke-stats">
            <strong>Stats:</strong>
            <div *ngFor="let stat of pokemon.stats">
              <span>{{ stat.stat.name | titlecase }}: {{ stat.base_stat }}</span>
            </div>
          </div>
          <div class="poke-regions" *ngIf="regions.length">
            <strong>Regiones:</strong>
            <ul>
              <li *ngFor="let region of regions">{{ region | titlecase }}</li>
            </ul>
          </div>
        </div>
      </div>
    </app-pokedex-frame>
  `,
  styles: [`
    .pokedex-frame {
      display: flex;
      max-width: 900px;
      margin: 2rem auto;
      background: none;
      border-radius: 24px;
      box-shadow: 0 0 30px #000a;
      min-height: 480px;
    }
    .pokedex-left {
      background: var(--pokedex-screen);
      border-radius: 24px 0 0 24px;
      flex: 2;
      padding: 2rem 2rem 2rem 2.5rem;
      border: 8px solid var(--pokedex-red);
      border-right: 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    .pokedex-right {
      background: var(--pokedex-red);
      border-radius: 0 24px 24px 0;
      flex: 1;
      padding: 2rem 1.2rem 2rem 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 8px solid var(--pokedex-red);
      border-left: 0;
      min-width: 160px;
      box-shadow: -4px 0 12px #0004 inset;
    }
    .pokedex-id-panel {
      margin-top: 1.5rem;
      margin-bottom: 2.5rem;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .pokedex-id {
      font-family: 'Press Start 2P', cursive;
      font-size: 2.2rem;
      color: #fff;
      background: #222;
      border-radius: 12px;
      padding: 0.5rem 1.2rem;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px #0008;
      letter-spacing: 2px;
    }
    .pokedex-buttons-panel {
      display: flex;
      gap: 0.7rem;
      margin-bottom: 2.2rem;
      justify-content: center;
      width: 100%;
    }
    .pokedex-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px #0006;
    }
    .pokedex-btn-blue { background: #2196f3; }
    .pokedex-btn-yellow { background: #ffe600; }
    .pokedex-btn-green { background: #43a047; }
    .pokedex-squares-panel {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      margin-top: 1.5rem;
      width: 100%;
      justify-items: center;
    }
    .pokedex-square {
      width: 32px;
      height: 24px;
      background: #1976d2;
      border-radius: 6px;
      border: 2px solid #fff;
      box-shadow: 0 1px 4px #0004;
    }
    .pokemon-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .volver-btn {
      margin: 0;
      padding: 0.7rem 2rem;
      font-size: 1.1rem;
      min-width: 120px;
      text-align: center;
      box-shadow: 0 2px 8px #0004;
    }
    .pokemon-header h1 {
      margin: 0;
      color: var(--pokedex-dark);
      font-size: 2rem;
      flex: 1;
    }
    .pokedex-button { background-color: #b71c1c; color: #fff; border: none; padding: 0.7rem 2rem; border-radius: 8px; cursor: pointer; font-family: 'Press Start 2P', cursive; font-size: 1rem; transition: all 0.3s ease; margin-top: 1rem; }
    .pokedex-button:hover { background-color: #222; color: #e6e600; transform: scale(1.05); }
    .pokemon-detail-content { display: flex; gap: 2rem; align-items: flex-start; }
    .pokemon-detail-imgs { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .pokemon-detail-imgs img { width: 120px; height: 120px; object-fit: contain; background: #fff; border-radius: 10px; border: 2px solid var(--pokedex-dark); }
    .pokemon-detail-info { flex: 1; display: flex; flex-direction: column; gap: 0.7rem; }
    .poke-types { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
    .type-badge { padding: 2px 10px; border-radius: 10px; color: #fff; font-size: 0.9em; text-shadow: 1px 1px 2px #222; font-weight: bold; border: 1.5px solid #222; box-shadow: 1px 1px 2px #2222; min-width: 60px; text-align: center; text-transform: uppercase; }
    .normal { background-color: #A8A878; } .fire { background-color: #F08030; } .water { background-color: #6890F0; } .electric { background-color: #F8D030; } .grass { background-color: #78C850; } .ice { background-color: #98D8D8; } .fighting { background-color: #C03028; } .poison { background-color: #A040A0; } .ground { background-color: #E0C068; } .flying { background-color: #A890F0; } .psychic { background-color: #F85888; } .bug { background-color: #A8B820; } .rock { background-color: #B8A038; } .ghost { background-color: #705898; } .dragon { background-color: #7038F8; } .dark { background-color: #705848; } .steel { background-color: #B8B8D0; } .fairy { background-color: #EE99AC; }
    .poke-characteristics { font-size: 0.95em; margin-bottom: 0.3rem; }
    .poke-abilities { font-size: 0.95em; margin-bottom: 0.3rem; }
    .poke-stats { font-size: 0.95em; margin-bottom: 0.3rem; color: #111; padding: 0.5em 0.7em; background: rgba(255,255,255,0.25); border-radius: 8px; }
    .poke-stats span { display: block; padding: 2px 0 2px 8px; color: #111; }
    .poke-regions ul { margin: 0.2em 0 0 0.5em; padding: 0; list-style: disc inside; }
    .poke-regions li { color: #222; font-size: 0.95em; margin-bottom: 2px; }
    .poke-regions { font-size: 0.95em; margin-top: 0.5rem; }
    @keyframes screenFlicker { 0% { opacity: 1; } 50% { opacity: 0.97; } 100% { opacity: 1; } }
  `]
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  regions: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = params['name'];
      this.pokemonService.getPokemonDetails(name).subscribe((pokemon: any) => {
        this.pokemon = pokemon;
        this.pokemonService.getPokemonSpecies(name).subscribe((species: any) => {
          this.regions = species.pokedex_numbers.map((entry: any) => entry.pokedex.name);
        });
      });
    });
  }
} 