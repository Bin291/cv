import {Component, Input} from '@angular/core';
import {InputcontentComponent} from '../../components/inputcontent/inputcontent.component';
import { EditDetailsComponent } from "../../components/edit-details/edit-details.component";
import {AsyncPipe, NgIf} from '@angular/common';
import {DownloadBoxComponent} from '../../components/download-box/download-box.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ContentFormComponent} from '../../components/content-form/content-form.component';
import {Observable} from 'rxjs';
import {ResumeModel} from '../../models/resume.model';
import {Store} from '@ngrx/store';
import {ResumeState} from '../../ngrx/resume/resume.state';
import {loadResume} from '../../ngrx/resume/resume.action';
import {LetDirective} from '@ngrx/component';



@Component({
  selector: 'app-content',
  imports: [
    InputcontentComponent,
    EditDetailsComponent,
    NgIf,
    DownloadBoxComponent,
    MatProgressSpinner,
    LetDirective
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  @Input() resume$!: Observable<ResumeModel | null>;

  constructor(private store: Store<{
    resume: ResumeState
  }>) {
    this.resume$ = this.store.select(state => state.resume.resume);
    this.resume$.subscribe(data => {
      console.log('resume$', data);
    });

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

  backToInput() {
    this.isLoading = true;
    setTimeout(() => {
      this.showEdit = false;
      const id = localStorage.getItem('resume_id');
      if (id) {
        this.store.dispatch(loadResume({ id }));
      }
      this.isLoading = false;
    }, 500);
  }

}
