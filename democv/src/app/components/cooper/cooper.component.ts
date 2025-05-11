import {Component, Output, EventEmitter, WritableSignal} from '@angular/core';
 import {MatButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
 import {MatIcon} from '@angular/material/icon';
 import {FormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ImageCropperComponent} from 'ngx-smart-cropper';
import {NgIf} from '@angular/common';



 @Component({
   selector: 'app-cooper',
   imports: [
     FormsModule,
     MatIcon,
     MatMiniFabButton,
     MatButton,
     ImageCropperComponent,
     NgIf,
   ],
   templateUrl: './cooper.component.html',
   styleUrl: './cooper.component.scss'
 })
 export class CooperComponent {
   imageChangedEvent: Event | null = null;
   croppedImage = '';
   imageSource: string = '';
   transform = { scale: 1 };
   @Output() imageUploaded = new EventEmitter<string>();
   constructor(public dialogRef: MatDialogRef<CooperComponent>) {
     console.log(this.dialogRef);
   }
   fileChangeEvent(event: Event): void {
     this.imageChangedEvent = event;  // Lưu sự kiện thay đổi hình ảnh
   }
    onClose() {
      console.log('Đóng dialog');
      this.dialogRef.close();
    }


   onFileChange(event: Event): void {
     const input = event.target as HTMLInputElement;
     if (input.files && input.files[0]) {
       const reader = new FileReader();
       reader.onload = (e: any) => {
         this.imageSource = e.target.result; // Load the selected image
       };
       reader.readAsDataURL(input.files[0]);
     }
   }

   imageCropped(event: any) {
     this.croppedImage = event;
   }

   uploadImage(): void {
     if (this.croppedImage) {
       this.imageUploaded.emit(this.croppedImage); // Emit cropped image to parent
       this.dialogRef.close();
     }
   }


 }
