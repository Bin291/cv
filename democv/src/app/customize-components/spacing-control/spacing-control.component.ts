import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShareModule} from '../../../shared/shared.module';
import {StyleService} from '../../services/style/style.service';

@Component({
  selector: 'app-spacing-control',
  templateUrl: './spacing-control.component.html',
  imports: [
    ShareModule
  ],
  styleUrls: ['./spacing-control.component.scss']
})
export class SpacingControlComponent implements OnInit{
  @Output() spacingChange = new EventEmitter<{ key: string; value: number }>();
  @Input() resumeId!: string;


  constructor(private styleService: StyleService) {}

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

  ngOnInit() {
    if (!this.resumeId) return;

    this.styleService.loadStyle(this.resumeId).subscribe({
      next: ({ style }) => {
        this.updateControlValues(style);
      },
      error: err => {
        console.warn('[SpacingControl] Không load được style spacing', err.message);
      }
    });
  }
  private updateControlValues(style: any) {
    this.controls.forEach(ctrl => {
      switch (ctrl.key) {
        case 'fontSize':
          ctrl.value = style.fontSize ? parseInt(style.fontSize) : ctrl.value;
          break;
        case 'lineHeight':
          ctrl.value = style.lineHeight ?? ctrl.value;
          break;
        case 'marginX':
          ctrl.value = style.marginLeftRight ? parseInt(style.marginLeftRight) : ctrl.value;
          break;
        case 'marginY':
          ctrl.value = style.marginTopBottom ? parseInt(style.marginTopBottom) : ctrl.value;
          break;
        case 'spacingBetween':
          ctrl.value = style.entrySpacing ? parseInt(style.entrySpacing) : ctrl.value;
          break;
      }
    });
  }
  emitChange(ctrl: any) {
    const patch: any = {};

    switch (ctrl.key) {
      case 'fontSize': patch.fontSize = ctrl.value.toString(); break;
      case 'lineHeight': patch.lineHeight = ctrl.value; break;
      case 'marginX': patch.marginLeftRight = ctrl.value.toString(); break;
      case 'marginY': patch.marginTopBottom = ctrl.value.toString(); break;
      case 'spacingBetween': patch.entrySpacing = ctrl.value.toString(); break;
    }

    // Gửi lên component cha
    this.spacingChange.emit({ key: ctrl.key, value: ctrl.value });

    // Lưu lên Supabase và phát lại style mới
    if (this.resumeId) {
      this.styleService.saveStyle(this.resumeId, patch).subscribe({
        next: () => this.styleService.emitLocalStyle(patch),
        error: err => console.error('[SpacingControl] ❌ Failed to save spacing', err)
      });
    }
  }

}
