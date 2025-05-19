import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ContentDialogComponent} from '../content-dialog/content-dialog.component';
import {ShareModule} from '../../../shared/shared.module';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {CooperComponent} from '../cooper/cooper.component';
import {Store} from '@ngrx/store';
import {AddContentState} from '../../ngrx/add-content/add-content.state';
import  * as AddContentActions from '../../ngrx/add-content/add-content.action';
import {Observable, Subscription} from 'rxjs';
import {AddContentModel} from '../../models/add-content.model';

@Component({
  selector: 'app-inputcontent',

  imports: [
    ShareModule,
    MatIcon,
    FormCvComponent,

  ],
  templateUrl: './inputcontent.component.html',
  styleUrl: './inputcontent.component.scss'
})
export class InputcontentComponent implements  OnInit{

  subscription: Subscription[] = []
  contentList$ !: Observable<AddContentModel[]>;
  constructor(private dialog: MatDialog, private store: Store<{
    addContent: AddContentState
  }>) {

     this.contentList$ = this.store.select('addContent','addContent')
    this.store.dispatch(AddContentActions.loadAddContents());

  }

  ngOnInit() {
    this.subscription.push(
      this.contentList$.subscribe((contentList) => {
        if(contentList.length > 0){
          // console.log('Content List:', contentList);
        }
      })
    )
  }

  resumeTitle: string = 'Resume 1';
  isEditing: boolean = false;
  croppedImage: string | null = null;


  personalInfo = {
    email: 'example@email.com',
    phone: '123-456-7890',
    address: 'City, Country',
  };

  @ViewChild(ContentDialogComponent) contentDialog!: ContentDialogComponent;


  openDialogConten() {
const dialogRef = this.dialog.open(ContentDialogComponent, {
  width: '840px',
  minWidth: '1000px',
});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resumeTitle = result.title;
        this.personalInfo = result.personalInfo;
      }
})
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
      width: '840px',
      minWidth: '650px',

    });
    dialogRef.componentInstance.imageUploaded
      .subscribe((img: string) => this.croppedImage = img);
  }





}
