import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/pokedex-shell/welcome.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
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
