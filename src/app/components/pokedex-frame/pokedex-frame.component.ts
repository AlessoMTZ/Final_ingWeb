import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex-frame',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pokedex-frame">
      <div class="pokedex-left">
        <div class="pokedex-foco"></div>
        <div class="pokedex-lights">
          <div class="pokedex-light pokedex-light-red"></div>
          <div class="pokedex-light pokedex-light-yellow"></div>
          <div class="pokedex-light pokedex-light-green"></div>
        </div>
        <div class="pokedex-screen">
          <ng-content></ng-content>
        </div>
        <div class="pokedex-controls">
          <div class="pokedex-dpad"></div>
          <div class="pokedex-btn pokedex-btn-green"></div>
        </div>
      </div>
      <div class="pokedex-bisagra"></div>
      <div class="pokedex-right">
        <div class="pokedex-id-panel" *ngIf="id">
          <span class="pokedex-id">N°{{ id | number:'3.0' }}</span>
        </div>
        <div class="pokedex-buttons-panel">
          <div class="pokedex-btn pokedex-btn-blue" *ngFor="let n of [1,2,3,4,5,6]"></div>
        </div>
        <div class="pokedex-panel-row">
          <div class="pokedex-btn pokedex-btn-black"></div>
          <div class="pokedex-btn pokedex-btn-black"></div>
        </div>
        <div class="pokedex-panel-row">
          <div class="pokedex-btn pokedex-btn-white"></div>
          <div class="pokedex-btn pokedex-btn-white"></div>
          <div class="pokedex-btn pokedex-btn-yellow-round"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pokedex-frame {
      display: flex;
      max-width: 1000px;
      margin: 2rem auto;
      background: none;
      border-radius: 28px;
      box-shadow: 0 0 30px #000a;
      min-height: 540px;
      position: relative;
    }
    .pokedex-left {
      background: var(--pokedex-red);
      border-radius: 28px 0 0 28px;
      flex: 2.2;
      padding: 2.2rem 2rem 2rem 2.7rem;
      border: 8px solid var(--pokedex-red);
      border-right: 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      position: relative;
      box-shadow: 4px 0 12px #0004 inset;
    }
    .pokedex-foco {
      position: absolute;
      top: 18px; left: 18px;
      width: 54px; height: 54px;
      background: #2196f3;
      border-radius: 50%;
      border: 6px solid #fff;
      box-shadow: 0 0 0 6px #1976d2, 0 0 18px #1976d2;
      z-index: 2;
    }
    .pokedex-lights {
      display: flex;
      gap: 0.5rem;
      position: absolute;
      top: 30px; left: 85px;
      z-index: 2;
    }
    .pokedex-light {
      width: 14px; height: 14px;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 1px 4px #0004;
    }
    .pokedex-light-red { background: #e53935; }
    .pokedex-light-yellow { background: #ffe600; }
    .pokedex-light-green { background: #43a047; }
    .pokedex-screen {
      background: var(--pokedex-screen);
      border-radius: 16px;
      border: 6px solid #222;
      margin-top: 80px;
      margin-bottom: 1.5rem;
      min-height: 340px;
      max-height: 420px;
      flex: 1;
      box-shadow: 0 2px 8px #0006 inset;
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .pokedex-controls {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      margin-top: 1.2rem;
      margin-left: 0.5rem;
    }
    .pokedex-dpad {
      width: 38px; height: 38px;
      background: #222;
      border-radius: 8px;
      position: relative;
      box-shadow: 0 2px 8px #0008;
    }
    .pokedex-dpad::before, .pokedex-dpad::after {
      content: '';
      position: absolute;
      background: #222;
      border-radius: 4px;
    }
    .pokedex-dpad::before {
      left: 14px; top: 0;
      width: 10px; height: 38px;
    }
    .pokedex-dpad::after {
      top: 14px; left: 0;
      width: 38px; height: 10px;
    }
    .pokedex-btn-green {
      width: 32px; height: 18px;
      background: #43a047;
      border-radius: 6px;
      border: 2px solid #fff;
      box-shadow: 0 1px 4px #0004;
    }
    .pokedex-bisagra {
      width: 18px;
      background: #b71c1c;
      border-left: 4px solid #a31515;
      border-right: 4px solid #a31515;
      box-shadow: 0 0 8px #0006 inset;
      border-radius: 0 18px 18px 0;
      margin-right: -8px;
      z-index: 3;
    }
    .pokedex-right {
      background: var(--pokedex-red);
      border-radius: 0 28px 28px 0;
      flex: 1.2;
      padding: 2.2rem 1.2rem 2rem 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 8px solid var(--pokedex-red);
      border-left: 0;
      min-width: 180px;
      box-shadow: -4px 0 12px #0004 inset;
      position: relative;
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
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.7rem;
      margin-bottom: 2.2rem;
      justify-content: center;
      width: 100%;
    }
    .pokedex-btn {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px #0006;
      margin: 0 auto;
    }
    .pokedex-btn-blue { background: #2196f3; }
    .pokedex-btn-black { background: #222; border-radius: 6px; width: 48px; height: 18px; }
    .pokedex-btn-white { background: #fff; border-radius: 6px; width: 38px; height: 16px; border: 2px solid #222; }
    .pokedex-btn-yellow-round { background: #ffe600; border-radius: 50%; width: 22px; height: 22px; border: 2px solid #222; }
    .pokedex-panel-row { display: flex; gap: 0.7rem; margin-bottom: 1.1rem; justify-content: center; width: 100%; }
  `]
})
export class PokedexFrameComponent {
  @Input() id?: number;
} 