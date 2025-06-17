import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {ShareModule} from '../../../shared/shared.module';

@Component({
  selector: 'app-spacing-control',
  imports: [
    NgForOf,
    ShareModule
  ],
  templateUrl: './spacing-control.component.html',
  styleUrl: './spacing-control.component.scss'
})
export class SpacingControlComponent {
  controls = [
    { label: 'Font Size', value: 12, unit: 'pt', min: 6, max: 24, step: 1 },
    { label: 'Line Height', value: 1.45, unit: '', min: 1, max: 2, step: 0.05 },
    { label: 'Left & Right Margin', value: 12, unit: 'mm', min: 0, max: 30, step: 1 },
    { label: 'Top & Bottom Margin', value: 26, unit: 'mm', min: 0, max: 40, step: 1 },
    { label: 'Space between Entries', value: 16, unit: '', min: 0, max: 40, step: 1 },
  ];

  increase(i: number) {
    const c = this.controls[i];
    if (c.value + c.step <= c.max) c.value = parseFloat((c.value + c.step).toFixed(2));
  }

  decrease(i: number) {
    const c = this.controls[i];
    if (c.value - c.step >= c.min) c.value = parseFloat((c.value - c.step).toFixed(2));
  }

  getDisplayValue(ctrl: any): string {
    return ctrl.unit === '' && ctrl.label.includes('Line') ? ctrl.value.toFixed(2) : `${ctrl.value}${ctrl.unit}`;
  }
}
