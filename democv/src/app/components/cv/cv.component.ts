import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {map, Observable} from 'rxjs';
import {AsyncPipe, isPlatformBrowser, NgForOf, NgIf} from '@angular/common';
import {ResumeModel} from '../../models/resume.model';
import {select, Store} from '@ngrx/store';
import {ResumeState} from '../../ngrx/resume/resume.state';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {LetDirective} from '@ngrx/component';
import {loadResume} from '../../ngrx/resume/resume.action';
import {LinkState} from '../../ngrx/link/link.state';
import {LinkModel} from '../../models/link.model';
import * as LinkActions from '../../ngrx/link/link.actions';
import {ResumeService} from '../../services/resume/resume.service';

@Component({
  selector: 'app-cv',
  imports: [
    NgIf,
    MatIcon,
    MatCardModule,
    MatIconModule,
    LetDirective,
    NgForOf,
    AsyncPipe,

  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit{
  resume$ !: Observable<ResumeModel | null>
  links$!: Observable<LinkModel[]>;
  constructor(
    private store: Store<{ resume: ResumeState , link: LinkState}>,
    @Inject(PLATFORM_ID) private platformId: Object,
    private resumeService: ResumeService
  ) {
    this.resume$ = this.store.select(state => state.resume.resume);
// this.links$ = this.resumeService.getResumeLinks(this.resume$);
    this.links$ = this.resume$.pipe(
      map(data => {
        if (!data?.links) return [];
        try {
         return Array.isArray(data.links) ? data.links : JSON.parse(data.links);
        } catch {
          console.warn('Invalid JSON in resume.links:', data.links);
          return [];
        }
      })
    );



  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const resumeId = localStorage.getItem('resume_id');
      if (resumeId) {
        this.store.dispatch(loadResume({ id: resumeId }));
        this.store.dispatch(LinkActions.loadLinks({ resumeId }));
      }
    }
  }
}
