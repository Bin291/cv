import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {ShareModule} from '../../../shared/shared.module';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-link-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    ShareModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './link-dialog.component.html',
  styleUrl: './link-dialog.component.scss'
})
export class LinkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { label: string; name: string; value: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(); // Đóng dialog mà không trả về dữ liệu
  }

  onAdd(): void {
    if (this.data.value) {
      this.dialogRef.close(this.data.value); // Trả về value (URL) khi nhấn Add
    }
  }
}
