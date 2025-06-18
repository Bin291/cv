import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {InputcontentComponent} from '../../components/inputcontent/inputcontent.component';
import { EditDetailsComponent } from "../../components/edit-details/edit-details.component";
import {AsyncPipe, NgIf} from '@angular/common';
import {DownloadBoxComponent} from '../../components/download-box/download-box.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ContentFormComponent} from '../../components/content-form/content-form.component';
import {Observable} from 'rxjs';
import {ContentItem, ResumeContent, ResumeModel} from '../../models/resume.model';
import {Store} from '@ngrx/store';
import {ResumeState} from '../../ngrx/resume/resume.state';
import {loadResume} from '../../ngrx/resume/resume.action';
import {LetDirective} from '@ngrx/component';
import {ContentFormSmallComponent} from '../../components/content-form-small/content-form-small.component';
import {AddContentService} from '../../services/add-content/add-content.service';
import {ResumeService} from '../../services/resume/resume.service';
import {take} from 'rxjs/operators';
import * as ResumeActions from '../../ngrx/resume/resume.action';


@Component({
  selector: 'app-content',
  imports: [
    InputcontentComponent,
    EditDetailsComponent,
    NgIf,
    DownloadBoxComponent,
    MatProgressSpinner,
    LetDirective,
    ContentFormComponent,
    ContentFormSmallComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit{
  @Input() resume$!: Observable<ResumeModel | null>;
  @Input() showInfoAdded: boolean = false;
  savedContentData: { content: string; data: any }[] = [];
  @ViewChild(ContentFormComponent)
  formComponentRef?: ContentFormComponent;
  @Output() editItem = new EventEmitter<{ content: string; data: any }>();
  @ViewChild(ContentFormSmallComponent)
  formSmallComponentRef?: ContentFormSmallComponent;
  selectedContent: string | null = null;
  selectContent(contentName: string) {
    this.selectedContent = contentName;
  }

  isLargeForm(name: string): boolean {
    return ['Education', 'Professional Experience', 'Projects', 'Organisations'].includes(name);
  }

  constructor(private store: Store<{
    resume: ResumeState
  }>, private addContentService: AddContentService, private resumeService: ResumeService) {
    this.resume$ = this.store.select(state => state.resume.resume);
    this.resume$.subscribe(data => {
      console.log('resume$', data);
    });

  }



  ngOnInit() {
    this.addContentService.selectedContent$.subscribe(content => {
      this.selectedContent = content;
      this.showEdit = false;
    });
  }

  backToMainContent() {
    this.selectedContent = null;
  }

  showEdit = false;
  isLoading = false;
  switchToEdit() {
    this.isLoading = true;
    setTimeout(() => {
      this.showEdit = true;
      this.isLoading = false;
    }, 500); // giả lập thời gian loading
  }

  backToInput(saved: boolean = false) {
    this.isLoading = true;

    if (saved && this.selectedContent) {
      const formData = this.getFormDataFromCurrentForm(); // gọi từ FormComponent
      this.addContentService.saveContent(this.selectedContent, {
        ...formData,
        contentName: this.selectedContent
      });
    }

    this.selectedContent = null;
    this.showEdit = false;

    setTimeout(() => {
      const id = localStorage.getItem('resume_id');
      if (id) {
        this.store.dispatch(loadResume({ id }));
      }
      this.isLoading = false;
    }, 300);
  }

// 🚨 HÀM GIẢM SÁT FORM
  getFormDataFromCurrentForm(): any {
    return (
      this.formComponentRef?.getData?.() ||
      this.formSmallComponentRef?.getData?.() ||
      {}
    );
  }

  editFromItem(event: { content: string; data: any }) {
    this.selectedContent = event.content;

    setTimeout(() => {
      if (this.isLargeForm(event.content)) {
        this.formComponentRef?.patchData(event.data);
      } else {
        this.formSmallComponentRef?.patchData(event.data);
      }
    });
  }
  onSaveItem(item: ContentItem): void {
    if (!this.selectedContent) return; // tránh lỗi khi chưa chọn content
    const type: string = this.selectedContent;

    this.store.select('resume').pipe(take(1)).subscribe((resumeState) => {
      const oldResume = resumeState.resume as ResumeModel;
      if (!oldResume) return;

      // Clone resume và contents
      const resume: ResumeModel = {
        ...oldResume,
        contents: Array.isArray(oldResume.contents) ? [...oldResume.contents] : []
      };

      // ✅ Đảm bảo mỗi content chỉ có 1 block
      let contentBlockIndex = resume.contents.findIndex((c) => c.content === type);
      const newData: ContentItem[] = [item]; // chỉ lưu đúng 1 data

      if (contentBlockIndex >= 0) {
        // cập nhật content đã có
        resume.contents[contentBlockIndex] = {
          content: type,
          data: newData
        };
      } else {
        // thêm content mới
        resume.contents.push({ content: type, data: newData });
      }

      // Cập nhật lên backend
      this.resumeService.updateResume(resume.id ?? '', {
        contents: resume.contents
      }).subscribe(() => {
        // ✅ Cập nhật ngay trong store → dữ liệu lên Added liền
        this.store.dispatch(ResumeActions.updateResumeInStore({ data: resume }));
      });


      this.backToInput(false);
    });
  }






}
