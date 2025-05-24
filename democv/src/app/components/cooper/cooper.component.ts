import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input, OnInit
} from '@angular/core';
 import {MatButton} from '@angular/material/button';
 import {MatIcon} from '@angular/material/icon';
 import {FormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ImageCropperComponent} from 'ngx-smart-cropper';
import {NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';



 @Component({
   selector: 'app-cooper',
   imports: [
     FormsModule,
     MatIcon,
     MatButton,
     ImageCropperComponent,
     NgIf,
   ],
   templateUrl: './cooper.component.html',
   styleUrl: './cooper.component.scss',
   encapsulation: ViewEncapsulation.None
 })
 export class CooperComponent implements AfterViewInit, OnInit{
   croppedImage = '';
   imageSource: string = '';
   transform = { scale: 1 };
   @Output() imageUploaded = new EventEmitter<string>();
   @ViewChild('cropper2', { read: ElementRef }) cropperEl!: ElementRef;
   @Input('cropBgSize') size!: string;

   constructor(public dialogRef: MatDialogRef<CooperComponent>,private el: ElementRef, private snackBar: MatSnackBar) {
     console.log(this.dialogRef);
   }
    onClose() {
      console.log('Đóng dialog');
      this.dialogRef.close();
    }
   ngAfterViewInit() {
     // Tìm thẻ .background bên trong component của thư viện
     const bg = this.el.nativeElement.querySelector('.cropper-container .background') as HTMLElement;
     if (bg) {
       bg.style.backgroundSize = this.size;
     }
   }
ngOnInit() {
  console.log('imageSource:', this.imageSource);
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
     console.log('Crop event:', event);
     if (event && typeof event === 'string' && event.startsWith('data:image')) {
       this.croppedImage = event;
       this.snackBar.open('Image cropped successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',

       })
     } else {
       this.snackBar.open('Please crop the image before uploading', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
       })
     }
   }

   uploadImage(): void {
     console.log('Upload triggered, current image:', this.croppedImage);
     if (this.croppedImage && this.croppedImage.startsWith('data:image')) {
       this.imageUploaded.emit(this.croppedImage);
       this.dialogRef.close();
       this.snackBar.open('Image uploaded successfully', 'Close', {
         duration: 3000,
         horizontalPosition: 'right',
         verticalPosition: 'top',
       });
     } else {
       this.snackBar.open('Please crop the image before uploading', 'Close', {
         duration: 3000,
         horizontalPosition: 'right',
         verticalPosition: 'top',
       });
     }
   }

   zoomIn(): void {
     this.transform.scale += 0.1;
   }

   zoomOut(): void {
     if (this.transform.scale > 0.1) {
       this.transform.scale -= 0.1;
     }
   }

 }
