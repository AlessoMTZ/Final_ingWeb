import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pokemon } from '../../../../app/models/pokemon.model';
import { PokemonService } from '../../service/pokemon.service';
import { AlertService } from '../../service/Alert/alert.service';

@Component({
  selector: 'app-Pokemon-list',
  imports: [ CommonModule, RouterLink],
  templateUrl: './Pokemon-list.component.html',
  styleUrl: './Pokemon-list.component.scss'
})
export class PokemonListComponent {

  PokemonList: Pokemon[] = [];

  constructor(private PokemonService: PokemonService, private router: Router, private alertService: AlertService){

  }

  ngOnInit(){
    this.getPokemon();    
  }


  getPokemon(){
    this.PokemonService.getPokemon().subscribe(
      {
        next: (res) =>{
          this.PokemonList = res;
          if (this.PokemonList.length == 0){
            this.alertService.AlertaInfo("Es una lástima", "la nevera quedó vacía")
          }
        },
        error: (err)=>{
          this.alertService.AlertaNegativo("Oops!!!", "Algo inesperado sucedió en la despensa")
        }
      }
    )
  }


}
