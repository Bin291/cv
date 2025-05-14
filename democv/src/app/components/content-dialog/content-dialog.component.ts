import { Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {ShareModule} from '../../../shared/shared.module';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {ContentOptionAddComponent} from '../content-option-add/content-option-add.component';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-content-dialog',
  imports: [
    ShareModule,
    MatIcon,
    MatIconButton,
    ContentOptionAddComponent,
    MatButton,
    MatFabButton,
  ],
  templateUrl: './content-dialog.component.html',
  styleUrl: './content-dialog.component.scss'
})
export class ContentDialogComponent{
  constructor(private dialogRef: MatDialogRef<ContentDialogComponent>) {
  }

  @Output() saveEvent = new EventEmitter<void>();


  protected readonly onclose = onclose;

  onSave() {
    this.saveEvent.emit()
    this.dialogRef.close();
  }
  onClose() {
    this.dialogRef.close();
  }
}
