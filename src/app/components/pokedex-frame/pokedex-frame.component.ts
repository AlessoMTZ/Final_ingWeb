import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex-frame',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pokedex-outer">
      <div class="pokedex-inner">
        <div class="pokedex-top-row">
          <div class="pokedex-blue-circle"></div>
          <div class="pokedex-lights">
            <div class="pokedex-light pokedex-light-green"></div>
            <div class="pokedex-light pokedex-light-yellow"></div>
            <div class="pokedex-light pokedex-light-red"></div>
          </div>
        </div>
        <div class="pokedex-svg-lines">
          <svg width="540" height="36" viewBox="0 0 540 36">
            <polyline points="0,26 120,26 180,10 540,10" stroke="#222" stroke-width="4" fill="none" />
            <polyline points="0,34 120,34 180,18 540,18" stroke="#222" stroke-width="4" fill="none" />
          </svg>
        </div>
        <div class="pokedex-screen-frame">
          <div class="pokedex-screen-header">
            <div class="pokedex-dot pokedex-dot-red"></div>
            <div class="pokedex-dot pokedex-dot-gray"></div>
            <div class="pokedex-dot pokedex-dot-gray"></div>
          </div>
          <div class="pokedex-screen">
            <ng-content></ng-content>
          </div>
          <div class="pokedex-screen-footer">
            <div class="pokedex-btn pokedex-btn-red"></div>
            <div class="pokedex-speaker">
              <div class="pokedex-speaker-line"></div>
              <div class="pokedex-speaker-line"></div>
              <div class="pokedex-speaker-line"></div>
            </div>
          </div>
        </div>
        <div class="pokedex-bar-btns-row">
          <div class="pokedex-bar-btn pokedex-bar-btn-red"></div>
          <div class="pokedex-bar-btn pokedex-bar-btn-blue"></div>
        </div>
        <div class="pokedex-green-screen"></div>
        <div class="pokedex-bottom-controls">
          <div class="pokedex-btn pokedex-btn-black" (click)="volverClick()" title="Volver"></div>
          <div class="pokedex-dpad">
            <div class="dpad-center"></div>
            <div class="dpad-vertical"></div>
            <div class="dpad-horizontal"></div>
            <div class="dpad-btn dpad-up"></div>
            <div class="dpad-btn dpad-down"></div>
            <div class="dpad-btn dpad-left"></div>
            <div class="dpad-btn dpad-right"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pokedex-outer {
      background: #e3350d;
      border-radius: 28px;
      box-shadow: 0 0 30px #000a;
      width: 600px;
      min-height: 900px;
      max-width: 600px;
      max-height: 900px;
      margin: 2rem auto;
      padding: 32px 24px 32px 24px;
      border: 6px solid #222;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .pokedex-inner {
      background: #e3350d;
      border-radius: 24px;
      padding: 0 0 24px 0;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 2px 8px #0004 inset;
      width: 100%;
      height: 100%;
      min-height: 0;
      min-width: 0;
    }
    .pokedex-top-row {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      position: relative;
    }
    .pokedex-blue-circle {
      width: 80px;
      height: 80px;
      background: #2196f3;
      border-radius: 50%;
      border: 8px solid #fff;
      box-shadow: 0 0 0 8px #1976d2, 0 0 24px #1976d2;
      margin-left: 10px;
    }
    .pokedex-lights {
      display: flex;
      gap: 16px;
      margin-left: 32px;
    }
    .pokedex-light {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px #0004;
    }
    .pokedex-light-green { background: #43a047; }
    .pokedex-light-yellow { background: #ffe600; }
    .pokedex-light-red { background: #e53935; }
    .pokedex-svg-lines {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 8px;
      margin-left: 0;
      margin-top: -8px;
    }
    .pokedex-svg-lines svg {
      display: block;
      width: 100%;
      height: 36px;
    }
    .pokedex-screen-frame {
      background: #f4f4f4;
      border-radius: 16px;
      border: 6px solid #bdbdbd;
      margin: 0 auto 32px auto;
      width: 95%;
      max-width: 480px;
      min-width: 480px;
      height: 520px;
      max-height: 520px;
      min-height: 520px;
      box-shadow: 0 4px 16px #0002 inset;
      padding: 0 0 16px 0;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .pokedex-screen-header {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-top: 12px;
      margin-bottom: 4px;
    }
    .pokedex-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2.5px solid #bdbdbd;
    }
    .pokedex-dot-red { background: #e53935; }
    .pokedex-dot-gray { background: #bdbdbd; }
    .pokedex-screen {
      background: #888;
      border: 4px solid #222;
      border-radius: 8px;
      min-height: 320px;
      max-height: 420px;
      height: 370px;
      margin: 0 24px;
      margin-bottom: 16px;
      box-shadow: 0 4px 16px #0006 inset;
      padding: 2.4rem 2rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      z-index: 1;
      justify-content: flex-start;
    }
    .pokedex-screen-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 28px 0 28px;
    }
    .pokedex-btn {
      display: inline-block;
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px #0004;
    }
    .pokedex-btn-red {
      width: 28px;
      height: 28px;
      background: #e53935;
      border: 3px solid #bdbdbd;
    }
    .pokedex-speaker {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-left: 16px;
    }
    .pokedex-speaker-line {
      width: 32px;
      height: 4px;
      background: #222;
      border-radius: 4px;
    }
    .pokedex-bar-btns-row {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 18px;
      margin-top: 0px;
      margin-bottom: 2px;
    }
    .pokedex-bar-btn {
      width: 48px;
      height: 10px;
      border-radius: 5px;
      border: 2px solid #222;
    }
    .pokedex-bar-btn-red {
      background: #e53935;
    }
    .pokedex-bar-btn-blue {
      background: #2196f3;
    }
    .pokedex-green-screen {
      width: 220px;
      height: 64px;
      background: #43a047;
      border-radius: 9px;
      border: 3px solid #fff;
      margin: 38px auto 0 auto;
      display: block;
      box-shadow: 0 2px 8px #0003 inset;
    }
    .pokedex-bottom-controls {
      width: 95%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 18px;
      margin-bottom: 4px;
      min-width: 0;
    }
    .pokedex-dpad {
      width: 80px;
      height: 80px;
      position: relative;
      margin-right: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dpad-center {
      position: absolute;
      left: 34px;
      top: 34px;
      width: 12px;
      height: 12px;
      background: #444;
      border-radius: 50%;
      z-index: 2;
      border: 2px solid #222;
    }
    .dpad-vertical {
      position: absolute;
      left: 36px;
      top: 8px;
      width: 8px;
      height: 64px;
      background: #222;
      border-radius: 5px;
      z-index: 1;
    }
    .dpad-horizontal {
      position: absolute;
      top: 36px;
      left: 8px;
      width: 64px;
      height: 8px;
      background: #222;
      border-radius: 5px;
      z-index: 1;
    }
    .dpad-btn {
      position: absolute;
      width: 18px;
      height: 18px;
      background: #444;
      border-radius: 5px;
      border: 2px solid #222;
      z-index: 3;
    }
    .dpad-up { left: 31px; top: 0; }
    .dpad-down { left: 31px; top: 62px; }
    .dpad-left { left: 0; top: 31px; }
    .dpad-right { left: 62px; top: 31px; }
    .pokedex-btn-black {
      width: 32px;
      height: 32px;
      background: #222;
      border: 3px solid #fff;
      border-radius: 50%;
      margin-left: 4px;
      cursor: pointer;
      transition: box-shadow 0.2s;
    }
    .pokedex-btn-black:hover {
      box-shadow: 0 0 0 4px #e53935, 0 2px 8px #0004;
    }
  `]
})
export class PokedexFrameComponent {
  @Input() id?: number;
  @Output() volver = new EventEmitter<void>();
  volverClick() {
    this.volver.emit();
  }
} 