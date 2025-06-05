import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../../../app/models/pokemon.model';
import { PokemonService } from '../../service/pokemon.service';
import { AlertService } from '../../service/Alert/alert.service';

@Component({
  selector: 'app-pokemon-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './Pokemon-form.component.html',
  styleUrl: './Pokemon-form.component.scss'
})
export class PokemonFormComponent {

  form: FormGroup;
  PokemonId: string | null = null;
  Pokemon: Pokemon = {
    name: '',
    url: '',
    id: 0,
    sprites: {
      front_default: ''
    },
    abilites: []
  };  

  constructor(
    private formBuilder: FormBuilder,
    private PokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      id: [0, Validators.required],
      front_default: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.PokemonId = this.route.snapshot.paramMap.get('id');
    if (this.PokemonId) {
      this.getPokemonByID(this.PokemonId);
    }
  }

  getPokemonByID(pokemonID: string) {
    this.PokemonService.getPokemonByID(pokemonID).subscribe({
      next: (res) => {
        this.Pokemon = res;
        this.form.patchValue({
          name: this.Pokemon.name,
          url: this.Pokemon.url,
          id: this.Pokemon.id,
          front_default: this.Pokemon.sprites?.front_default || ''
        });
      },
      error: (err) => {
        this.alertService.AlertaNegativo("Oops!!!", "Algo inesperado sucedió al obtener el Pokémon");
      }
    });
  }
}