import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div *ngIf="loading" class="loader-bg">
      <div class="pokedex-loader">
        <div class="pokedex-loader-body"></div>
        <div class="pokedex-loader-screen">Cargando Pokédex...</div>
        <div class="pokedex-loader-bar">
          <div class="pokedex-loader-progress" [style.width]="progress + '%'"> </div>
        </div>
      </div>
    </div>
    <div *ngIf="!loading && !showWelcome" class="welcome-bg">
      <div class="pokedex-welcome">
        <div class="pokedex-closed"></div>
        <div class="welcome-text">
          <h1>¡Bienvenido a la Pokédex!</h1>
          <button class="pokedex-button" (click)="openPokedex()">Abrir Pokédex</button>
        </div>
      </div>
    </div>
    <main *ngIf="showWelcome" class="pokedex-wrapper">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .loader-bg {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, #2d2d2d 0%, #e3350d 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .pokedex-loader {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #e3350d;
      border-radius: 20px;
      padding: 2rem 3rem;
      box-shadow: 0 0 30px #000a;
    }
    .pokedex-loader-body {
      width: 120px;
      height: 80px;
      background: #b71c1c;
      border-radius: 15px 15px 30px 30px;
      margin-bottom: 1rem;
      position: relative;
    }
    .pokedex-loader-screen {
      color: #fff;
      font-family: 'Press Start 2P', cursive;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      text-align: center;
    }
    .pokedex-loader-bar {
      width: 200px;
      height: 16px;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #b71c1c;
    }
    .pokedex-loader-progress {
      height: 100%;
      background: linear-gradient(90deg, #4caf50, #e6e600);
      transition: width 0.3s;
    }
    .welcome-bg {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, #2d2d2d 0%, #e3350d 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9998;
    }
    .pokedex-welcome {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    .pokedex-closed {
      width: 220px;
      height: 160px;
      background: #e3350d;
      border-radius: 20px 20px 40px 40px;
      border: 6px solid #b71c1c;
      box-shadow: 0 0 30px #000a;
      position: relative;
    }
    .pokedex-closed::before {
      content: '';
      display: block;
      position: absolute;
      top: 18px; left: 18px;
      width: 40px; height: 40px;
      background: #2196f3;
      border-radius: 50%;
      border: 4px solid #fff;
      box-shadow: 0 0 0 4px #1976d2;
    }
    .welcome-text {
      text-align: center;
      color: #fff;
      font-family: 'Press Start 2P', cursive;
    }
    .welcome-text h1 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .pokedex-button {
      background-color: #b71c1c;
      color: #fff;
      border: none;
      padding: 0.7rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Press Start 2P', cursive;
      font-size: 1rem;
      transition: all 0.3s ease;
      margin-top: 1rem;
    }
    .pokedex-button:hover {
      background-color: #222;
      color: #e6e600;
      transform: scale(1.05);
    }
    .pokedex-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--pokedex-dark) 0%, var(--pokedex-dark-red) 100%);
      padding: 2rem;
    }
  `]
})
export class AppComponent implements OnInit {
  loading = true;
  progress = 0;
  showWelcome = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.preloadAllPokemon().subscribe({
      next: (all) => {
        this.progress = 100;
        setTimeout(() => {
          this.loading = false;
        }, 800);
      },
      error: () => {
        this.loading = false;
      }
    });
    // Simulación de progreso
    let fakeProgress = 0;
    const interval = setInterval(() => {
      if (this.progress < 90) {
        fakeProgress += Math.random() * 5;
        this.progress = Math.min(90, fakeProgress);
      } else {
        clearInterval(interval);
      }
    }, 120);
  }

  openPokedex() {
    this.showWelcome = true;
  }
}
