import {AfterViewInit, Component, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {ContentDialogComponent} from '../content-dialog/content-dialog.component';
import {ShareModule} from '../../../shared/shared.module';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AddContentState} from '../../ngrx/add-content/add-content.state';
import  * as AddContentActions from '../../ngrx/add-content/add-content.action';
import {Observable, Subscription} from 'rxjs';
import {AddContentModel} from '../../models/add-content.model';
import {ImageShareService} from '../../services/image-share/image-share.service';
import {UserDataService} from '../../services/user-data/user-data.service';
import {PersonalInfo} from '../../models/personal-info';
import {MatMiniFabButton} from '@angular/material/button';

@Component({
  selector: 'app-inputcontent',

  imports: [
    ShareModule,
    MatIcon,
    MatMiniFabButton,

  ],
  templateUrl: './inputcontent.component.html',
  styleUrl: './inputcontent.component.scss'
})
export class InputcontentComponent implements  OnInit, AfterViewInit{
  @Output() switchToEdit = new EventEmitter<void>();
  resumeTitle: string = 'Resume 1';
  croppedImage: string | null = null;
  subscription: Subscription[] = []
  contentList$ !: Observable<AddContentModel[]>;
  data$: Observable<PersonalInfo> | undefined;
  constructor(private dialog: MatDialog, private store: Store<{
    addContent: AddContentState
  }>, private imageShareService: ImageShareService, userData: UserDataService) {

     this.contentList$ = this.store.select('addContent','addContent')
    this.store.dispatch(AddContentActions.loadAddContents());

    this.imageShareService.croppedImage$.subscribe((img) => {
      if (img) this.croppedImage = img;
    });
    this.data$ = userData.personalInfo$;

  }
  onClick() {
    this.switchToEdit.emit();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const current = this.imageShareService['croppedImageSource'].getValue();
      // console.log('🔥 ngAfterViewInit - ảnh hiện tại:', current);
      if (current?.startsWith('data:image')) {
        this.croppedImage = current;
      }
    });
  }
  ngOnInit() {
    this.subscription.push(
      this.contentList$.subscribe((contentList) => {
        if(contentList.length > 0){
          // console.log('Content List:', contentList);
        }
      })
    )

    this.imageShareService.croppedImage$.subscribe((img) => {
      if (img?.startsWith('data:image')) {
        this.croppedImage = img;
      }
    });
  }





  @ViewChild(ContentDialogComponent) contentDialog!: ContentDialogComponent;


  openDialogConten() {
const dialogRef = this.dialog.open(ContentDialogComponent, {
  width: '840px',
  minWidth: '1000px',
});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resumeTitle = result.title;

      }
});
  }
}
