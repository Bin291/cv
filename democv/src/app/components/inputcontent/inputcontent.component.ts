import {Component, OnInit, ViewChild} from '@angular/core';
import {ContentDialogComponent} from '../content-dialog/content-dialog.component';
import {ShareModule} from '../../../shared/shared.module';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-inputcontent',

  imports: [
    ShareModule,
    MatIcon,
    ContentDialogComponent
  ],
  templateUrl: './inputcontent.component.html',
  styleUrl: './inputcontent.component.scss'
})
export class InputcontentComponent{
  resumeTitle: string = 'Resume 1';
  isEditing: boolean = false;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  isHovered: boolean = false;
  personalInfo = {
    email: 'example@email.com',
    phone: '123-456-7890',
    address: 'City, Country',
  };

  @ViewChild(ContentDialogComponent) contentDialog!: ContentDialogComponent;
  constructor(private dialog: MatDialog) {}
  // Method to open the dialog
  openDialog() {
    this.contentDialog.openDialog();
  }
  onSave() {
    console.log('Content saved!');
  }
  editTitle() {
    this.isEditing = true;
  }
  saveTitle() {
    this.isEditing = false;
  }
  cancelEdit() {
    this.isEditing = false;
    this.resumeTitle = 'Resume 1';
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (validImageTypes.includes(fileType)) {
        this.selectedFile = file;
        this.previewImage(file);
        console.log('File selected:', this.selectedFile?.name);
      } else {
        alert('Please upload a valid image file (JPEG, PNG, GIF).');
        event.target.value = '';  // Reset the file input if invalid
      }
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }



}
