import {Routes} from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';



export const PokemonRoutes: Routes = [{
    path:'',
    children: [
        {
            path:'',
            component: PokemonListComponent
        },
        {
            path:'/:id',
            component: PokemonFormComponent
        }
    ], 
}];