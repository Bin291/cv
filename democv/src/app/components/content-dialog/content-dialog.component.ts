import { Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {ShareModule} from '../../../shared/shared.module';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-content-dialog',
  imports: [
    ShareModule,
  ],
  templateUrl: './content-dialog.component.html',
  styleUrl: './content-dialog.component.scss'
})
export class ContentDialogComponent{
  isVisible = false;  // Dialog initially hidden
  @Output() saveEvent = new EventEmitter<void>();
  openDialog() {
    this.isVisible = true;
  }
  closeDialog() {
    this.isVisible = false;
  }
  saveContent() {
    this.saveEvent.emit();
    this.closeDialog();
  }
}
