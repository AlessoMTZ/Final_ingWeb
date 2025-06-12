import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegionService, Region } from '../../services/region.service';
import { PokedexFrameComponent } from '../pokedex-frame/pokedex-frame.component';

@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [CommonModule, RouterModule, PokedexFrameComponent],
  template: `
    <app-pokedex-frame>
      <div class="regions-content">
        <h1>Selecciona una Región</h1>
        <div class="regions-grid">
          <div *ngFor="let region of regions" 
               class="region-card"
               [routerLink]="['/region', region.id]">
            <h2>{{ region.name | titlecase }}</h2>
          </div>
        </div>
      </div>
    </app-pokedex-frame>
  `,
  styles: [`
    .regions-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .regions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding: 1rem;
    }
    h1 {
      text-align: center;
      color: var(--pokedex-dark);
      margin-bottom: 2rem;
    }
    .region-card {
      background-color: var(--pokedex-light);
      color: var(--pokedex-dark);
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 3px solid var(--pokedex-dark);
    }
    .region-card:hover {
      transform: scale(1.05);
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    }
    h2 {
      margin: 0;
      font-size: 1.2rem;
    }
  `]
})
export class RegionsComponent implements OnInit {
  regions: Region[] = [];

  constructor(private regionService: RegionService) {}

  ngOnInit() {
    this.regionService.getRegions().subscribe(
      regions => this.regions = regions,
      error => console.error('Error loading regions:', error)
    );
  }
} 