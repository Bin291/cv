import {Component, OnInit, ViewChild} from '@angular/core';
import {ContentDialogComponent} from '../content-dialog/content-dialog.component';
import {ShareModule} from '../../../shared/shared.module';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {CooperComponent} from '../cooper/cooper.component';
@Component({
  selector: 'app-inputcontent',

  imports: [
    ShareModule,
    MatIcon,
    ContentDialogComponent,

  ],
  templateUrl: './inputcontent.component.html',
  styleUrl: './inputcontent.component.scss'
})
export class InputcontentComponent{
  resumeTitle: string = 'Resume 1';
  isEditing: boolean = false;
  croppedImage: string | null = null;

  personalInfo = {
    email: 'example@email.com',
    phone: '123-456-7890',
    address: 'City, Country',
  };

  @ViewChild(ContentDialogComponent) contentDialog!: ContentDialogComponent;
  constructor(private dialog: MatDialog) {}
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

  openCooperDialog(): void {
    const dialogRef = this.dialog.open(CooperComponent, {
      width: '600px'
    });
    dialogRef.componentInstance.imageUploaded
      .subscribe((img: string) => this.croppedImage = img);
  }





}
