import {AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
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
import {MatMiniFabButton} from '@angular/material/button';
import {ResumeState} from '../../ngrx/resume/resume.state';
import {ResumeModel} from '../../models/resume.model';
import {loadResume} from '../../ngrx/resume/resume.action';
import {LetDirective} from '@ngrx/component';

@Component({
  selector: 'app-inputcontent',

  imports: [
    ShareModule,
    MatMiniFabButton,
    MatIcon,
    LetDirective,

  ],
  templateUrl: './inputcontent.component.html',
  styleUrl: './inputcontent.component.scss'
})
export class InputcontentComponent implements  OnInit, AfterViewInit{
  @Input() resume$!: Observable<ResumeModel | null>;

  @Output() switchToEdit = new EventEmitter<void>();
  resumeTitle: string = 'Resume 1';
  croppedImage: string | null = null;
  subscription: Subscription[] = []
  contentList$ !: Observable<AddContentModel[]>;
  resumeData!: ResumeModel | null;

  constructor(private dialog: MatDialog, private store: Store<{
    addContent: AddContentState,
    resume:ResumeState
  }>, private imageShareService: ImageShareService,) {

     this.contentList$ = this.store.select('addContent','addContent')
    this.store.dispatch(AddContentActions.loadAddContents());

    this.imageShareService.croppedImage$.subscribe((img) => {
      if (img) this.croppedImage = img;
    });

    this.resume$ = this.store.select(state => state.resume.resume);



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
    );

    this.imageShareService.croppedImage$.subscribe((img) => {
      if (img?.startsWith('data:image')) {
        this.croppedImage = img;
      }
    });
    this.subscription.push(
      this.store.select(state => state.resume.resume).subscribe((resume) => {
        this.resumeData = resume;
      })
    );

    let id: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      id = window.localStorage.getItem('resume_id');
    }
    if (id) {
      this.store.dispatch(loadResume({ id }));
    }

    this.resume$ = this.store.select(state => state.resume.resume);
  }





  @ViewChild(ContentDialogComponent) contentDialog!: ContentDialogComponent;


  openDialogContent() {
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
