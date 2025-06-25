import { Component, EventEmitter, Output } from '@angular/core';
import {ShareModule} from '../../../shared/shared.module';

@Component({
  selector: 'app-spacing-control',
  templateUrl: './spacing-control.component.html',
  imports: [
    ShareModule
  ],
  styleUrls: ['./spacing-control.component.scss']
})
export class SpacingControlComponent {
  @Output() spacingChange = new EventEmitter<{ key: string; value: number }>();

  controls = [
    { key: 'fontSize', label: 'Font Size', value: 12, min: 8, max: 24, step: 1 },
    { key: 'lineHeight', label: 'Line Height', value: 1.5, min: 1, max: 3, step: 0.1 },
    { key: 'marginX', label: 'Left/Right Margin', value: 12, min: 0, max: 50, step: 1 },
    { key: 'marginY', label: 'Top/Bottom Margin', value: 20, min: 0, max: 50, step: 1 },
    { key: 'spacingBetween', label: 'Spacing Between Entries', value: 16, min: 0, max: 64, step: 1 }
  ];

  getDisplayValue(ctrl: any): string {
    switch (ctrl.key) {
      case 'fontSize': return `${ctrl.value}pt`;
      case 'lineHeight': return ctrl.value.toFixed(1);
      case 'marginX':
      case 'marginY': return `${ctrl.value}mm`;
      case 'spacingBetween': return `${ctrl.value}px`;
      default: return `${ctrl.value}`;
    }
  }

  increase(i: number) {
    const ctrl = this.controls[i];
    ctrl.value = Math.min(ctrl.value + ctrl.step, ctrl.max);
    this.emitChange(ctrl);
  }

  decrease(i: number) {
    const ctrl = this.controls[i];
    ctrl.value = Math.max(ctrl.value - ctrl.step, ctrl.min);
    this.emitChange(ctrl);
  }

  emitChange(ctrl: any) {
    this.spacingChange.emit({ key: ctrl.key, value: ctrl.value });
  }
}
