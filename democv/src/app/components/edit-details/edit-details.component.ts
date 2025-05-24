import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {CooperComponent} from '../cooper/cooper.component';
import {ImageShareService} from '../../services/image-share/image-share.service';

@Component({
  selector: 'app-edit-details',
  imports: [
    NgIf
  ],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.scss'
})
export class EditDetailsComponent {
  croppedImage: string | null = null;
  @Output() back = new EventEmitter<void>();

  onSave() {
    console.log('💾 Save - croppedImage:', this.croppedImage); // Thêm log này

    if (this.croppedImage) {
      this.imageShareService.updateCroppedImage(this.croppedImage); // 🔁 Gửi ảnh
    } else {
      console.warn('⚠️ Không có ảnh để gửi về input');
    }

    // this.back.emit(); // quay lại inputcontent
  }




  onCancel() {
    this.back.emit();
  }

constructor(private dialog: MatDialog, private imageShareService: ImageShareService) {
}

  openCooperDialog(): void {
    const dialogRef = this.dialog.open(CooperComponent, {
      width: '840px',
      minWidth: '650px',
    });
    dialogRef.componentInstance.imageUploaded.subscribe((img: string) => {
      this.croppedImage = img;
      this.imageShareService.updateCroppedImage(img); // ✅ Cập nhật ngay
    });

  }
}
