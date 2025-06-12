import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'regions',
    pathMatch: 'full'
  },
  {
    path: 'regions',
    loadComponent: () => import('./components/regions/regions.component').then(m => m.RegionsComponent)
  },
  {
    path: 'region/:id',
    loadComponent: () => import('./components/region-detail/region-detail.component').then(m => m.RegionDetailComponent)
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./components/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent)
  }
];
