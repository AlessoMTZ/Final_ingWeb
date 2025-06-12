import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokedexFrameComponent } from '../pokedex-frame/pokedex-frame.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, PokedexFrameComponent, FormsModule],
  template: `
    <app-pokedex-frame>
      <div class="welcome-content" *ngIf="!username">
        <h2>¡Bienvenido a la Pokédex!</h2>
        <form (ngSubmit)="saveName()">
          <label for="username">¿Cuál es tu nombre de entrenador?</label>
          <input id="username" [(ngModel)]="inputName" name="username" required maxlength="16" autofocus>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <div class="welcome-content" *ngIf="username">
        <h2>¡Hola, {{ username }}!</h2>
        <div class="welcome-options">
          <button (click)="goTo('regions')">Regiones</button>
          <button (click)="goTo('team')">Equipo</button>
          <button (click)="goTo('bag')">Mochila</button>
          <button (click)="goTo('profile')">Perfil</button>
        </div>
      </div>
    </app-pokedex-frame>
  `,
  styles: [`
    .welcome-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 1.5rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    input[type="text"], input[type="text"]:focus, input[type="text"]:active {
      font-family: 'Press Start 2P', cursive;
      font-size: 1rem;
      border-radius: 8px;
      border: 2px solid #b71c1c;
      padding: 0.5rem 1rem;
      outline: none;
      background: #fff;
      color: #222;
      margin-top: 0.5rem;
    }
    button {
      font-family: 'Press Start 2P', cursive;
      font-size: 1rem;
      border-radius: 8px;
      border: none;
      background: #b71c1c;
      color: #fff;
      padding: 0.7rem 2rem;
      margin-top: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    button:hover {
      background: #222;
      color: #ffe600;
    }
    .welcome-options {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      margin-top: 1.5rem;
      width: 100%;
      align-items: center;
    }
    .welcome-options button {
      width: 220px;
      font-size: 1.1rem;
    }
  `]
})
export class WelcomeComponent {
  username: string | null = localStorage.getItem('pokedex_username');
  inputName: string = '';

  constructor(private router: Router) {}

  saveName() {
    if (this.inputName.trim().length > 0) {
      localStorage.setItem('pokedex_username', this.inputName.trim());
      this.username = this.inputName.trim();
    }
  }

  goTo(option: string) {
    if (option === 'regions') {
      this.router.navigate(['/regions']);
    } else {
      // Navegación futura para equipo, mochila, perfil
      alert('Próximamente: ' + option);
    }
  }
} 