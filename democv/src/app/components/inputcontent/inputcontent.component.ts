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
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {ResumeState} from '../../ngrx/resume/resume.state';
import {ResumeContent, ResumeModel} from '../../models/resume.model';
import {loadResume} from '../../ngrx/resume/resume.action';
import {LetDirective} from '@ngrx/component';
import {MatCardSubtitle} from '@angular/material/card';
import {ContentInfoAddedComponent} from '../content-info-added/content-info-added.component';
import {AddContentService} from '../../services/add-content/add-content.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import * as ResumeActions from  '../../ngrx/resume/resume.action';
import {take} from 'rxjs/operators';
import {ResumeService} from '../../services/resume/resume.service';
@Component({
  selector: 'app-inputcontent',

  imports: [
    ShareModule,
    MatMiniFabButton,
    MatIcon,
    LetDirective,
    MatCardSubtitle,
    ContentInfoAddedComponent,
    MatButton,

  ],
  templateUrl: './inputcontent.component.html',
  styleUrl: './inputcontent.component.scss'
})
export class InputcontentComponent implements  OnInit, AfterViewInit{
  @Input() resume$!: Observable<ResumeModel | null>;
  showEdit : boolean = false;

  @Output() switchToEdit = new EventEmitter<void>();
  @Input() showInfoAdded: boolean = false;
  croppedImage: string | null = null;
  @Output() editContent = new EventEmitter<{ content: string; data: any }>();
  subscription: Subscription[] = []
  contentList$ !: Observable<AddContentModel[]>;
  resumeData!: ResumeModel | null;
  savedContents: { content: string; data: any }[] = [];
  constructor(private dialog: MatDialog, private store: Store<{
                addContent: AddContentState,
                resume:ResumeState
              }>, private imageShareService: ImageShareService,
              private addContentService: AddContentService,
              private resumeService: ResumeService
  ) {

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
  onEdit() {
    this.showEdit = !this.showEdit;
    if (this.showEdit) {
      this.switchToEdit.emit();
    }
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
    this.savedContents = this.addContentService.getSavedContents();
    this.resume$.subscribe((resume) => {
      this.savedContents = resume?.contents || [];
    });


  }

  onUpdateContent(updated: ResumeContent): void {
    this.store.select('resume').pipe(take(1)).subscribe((resumeState) => {
      const resume = resumeState.resume;
      if (!resume) return;

      const updatedContents = resume.contents
        .map(c => c.content === updated.content ? updated : c)
        .filter(c => c.data.length > 0); // ❗ Bỏ block nếu rỗng

      this.resumeService.updateResume(resume.id!, {
        contents: updatedContents
      }).subscribe(() => {
        this.store.dispatch(ResumeActions.updateResumeInStore({
          data: {
            ...resume,
            contents: updatedContents
          }
        }));
      });
    });
  }



  @ViewChild(ContentDialogComponent) contentDialog!: ContentDialogComponent;


  openDialogContent() {
    const dialogRef = this.dialog.open(ContentDialogComponent, {
      width: '840px',
      minWidth: '1000px',
    });
    dialogRef.componentInstance.contentSelected = new EventEmitter<string>();
    dialogRef.componentInstance.contentSelected.subscribe((selectedName) => {
      this.addContentService.selectContent(selectedName);  // Lưu tên content đã chọn
    });
  }
  onEditItem(event: { content: string; data: any }) {
    this.editContent.emit(event);
  }


}
