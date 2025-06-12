import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { RegionService, Region } from '../../services/region.service';
import { PokedexFrameComponent } from '../pokedex-frame/pokedex-frame.component';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-region-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, PokedexFrameComponent],
  template: `
    <app-pokedex-frame (volver)="volver()">
      <div class="region-detail-content">
        <div class="header">
          <h1>{{ region?.name | titlecase }}</h1>
        </div>
        
        <div class="pokemon-grid" *ngIf="pokemonList.length">
          <div *ngFor="let poke of pokemonList" 
               class="pokemon-card"
               [routerLink]="['/pokemon', poke.name]"
               [queryParams]="{ region: region?.id }">
            <img [src]="poke.sprite" [alt]="poke.name" width="80" height="80" />
            <h3>{{ poke.name | titlecase }}</h3>
          </div>
        </div>
      </div>
    </app-pokedex-frame>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    h1 {
      margin: 0;
      color: var(--pokedex-dark);
    }

    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }

    .pokemon-card {
      background-color: var(--pokedex-light);
      color: var(--pokedex-dark);
      border-radius: 10px;
      padding: 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid var(--pokedex-dark);
    }

    .pokemon-card:hover {
      transform: scale(1.05);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    h3 {
      margin: 0;
      font-size: 1rem;
    }

    .poke-types {
      margin: 0.5rem 0;
      display: flex;
      gap: 0.3rem;
      flex-wrap: wrap;
    }
    .type-badge {
      padding: 2px 10px;
      border-radius: 10px;
      color: #fff;
      font-size: 0.8em;
      text-shadow: 1px 1px 2px #222;
    }
    .poke-abilities {
      font-size: 0.8em;
      margin-bottom: 0.3rem;
    }
    .poke-characteristics {
      font-size: 0.8em;
      margin-bottom: 0.3rem;
    }
    .poke-stats {
      font-size: 0.8em;
      margin-bottom: 0.3rem;
    }
    .poke-stats span {
      display: block;
    }
  `]
})
export class RegionDetailComponent implements OnInit {
  region: Region | null = null;
  pokedexName: string = '';
  pokedexEntries: any[] = [];
  pokemonList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private regionService: RegionService,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const regionId = +params['id'];
      this.regionService.getRegionByIdRaw(regionId).subscribe(region => {
        if (region.pokedexes && region.pokedexes.length > 0) {
          this.pokedexName = region.pokedexes[0].name;
          this.region = { id: region.id, name: region.name, pokemon_species: [] };
          this.regionService.getPokedexByName(this.pokedexName).subscribe(pokedex => {
            this.pokedexEntries = pokedex.pokemon_entries;
            // Obtener info individual de cada Pokémon desde el cache
            const allPokemon = this.pokemonService.getCachedPokemon();
            this.pokemonList = this.pokedexEntries.map((entry: any) => {
              const poke = allPokemon.find((p: any) => p.name === entry.pokemon_species.name);
              return poke ? {
                name: poke.name,
                sprite: poke.sprites.front_default,
                types: poke.types,
                abilities: poke.abilities,
                height: poke.height,
                weight: poke.weight,
                stats: poke.stats
              } : null;
            }).filter(Boolean);
          });
        }
      });
    });
  }

  volver() {
    this.router.navigate(['/regions']);
  }
} 