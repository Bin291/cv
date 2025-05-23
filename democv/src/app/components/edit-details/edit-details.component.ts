import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {CooperComponent} from '../cooper/cooper.component';

@Component({
  selector: 'app-edit-details',
  imports: [
    NgIf
  ],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.scss'
})
export class EditDetailsComponent {
  @Output() back = new EventEmitter<void>();

  onSave() {
    this.back.emit();
  }

  onCancel() {
    this.back.emit();
  }
  croppedImage: string | null = null;
constructor(private dialog: MatDialog) {
}

  openCooperDialog(): void {
    const dialogRef = this.dialog.open(CooperComponent, {
      width: '550px', // hoặc nhỏ hơn nếu cần
      maxHeight: '750px',
      panelClass: 'custom-dialog'
    });
    dialogRef.componentInstance.imageUploaded
      .subscribe((img: string) => this.croppedImage = img);
  }
}
