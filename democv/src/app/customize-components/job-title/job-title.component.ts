import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';
import { updateStyle } from '../../ngrx/style/style.actions';
import { StyleService } from '../../services/style/style.service';
import { StyleConfig } from '../../models/style-setting.model';

@Component({
  selector: 'app-job-title',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './job-title.component.html',
  styleUrl: './job-title.component.scss'
})
export class JobTitleComponent {
  @Input() set resumeId(value: string) {
    if (value) {
      this.resumeIdValue = value;
      this.isReady = true;
      console.log('[JobTitle] resumeId set:', value);

      // Gọi API lấy style
      this.styleService.loadStyle(this.resumeIdValue).subscribe({
        next: ({ style }) => this.applyStyle(style),
        error: (err) => {
          if (err.status === 404) {
            console.warn('[JobTitle] No style found. Creating default style...');
            this.styleService.saveStyle(this.resumeIdValue, {}).subscribe({
              next: () => console.log('[JobTitle] Default style created'),
              error: e => console.error('[JobTitle] Failed to create default:', e.message)
            });
          } else {
            console.error('[JobTitle] Load style failed:', err.message);
          }
        }
      });
    }
  }

  private resumeIdValue!: string;
  private isReady = false;

  @Output() sizeChange = new EventEmitter<string>();
  @Output() positionChange = new EventEmitter<string>();
  @Output() fontStyleChange = new EventEmitter<string>();

  constructor(private store: Store, private styleService: StyleService) {}

  sizes = ['S', 'M', 'L'];
  selectedSize = 'M';

  positions = ['Try Same Line', 'Below'];
  selectedPosition = 'Below';

  styles = ['Normal', 'Italic'];
  selectedStyle = 'Normal';

  applyStyle(style: StyleConfig) {
    this.selectedSize = style.jobTitleSize || 'M';
    this.selectedPosition = style.jobTitlePosition === 'inline' ? 'Try Same Line' : 'Below';
    this.selectedStyle = style.jobTitleStyle === 'italic' ? 'Italic' : 'Normal';
    console.log('[JobTitle] Style applied:', style);
  }

  selectSize(size: string) {
    this.selectedSize = size;
    if (!this.isReady) return;

    const value = size as 'S' | 'M' | 'L';
    this.store.dispatch(updateStyle({
      resumeId: this.resumeIdValue,
      patch: { jobTitleSize: value }
    }));
    this.sizeChange.emit(value);
    console.log('[JobTitle] Saved size:', value);
  }

  selectPosition(label: string) {
    this.selectedPosition = label;
    if (!this.isReady) return;

    const value = label === 'Try Same Line' ? 'inline' : 'below';
    this.store.dispatch(updateStyle({
      resumeId: this.resumeIdValue,
      patch: { jobTitlePosition: value }
    }));
    this.positionChange.emit(value);
    console.log('[JobTitle] Saved position:', value);
  }

  selectStyle(style: string) {
    this.selectedStyle = style;
    if (!this.isReady) return;

    const value = style.toLowerCase() as 'normal' | 'italic';
    this.store.dispatch(updateStyle({
      resumeId: this.resumeIdValue,
      patch: { jobTitleStyle: value }
    }));
    this.fontStyleChange.emit(value);
    console.log('[JobTitle] Saved fontStyle:', value);
  }
}
